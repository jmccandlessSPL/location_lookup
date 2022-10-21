import React, { useEffect, useState } from "react";
import axios from "axios";

function LookupForm() {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [apiError, setApiError] = useState(null);

  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";

  const retrieveLocations = async (url) => {
    try {
      const loc = await axios.get(url);
      setSearchResults(loc);
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
      </div>
    </>
  );
}

export default LookupForm;
