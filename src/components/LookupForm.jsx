import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

function LookupForm() {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [apiError, setApiError] = useState(null);

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

  // console.log(location);
  useEffect(() => {
    retrieveLocations(baseURL, location);
  }, [baseURL, location]);

  function handleChange(e) {
    e.preventDefault();
    setLocation(e.target.value);
  }

  return (
    <>
      <div>
        form for search
        <form>
          <label style={{ backgroundColor: searchResults ? "green" : "red" }}>
            Search for...
            <input
              name="location"
              type="text"
              value={location}
              onChange={handleChange}
            />
          </label>
        </form>
        {searchResults && <SearchResults searchResults={searchResults} />}
      </div>
    </>
  );
}

export default LookupForm;
