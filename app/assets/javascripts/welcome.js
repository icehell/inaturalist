if (HOMEPAGE_DATA_URL) {
  $.getJSON(STATS_SUMMARY_URL, function(json) {
    $('#stats .obsstats .stat').html(json.total_observations.toLocaleString())
    $('#stats .speciesstats .stat').html(json.total_leaf_taxa.toLocaleString())
    $('#stats .peoplestats .stat').html(json.total_users.toLocaleString())
  })
  $.getJSON(HOMEPAGE_DATA_URL, function(json) {
    addObservations(json.observations)
    addTestimonials(json.testimonials)
  })
}

function addObservations(observations) {
  if (!observations) {
    return
  }
  for (var i = 0; i < observations.length; i++) {
    var o = observations[i]
    var item = $('<div class="item">').append(
      $('<div class="heroimage">').css('backgroundImage', 'url('+o.image_url+')').html(
        '........... ........... ........... ........... ........... ........... ' +
        '........... ........... ........... ........... ........... ........... ' +
        '........... ........... ........... ........... ........... ........... ' +
        '........... ........... ........... ........... ........... ........... ' +
        '........... ........... ........... ........... ........... ........... ' +
        '........... ........... ........... ........... ........... ........... '
      ),
      $('<div class="herofooter">').append(
        $('<div class="container container-fixed">').append(
          $('<div class="row">').append(
            $('<div class="col-xs-11 col-xs-offset-1">').append(
              $('<a>').attr('href', '/people/'+o.user.login).html(
                $('<img/>').attr('src', o.user.user_icon_url)
              ),
              $('<a class="obstext">').attr('href', '/observations/'+o.id).append(
                $('<span class="username">').html(o.user.name),
                ' ',
                $('<i class="login">').html(' (' + o.user.login + ')'),
                $('<span class="taxonname">').html(o.taxon.default_name.name),
                ' ',
                I18n.t('from').toLowerCase(),
                ' ',
                $('<span class="location">').html(o.place_guess)
              )
            )
          )
        )
      )
      // $('#herobox').clone().attr('id', '').removeClass('fade')
    )
    if (i == 0) {
      item.addClass('active')
      $('#hero .item').removeClass('active')
      $('#hero .carousel-inner').prepend(item, ' ')
    } else {
      $('#hero .carousel-inner').append(' ', item)
    }
  }
}

function addTestimonials(testimonials) {
  if (!testimonials) { return };
  for (var i = 0; i < testimonials.length; i++) {
    var t = testimonials[i]
    var item = $('<div class="item">').append(
      $('<div class="row">').append(
        $('<div class="col-xs-8 bigpadded">').append(
          $('<blockquote>').html(t.body),
          $('<a class="name">').attr('href', t.url).html(t.name),
          $('<div class="role">').html(t.role),
          $('<div class="location">').append(
            $('<i class="fa fa-map-marker></i>'),
            t.location
          )
        ),
        $('<div class="col-xs-3">').append(
          $('<a>').attr('href', t.url).html(
            $('<img class="img-circle img-responsive">').attr('src', t.image_url)
          )
        )
      )
    )
    var indicator = $('<li>').attr('data-target', '#who-carousel').attr('data-slide-to', i)
    if (i == 0) {
      item.addClass('active')
      indicator.addClass('active')
    }
    $('#who .carousel-inner').append(item, ' ')
    $('#who .carousel-indicators').append(indicator, ' ')
  }
}
