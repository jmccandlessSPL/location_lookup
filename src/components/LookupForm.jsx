import React, { useEffect, useState } from "react";
import { LocationNamingMap } from "../util/constants";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

function LookupForm({ searchResults, handleChange, searchObj, compareScreen }) {
  // this function allows the field to read the value as it updates from CompareTable
  function handleName(obj, k) {
    return obj[`${k}`];
  }

  const [selectedDate, setSelectedDate] = useState();

  function handleDateSelect(newDate) {
    setSelectedDate(newDate);
  }

  return (
    <>
      <Box width="40%" display={compareScreen ? "none" : ""}>
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
          {Object.entries(LocationNamingMap).map(([key, val], i) => {
            if (key === "effectiveStartDate" || key === "effectiveEndDate") {
              return (
                <LocalizationProvider key={i} dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    // size="small"
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={selectedDate}
                    onChange={handleDateSelect}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              );
            }
            return (
              <TextField
                sx={{ margin: "5px 10px" }}
                key={i}
                // size="small"
                // margin="dense"
                variant="outlined"
                onChange={handleChange}
                label={val}
                id={key}
                name={key}
                value={handleName(searchObj, key)}
              />
            );
          })}
        </FormControl>
      </Box>
    </>
  );
}

export default LookupForm;
