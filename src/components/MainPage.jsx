import React, { useEffect, useState } from "react";
import LookupForm from "./LookupForm";
import SearchResults from "./SearchResults";
import CompareTable from "./CompareTable";
import { LocationNamingMapMinimized } from "../util/constants";
import { Box, Paper } from "@mui/material";
import TabComponent from "./TabComponent";
import axios from "axios";
import SelectLocationTable from "./SelectLcoationTable";

function MainPage() {
  // full list so it only calls API once
  const [fullList, setFullList] = useState(null);

  // resulting list as the user types
  const [searchResults, setSearchResults] = useState();

  // api error to be handled in the promise
  const [apiError, setApiError] = useState(null);

  // gets information from the row selected from data grid
  const [selectedResult, setSelectedResult] = useState([]);

  // location of the node backend
  const baseURL = "http://localhost:3785";

  // function to retrieve data from the node backend
  const retrieveLocations = async (url) => {
    try {
      setApiError(null);
      const res = await axios.get(`${url}`);
      return res.data;
    } catch (err) {
      setApiError(err);
      console.error(apiError);
    }
  };

  // calls the function to the node backend
  useEffect(() => {
    retrieveLocations(baseURL).then((data) => {
      if (data) {
        console.log(data);
      }
    });
  }, [baseURL]);

  // searchObj so the object fills in as the user types
  const [searchObj, setSearchObj] = useState(
    Object.keys(LocationNamingMapMinimized).reduce(
      (obj, key) => ({ ...obj, [key]: "" }),
      {}
    )
  );

  function handleChange(e) {
    e.preventDefault();
    setSearchObj({ ...searchObj, [`${e.target.id}`]: e.target.value });
    if (e.target.id === "locName") {
      // setSearchText(e.target.value);
      setSearchResults(
        // filters list based on locName ONLY
        // fullList.filter((loc) => loc.locName.includes(`${e.target.value}`))
        fullList.filter((loc) => {
          let field = loc[`${e.target.id}`];
          return field.includes(`${e.target.value}`);
        })
      );
    }
  }

  const lookupForm = (
    <LookupForm
      searchObj={searchObj}
      setSearchObj={setSearchObj}
      handleChange={handleChange}
    />
  );

  const comparingTable = (
    <CompareTable dataToMerge={searchObj} objCompare={selectedResult} />
  );

  const singleLocationTable = (
    <SelectLocationTable dataToMerge={searchObj} objCompare={selectedResult} />
  );

  ////// FileSystemAccessAPI ///////

  return (
    <>
      <h3>Location Lookup</h3>
      <Box id="content-box">
        <Paper id="tab-component-box" className="body-content-boxes">
          <TabComponent
            comparingTable={comparingTable}
            lookupForm={lookupForm}
            singleLocationTable={singleLocationTable}
          />
        </Paper>
        <Paper id="data-grid-box" className="body-content-boxes">
          <SearchResults
            searchResults={searchResults}
            setSelectedResult={setSelectedResult}
            setApiError={setApiError}
            setFullList={setFullList}
            setSearchResults={setSearchResults}
          />
        </Paper>
      </Box>
    </>
  );
}

export default MainPage;
