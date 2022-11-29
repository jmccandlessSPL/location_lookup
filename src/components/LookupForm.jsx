import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { LocationNamingMap } from "../util/constants";
import SearchInputTag from "./SearchInputTag";
import CompareTable from "./CompareTable";

/*
 * This form will be for more than just the location eventually
 * right now, proof of concept.
 */

function LookupForm() {
  // fulllist so it only calls API once
  const [fullList, setFullList] = useState(null);

  // searchText is what is typed by user
  const [searchText, setSearchText] = useState("PH");

  // resulting list as the user types
  const [searchResults, setSearchResults] = useState();

  // api error to be handled in the promise
  const [apiError, setApiError] = useState(null);

  // gets information from the row selected from data grid
  const [selectedResult, setSelectedResult] = useState([]);

  //these are from the MDM App, need to refactor!!
  // const [dataToMerge, setDataToMerge] = useState(
  //   objCompare ? objCompare[0] : ""
  // );
  //
  // const [objToDelete, setObjToDelete] = useState(
  //   objCompare ? objCompare[1] : ""
  // );

  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";

  const retrieveLocations = async (url) => {
    try {
      setApiError(null);
      const res = await axios.get([`${url}`]);
      return res.data;
    } catch (err) {
      setApiError(err);
    }
  };

  useEffect(() => {
    retrieveLocations(baseURL).then((data) => {
      setFullList(data);
      setSearchResults(data);
    });
  }, [baseURL]);

  function handleChange(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    setSearchResults(
      fullList.filter((loc) => loc.locName.includes(`${e.target.value}`))
    );
  }

  console.log(selectedResult);

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
        {Object.entries(LocationNamingMap).map(([key, val], i) => (
          <label
            key={i}
            htmlFor="searchText"
            // style={{ backgroundColor: searchResults ? "green" : "red" }}
          >
            {val}
            <input
              // name="searchText"
              type="text"
              // value={searchText}
              // onChange={handleChange}
            />
          </label>
        ))}
        <CompareTable
          filteredLocationListFull={searchResults}
          dataToMerge={[{ locName: searchText }]}
          objCompare={[selectedResult]}
        />
        {searchResults && (
          <SearchResults
            searchResults={searchResults}
            setSelectedResult={setSelectedResult}
          />
        )}
      </div>
    </>
  );
}

export default LookupForm;
