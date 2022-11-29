import React, { useEffect, useState } from "react";
import {
  CardHeader,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { LocationNamingMap } from "../util/constants";
// import { Card } from "@material-ui/core";
import { Card } from "@mui/material";
import _ from "lodash";
// import "../../../../../styles/merge-compare.css";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowLeftSharpIcon from "@mui/icons-material/KeyboardDoubleArrowLeftSharp";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import Button from "@mui/material/Button";
import { WarningAmber } from "@mui/icons-material";

const MergeTableButton = styled(Button)(({ theme }) => ({
  borderRadius: "7px",
  padding: "1px 2px",
  minWidth: "max-content",
  maxWait: "max-content",
  ":hover": {
    backgroundColor: "rgba(0,0,0,0.35)",
  },
}));

const MergeTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderCollapse: "seperate",
    width: "200px",
    // fontSize: "2rem",
    // fontWeight: "400",
    textAlign: "center",
    filter: "brightness(.90)",
    // padding: "5px 10px",
  },
  [`&.${tableCellClasses.body}`]: {
    borderCollapse: "seperate",
    // fontSize: "1.3rem",
    padding: 0,
  },
}));

function CompareTable({
  handleChange,
  setDataToMerge,
  objCompare,
  dataToMerge,
  filteredLocationListFull,
}) {
  const uneditableAttr = {
    createdOn: true,
    updatedOn: true,
    createdBy: true,
    updatedBy: true,
  };

  console.log(objCompare);
  console.log(dataToMerge);

  // handles the title color, 3 variations - keep, keep but a value has changed, delete
  // function handleTitleColor(index) {
  //   if (mergeIndex === index) {
  //     if (_.isEqual(objCompare.at(index), dataToMerge)) {
  //       return "selected-data";
  //     }
  //     return "middle-data";
  //   }
  //   return "unselected-data";
  // }

  // handles the icon next to title, should be able to combine with handletitlecolor?
  // function whichIcon(index) {
  //   if (mergeIndex === index) {
  //     if (_.isEqual(objCompare.at(index), dataToMerge)) {
  //       return <CheckIcon />;
  //     }
  //     return <WarningAmber />;
  //   }
  //   return <ClearIcon />;
  // }

  // gives the class name for selected data and not selected data (REFACTOR?)
  // function handleCompareToMerge(attr, index) {
  //   if (_.isEqual(objCompare.at(0)[`${attr}`], objCompare.at(1)[`${attr}`])) {
  //     if (mergeIndex === index) {
  //       return "selected-data";
  //     }
  //     return "unselected-data";
  //   }
  //   if (!_.isEqual(objCompare.at(0)[`${attr}`], objCompare.at(1)[`${attr}`])) {
  //     if (_.isEqual(objCompare.at(index)[`${attr}`], dataToMerge[`${attr}`])) {
  //       return "selected-data";
  //     }
  //     return "unselected-data";
  //   }
  // }

  // function to handle coordinates and other nested objects at some point. JHM 10/19/22
  function handleRowData(data, source) {
    // console.log(data, source);
    const nestObjData = source[`${data}`];

    if (data === "isDeleted") {
      if (nestObjData) {
        return nestObjData.toString();
      }
      return "";
    }
    if (data === "isActive") {
      if (nestObjData) {
        return nestObjData.toString();
      }
      return "";
    }
    if (data === "parentLocId") {
      // returns the name of the parent id instead of just the ID
      if (
        filteredLocationListFull?.filter((local) => local.id === nestObjData)[0]
      ) {
        return filteredLocationListFull?.filter(
          (local) => local.id === nestObjData
        )[0].locName;
      }
      return "[null]";
    }
    if (data === "createdOn" || data === "updatedOn") {
      if (
        // these to make sure that we are comparing dates
        nestObjData?.length === new Date().toISOString().length &&
        nestObjData?.at(4) === "-" &&
        nestObjData?.at(-1) === "Z"
      ) {
        return new Date(nestObjData).toLocaleString();
      }
    }
    if (data === "coordLonLat") {
      if (nestObjData) {
        if (nestObjData === null) {
          return "[null]";
        }
        return `${nestObjData.lat || "[null]"}, ${nestObjData.lng || "[null]"}`;
      }
      return "";
    }
    if (data === "locationChars") {
      if (nestObjData) {
        const isEmptyObjectBool =
          Object.keys(nestObjData).length === 0 &&
          nestObjData.constructor === Object;
        if (!isEmptyObjectBool) {
          // return a list of each piece of data in this object
          return (
            <ul>
              {Object.entries(nestObjData).map(([key, val], i) => {
                return (
                  <li key={i}>
                    {key}: {val}
                  </li>
                );
              })}
            </ul>
          );
        }
        return "[null]";
      }
      return "";
    }
    if (nestObjData === null) {
      return "[null]";
    }
    if (nestObjData === "") {
      return "[empty]";
    }
    return nestObjData;
  }

  // reassigns values in the dataToMerge object as each cell is clicked JHM 10/19/22
  // function handleSingleRowMergeData(dataTitle, index) {
  //   setDataToMerge({
  //     ...dataToMerge,
  //     [`${dataTitle}`]: objCompare.at(index)[`${dataTitle}`],
  //   });
  // }

  // returns boolean for the disable button functionality
  // function handleDisableButton(attr) {
  //   return (
  //     uneditableAttr[`${attr}`] ||
  //     _.isEqual(objCompare.at(0)[`${attr}`], objCompare.at(1)[`${attr}`])
  //   );
  // }

  // give the disable button class to the element
  // function handleDisableButtonClass(attr) {
  //   if (handleDisableButton(attr)) {
  //     return "disable-butt";
  //   }
  //   return "single-butt";
  // }

  // able to edit the merge data fields
  // function handleMergeDataInput(e, attr) {
  //   e.preventDefault();
  //   setDataToMerge({
  //     ...dataToMerge,
  //     [`${attr}`]: e.target.value,
  //   });
  // }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "600px",
            width: "70%",
          }}
        >
          <CardHeader
            title="Compare"
            titleTypographyProps={{ align: "center" }}
          />

          <TableContainer sx={{ height: "inherit", display: "flex" }}>
            <Table stickyHeader style={{ height: "inherit" }}>
              <TableHead>
                <TableRow>
                  <MergeTableCell>Attribute</MergeTableCell>
                  <MergeTableCell>First</MergeTableCell>
                  <MergeTableCell>Second</MergeTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(LocationNamingMap)
                  ?.filter(
                    (rowTitle) => rowTitle !== "id" && rowTitle !== "keyy"
                  )
                  .map((rowTitle, i) => {
                    return (
                      <TableRow key={i}>
                        <MergeTableCell
                          className="att-name"
                          style={{ padding: "5px 10px" }}
                          align="left"
                        >
                          <div className={`div-inside`}>
                            {LocationNamingMap[`${rowTitle}`]}
                          </div>
                        </MergeTableCell>
                        <MergeTableCell align="left">
                          <div className={`div-inside`}>
                            <TextField
                              id={rowTitle}
                              fullWidth
                              onChange={handleChange}
                              size="small"
                            >
                              {handleRowData(rowTitle, dataToMerge[0])}
                            </TextField>
                          </div>
                        </MergeTableCell>
                        <MergeTableCell align="left">
                          <div className={`div-inside`}>
                            {handleRowData(rowTitle, objCompare.at(0))}
                          </div>
                        </MergeTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </>
  );
}

export default CompareTable;
