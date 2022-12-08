import React, { useEffect, useState } from "react";
import LookupForm from "./LookupForm";
import SearchResults from "./SearchResults";
import CompareTable from "./CompareTable";
import { LocationNamingMap } from "../util/constants";
import { Box } from "@mui/material";
import TabComponent from "./TabComponent";
import axios from "axios";
import SelectLocationTable from "./SelectLcoationTable";

function MainPage() {
  // fulllist so it only calls API once
  const [fullList, setFullList] = useState(null);

  // resulting list as the user types
  const [searchResults, setSearchResults] = useState();

  // api error to be handled in the promise
  const [apiError, setApiError] = useState(null);

  // gets information from the row selected from data grid
  const [selectedResult, setSelectedResult] = useState([]);

  // location of the node backend
  const baseURL = "http://localhost:3785";

  // function to retireve data from the node backend
  const retrieveLocations = async (url) => {
    try {
      setApiError(null);
      const res = await axios.get([`${url}`]);
      return res.data;
    } catch (err) {
      setApiError(err);
    }
  };

  // calls the function to the node backend
  useEffect(() => {
    retrieveLocations(baseURL).then((data) => {
      // console.log(data);
    });
  }, [baseURL]);

  // searchObj so the object fills in as the user types
  const [searchObj, setSearchObj] = useState(
    Object.keys(LocationNamingMap).reduce(
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
      <Box display="flex" flexDirection="column">
        <Box>
          <LookupForm
            searchObj={searchObj}
            setSearchObj={setSearchObj}
            handleChange={handleChange}
          />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <TabComponent
            comparingTable={comparingTable}
            // lookupForm={lookupForm}
            singleLocationTable={singleLocationTable}
          />

          <SearchResults
            searchResults={searchResults}
            setSelectedResult={setSelectedResult}
            setApiError={setApiError}
            setFullList={setFullList}
            setSearchResults={setSearchResults}
          />
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
