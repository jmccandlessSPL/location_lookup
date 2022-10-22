import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

function LookupForm() {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [apiError, setApiError] = useState(null);

  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";

  const retrieveLocations = async (url) => {
    try {
      const res = await axios.get(url);
      setSearchResults(res.data);
      setApiError(null);
    } catch (err) {
      setApiError(err);
    }
  };

  useEffect(() => {
    retrieveLocations(baseURL);
  }, [baseURL]);

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
