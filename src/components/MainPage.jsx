import React, { useEffect, useState } from "react";
import LookupForm from "./LookupForm";
import SearchResults from "./SearchResults";
import CompareTable from "./CompareTable";
import Button from "@mui/material/Button";
import { LocationNamingMap } from "../util/constants";
import { Box } from "@mui/material";

function MainPage() {
  // fulllist so it only calls API once
  const [fullList, setFullList] = useState(null);

  // searchText is what is typed by user
  const [searchText, setSearchText] = useState("");

  // searchObj so the object fills in as the user types
  const [searchObj, setSearchObj] = useState(
    Object.keys(LocationNamingMap).reduce(
      (obj, key) => ({ ...obj, [key]: "" }),
      {}
    )
  );

  // resulting list as the user types
  const [searchResults, setSearchResults] = useState();

  // api error to be handled in the promise
  const [apiError, setApiError] = useState(null);

  // gets information from the row selected from data grid
  const [selectedResult, setSelectedResult] = useState([]);

  const [compareScreen, setCompareScreen] = useState(false);

  useEffect(() => {
    /* const newObj = {};
    Object.keys(LocationNamingMap).map((att) => {
      console.log(att);
      newObj[`${att}`] = "";
    });
    setSearchObj(newObj);*/
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setSearchObj({ ...searchObj, [`${e.target.id}`]: e.target.value });
    if (e.target.id === "locName") {
      // setSearchText(e.target.value);
      setSearchResults(
        // filters list based on locName ONLY
        fullList.filter((loc) => loc.locName.includes(`${e.target.value}`))
      );
    }
  }

  ////// FileSystemAccessAPI ///////

  return (
    <>
      <h3>Main page</h3>
      <Button onClick={() => setCompareScreen(false)}>Input</Button>
      <Button onClick={() => setCompareScreen(true)}>Compare</Button>
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <LookupForm
          compareScreen={compareScreen}
          searchObj={searchObj}
          searchResults={searchResults}
          handleChange={handleChange}
        />
        <CompareTable
          compareScreen={compareScreen}
          filteredLocationListFull={searchResults}
          dataToMerge={searchObj}
          objCompare={selectedResult}
          handleChange={handleChange}
        />

        <SearchResults
          searchResults={searchResults}
          setSelectedResult={setSelectedResult}
          setApiError={setApiError}
          setFullList={setFullList}
          setSearchResults={setSearchResults}
        />
      </Box>
    </>
  );
}

export default MainPage;
