import React, { PropTypes } from "react";
import { Input, Button } from "react-bootstrap";
import FiltersButton from "./filters_button";
import TaxonAutocomplete from "./taxon_autocomplete";
import PlaceAutocomplete from "./place_autocomplete";

const SearchBar = ( {
  params,
  updateSearchParams
} ) => (
  <form className="SearchBar form-inline">
    <TaxonAutocomplete
      bootstrapClear
      searchExternal={false}
      resetOnChange={false}
      initialTaxonID={params.taxon_id}
      afterSelect={ function ( result ) {
        updateSearchParams( { taxon_id: result.item.id } );
      } }
      afterUnselect={ function ( ) {
        updateSearchParams( { taxon_id: null } );
      } }
    />
    <PlaceAutocomplete
      resetOnChange={false}
      initialPlaceID={params.place_id}
      afterSelect={ function ( result ) {
        updateSearchParams( { place_id: result.item.id } );
      } }
      afterUnselect={ function ( ) {
        updateSearchParams( { place_id: null } );
      } }
    />
    <Button bsStyle="primary">
      { I18n.t( "go" ) }
    </Button> <FiltersButton params={params} updateSearchParams={updateSearchParams} />
    <Input
      type="checkbox"
      label={ I18n.t( "reviewed" ) }
      checked={ params.reviewed }
      onChange={function ( e ) {
        updateSearchParams( { reviewed: e.target.checked } );
      }}
    />
  </form>
);


SearchBar.propTypes = {
  params: PropTypes.object,
  updateSearchParams: PropTypes.func
};

export default SearchBar;
