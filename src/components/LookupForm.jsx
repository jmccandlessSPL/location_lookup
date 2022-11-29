import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { LocationNamingMap } from "../util/constants";
import SearchInputTag from "./SearchInputTag";
import CompareTable from "./CompareTable";
import { Box, FormControl, TextField } from "@mui/material";

/*
 * This form will be for more than just the location eventually
 * right now, proof of concept.
 */

function LookupForm({
  setApiError,
  setFullList,
  setSearchResults,
  selectedResult,
  searchResults,
  handleChange,
}) {
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

  console.log(selectedResult);

  return (
    <>
      <div>
        <h2
          style={{
            outline: "solid",
            outlineColor: searchResults ? "green" : "red",
          }}
        >
          form for search
        </h2>
        <br />
        <FormControl>
          <Box>
            {Object.entries(LocationNamingMap).map(([key, val], i) => (
              <TextField
                sx={{ margin: "5px 10px" }}
                key={i}
                size="small"
                // margin="dense"
                variant="outlined"
                onChange={handleChange}
                label={val}
                id={key}
              />
            ))}
          </Box>
        </FormControl>
      </div>
    </>
  );
}

export default LookupForm;
