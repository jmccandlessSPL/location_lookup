import React from "react";
import { dateAttributes, LocationNamingMapMinimized } from "../util/constants";
import { Box, FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

function LookupForm({ handleChange, searchObj, setSearchObj }) {
  // this function allows the field to read the value as it updates from CompareTable
  function handleName(obj, k) {
    return obj[`${k}`];
  }

  // adjust date styling
  function handleDateSelect(key, newDate) {
    setSearchObj({ ...searchObj, [`${key}`]: newDate.toLocaleString() });
  }

  return (
    <>
      <Box width="100%">
        <h3
        // style={{
        //   outline: "solid",
        //   outlineColor: searchResults ? "green" : "red",
        // }}
        >
          Location Input
        </h3>
        <FormControl
          sx={{
            height: "400px",
            overflowY: "auto",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >

          {Object.entries(LocationNamingMapMinimized).map(([key, val], i) => {
            if (dateAttributes.includes(key)) {


              return (
                <Box key={i} className="field-input-box">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label={val}
                      inputFormat="MM/DD/YYYY"
                      value={searchObj[`${key}`] || new Date().toLocaleString()}
                      onChange={(e) => handleDateSelect(key, e["$d"])}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              );
            }
            return (
              <Box key={i} className="field-input-box">
                <TextField
                  variant="outlined"
                  onChange={handleChange}
                  label={val}
                  id={key}
                  name={key}
                  value={handleName(searchObj, key)}
                />
              </Box>
            );
          })}
        </FormControl>
      </Box>
    </>
  );
}

export default LookupForm;
