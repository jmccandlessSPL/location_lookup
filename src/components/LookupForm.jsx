import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import SearchInputTag from "./SearchInputTag";
/*
 * This form will be for more than just the location eventually
 * right now, proof of concept.
 */

function LookupForm() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";

  const retrieveLocations = async (url, searchBar) => {
    try {
      console.log(searchBar);
      const res = await axios.get([`${url}`]);
      setSearchResults(
        res.data.filter((loc) => loc.locName.includes(`${searchBar}`))
      );
      // setSearchResults(res.data.filter((loc) => loc.includes(searchBar)));
      setApiError(null);
    } catch (err) {
      setApiError(err);
    }
  };

  // console.log(searchText);
  console.log(selectedResult);
  useEffect(() => {
    retrieveLocations(baseURL, searchText);
  }, [baseURL, searchText]);

  function handleChange(e) {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  return (
    <>
      <div>
        form for search
        <form>
          <label
            htmlFor="searchText"
            style={{ backgroundColor: searchResults ? "green" : "red" }}
          >
            Search for...
            <input
              name="searchText"
              type="text"
              value={searchText}
              onChange={handleChange}
            />
          </label>
        </form>
        {searchResults && (
          <SearchResults
            searchResults={searchResults}
            setSelectedResult={setSelectedResult}
          />
        )}
        <SearchInputTag location={selectedResult} />
      </div>
    </>
  );
}

export default LookupForm;
