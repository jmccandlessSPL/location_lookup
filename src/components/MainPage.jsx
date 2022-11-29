import React, { useState } from "react";
import LookupForm from "./LookupForm";
import SearchResults from "./SearchResults";
import CompareTable from "./CompareTable";
import Button from "@mui/material/Button";

function MainPage() {
  // fulllist so it only calls API once
  const [fullList, setFullList] = useState(null);

  // searchText is what is typed by user
  const [searchText, setSearchText] = useState("");

  // resulting list as the user types
  const [searchResults, setSearchResults] = useState();

  // api error to be handled in the promise
  const [apiError, setApiError] = useState(null);

  // gets information from the row selected from data grid
  const [selectedResult, setSelectedResult] = useState([]);

  const [compareScreen, setCompareScreen] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.id === "locName") {
      setSearchText(e.target.value);
      setSearchResults(
        fullList.filter((loc) => loc.locName.includes(`${e.target.value}`))
      );
    }
  }

  return (
    <>
      <h3>Main page</h3>
      <Button onClick={() => setCompareScreen(false)}>Input</Button>
      <Button onClick={() => setCompareScreen(true)}>Compare</Button>
      {!compareScreen && (
        <LookupForm
          setFullList={setFullList}
          setSearchResults={setSearchResults}
          selectedResult={selectedResult}
          searchResults={searchResults}
          searchText={searchText}
          setApiError={setApiError}
          handleChange={handleChange}
        />
      )}
      {compareScreen && (
        <CompareTable
          filteredLocationListFull={searchResults}
          dataToMerge={[{ locName: searchText }]}
          objCompare={[selectedResult]}
          handleChange={handleChange}
        />
      )}
      {searchResults && (
        <SearchResults
          searchResults={searchResults}
          setSelectedResult={setSelectedResult}
        />
      )}
    </>
  );
}

export default MainPage;
