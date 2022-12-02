import React, { useEffect, useState } from "react";
import { LocationNamingMap } from "../util/constants";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";

function LookupForm({ searchResults, handleChange, searchObj, compareScreen }) {
  // this function allows the field to read the value as it updates from CompareTable
  function handleName(obj, k) {
    return obj[`${k}`];
  }

  return (
    <>
      <Box>
        <h2
          style={{
            outline: "solid",
            outlineColor: searchResults ? "green" : "red",
          }}
        >
          form for search
        </h2>
        <FormControl
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
          }}
        >
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
              name={key}
              value={handleName(searchObj, key)}
            />
          ))}
        </FormControl>
      </Box>
    </>
  );
}

export default LookupForm;
