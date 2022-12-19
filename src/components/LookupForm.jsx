import React from "react";
import {
  dateAttributes,
  LocationNamingMapMinimized,
  MinimumFieldsSureVue,
} from "../util/constants";
import { Box, FormControl, styled, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr [col-start])",
  border: "1px solid rgba(224, 224, 224, 1)",
  borderRadius: "4px",
}));

function LookupForm({ handleChange, searchObj, setSearchObj, isInfoDetailed }) {
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
      <Box className="tab-header">
        <h3 className="tab-body-title">Location Input</h3>
      </Box>
      <StyledFormControl>
        {Object.entries(
          isInfoDetailed ? LocationNamingMapMinimized : MinimumFieldsSureVue
        ).map(([key, val], i) => {
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
                size="small"
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
      </StyledFormControl>
    </>
  );
}

export default LookupForm;
