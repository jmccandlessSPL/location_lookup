import React, { useEffect, useState } from "react";
import LookupForm from "./LookupForm";
import SearchResults from "./SearchResults";
import CompareTable from "./CompareTable";
import { LocationNamingMapMinimized } from "../util/constants";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
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

  const [isInfoDetailed, setIsInfoDetailed] = useState(false);

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

  function handleRadio(e) {
    setIsInfoDetailed(e.target.value === "Detailed");
  }

  const lookupForm = (
    <LookupForm
      searchObj={searchObj}
      setSearchObj={setSearchObj}
      handleChange={handleChange}
      isInfoDetailed={isInfoDetailed}
    />
  );

  const comparingTable = (
    <CompareTable
      isInfoDetailed={isInfoDetailed}
      dataToMerge={searchObj}
      objCompare={selectedResult}
    />
  );

  const singleLocationTable = (
    <SelectLocationTable
      isInfoDetailed={isInfoDetailed}
      objCompare={selectedResult}
    />
  );

  ////// FileSystemAccessAPI ///////

  return (
    <>
      <Box id="app-container" display="grid" gridTemplateRows="auto 1fr">
        <Box
          id="nav-bar"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          height="8vh"
          alignItems="center"
          backgroundColor="#68a696"
          borderRadius="5px"
        >
          <Typography variant="h3">Location Lookup</Typography>
        </Box>

        <Box id="content-box">
          <Box id="tab-component-box" className="body-content-boxes">
            <Box id="global-controls">
              <FormControl sx={{ marginTop: "10px" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Data Displayed
                </FormLabel>
                <RadioGroup
                  sx={{ display: "flex", flexDirection: "row" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Quick"
                  name="radio-buttons-group"
                  onChange={(e) => handleRadio(e)}
                >
                  <FormControlLabel
                    sx={{
                      width: "100px",
                      margin: "0",
                      justifyContent: "start",
                    }}
                    value="Quick"
                    control={<Radio size="small" />}
                    label="Quick"
                  />
                  <FormControlLabel
                    value="Detailed"
                    sx={{
                      width: "100px",
                      margin: "0",
                      justifyContent: "center",
                    }}
                    control={<Radio size="small" />}
                    label="Detailed"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <TabComponent
              comparingTable={comparingTable}
              lookupForm={lookupForm}
              singleLocationTable={singleLocationTable}
            />
          </Box>
          <Box id="data-grid-box" className="body-content-boxes">
            <SearchResults
              searchResults={searchResults}
              setSelectedResult={setSelectedResult}
              setApiError={setApiError}
              setFullList={setFullList}
              setSearchResults={setSearchResults}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
