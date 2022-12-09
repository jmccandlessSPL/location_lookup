import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import "react-diff-view/style/index.css";
import { LocationNamingMap } from "../util/constants";

// const MergeTableButton = styled(Button)(({ theme }) => ({
//   borderRadius: "7px",
//   padding: "1px 2px",
//   minWidth: "max-content",
//   maxWait: "max-content",
//   ":hover": {
//     backgroundColor: "rgba(0,0,0,0.35)",
//   },
// }));

const MergeTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // borderCollapse: "seperate",
    width: "350px",
    fontSize: "1.2rem",
    // fontWeight: "400",
    textAlign: "center",
    filter: "brightness(.70)",
    // padding: "5px 10px",
  },
  [`&.${tableCellClasses.body}`]: {
    // borderCollapse: "seperate",
    fontSize: "1rem",
    backgroundColor: "white",
    padding: 0,
  },
}));

function SelectLocationTable({ objCompare, dataToMerge }) {
  // const [totalCompFieldsArr, setTotalCompFieldsArr] = useState([
  //   ...new Set([...Object.keys(objCompare), ...Object.keys(dataToMerge)]),
  // ]);

  function nestedObjManipNONORIG(obj) {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(flattened, nestedObjManipNONORIG(value));
      } else {
        flattened[key] = value;
      }
    });

    return flattened;
  }

  useEffect(() => {}, []);

  return (
    <>
      <h3>Single Location</h3>
      <Box className="compare-table-box" height="400px">
        {/*<Card*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    flexDirection: "column",*/}
        {/*    height: "inherit",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <TableContainer style={{ height: "inherit", display: "flex" }}>*/}
        <table style={{ height: "inherit", width: "100%" }}>
          {/*<TableHead>*/}
          {/*  <TableRow>*/}
          {/*    <MergeTableCell style={{ width: "250px" }}>*/}
          {/*      Attribute*/}
          {/*    </MergeTableCell>*/}
          {/*    <MergeTableCell style={{ fontWeight: "400px" }}>*/}
          {/*      Selected Data*/}
          {/*    </MergeTableCell>*/}
          {/*{objCompare?.map((el, i) => (*/}
          {/*  <MergeTableCell*/}
          {/*    key={i}*/}
          {/*    className={`${handleTitleColor(i)}`}*/}
          {/*  >*/}
          {/*    <div className={`div-inside`}>*/}
          {/*      {i === 0 && (*/}
          {/*        <MergeTableButton className={`single-butt`}>*/}
          {/*          <KeyboardDoubleArrowLeftSharpIcon*/}
          {/*            onClick={() => {*/}
          {/*              setMergeIndex(0);*/}
          {/*              setDataToMerge(objCompare[0]);*/}
          {/*              setObjToDelete({*/}
          {/*                ...objCompare[1],*/}
          {/*                isDeleted: true,*/}
          {/*              });*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </MergeTableButton>*/}
          {/*      )}*/}
          {/*      {i === 1 && (*/}
          {/*        <MergeTableButton className={`single-butt`}>*/}
          {/*          <KeyboardDoubleArrowRightSharpIcon*/}
          {/*            onClick={() => {*/}
          {/*              setMergeIndex(1);*/}
          {/*              setDataToMerge(objCompare[1]);*/}
          {/*              // setObjToDelete(objCompare[0]);*/}
          {/*              setObjToDelete({*/}
          {/*                ...objCompare[0],*/}
          {/*                isDeleted: true,*/}
          {/*              });*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </MergeTableButton>*/}
          {/*      )}*/}
          {/*      Location {i + 1}*/}
          {/*      {whichIcon(i)}*/}
          {/*    </div>*/}
          {/*  </MergeTableCell>*/}
          {/*))}*/}
          {/*  </TableRow>*/}
          {/*</TableHead>*/}
          <tbody className="select-local-table">
            <tr>
              <td
                style={{ borderRight: "solid 1px rgb(238, 238, 238)" }}
                className="title-block"
              >
                Attribute
              </td>
              <td className="title-block">Value</td>
            </tr>
            {Object.keys(LocationNamingMap)
              // ?.filter(
              //   (rowTitle) => rowTitle !== "id" && rowTitle !== "keyy"
              // )
              .map((rowTitle, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="att-name"
                      align="left"
                      style={{ borderRight: "solid 1px rgb(238, 238, 238)" }}
                    >
                      <Box className="pre-style">
                        {LocationNamingMap[`${rowTitle}`]}
                      </Box>
                    </td>
                    <td className="att-name" align="left">
                      <Box className="pre-style">
                        {nestedObjManipNONORIG(objCompare)[`${rowTitle}`]}
                        {/*{dataToMerge && dataToMerge[`${rowTitle}`]}*/}
                      </Box>
                    </td>
                    {/*<MergeTableCell*/}
                    {/*  className={` ${handleCompareToMerge(rowTitle, 0)} `}*/}
                    {/*  align="left"*/}
                    {/*>*/}
                    {/*  <div className={`div-inside`}>*/}
                    {/*    <MergeTableButton*/}
                    {/*      disabled={handleDisableButton(rowTitle)}*/}
                    {/*      className={`${handleDisableButtonClass(*/}
                    {/*        rowTitle*/}
                    {/*      )}`}*/}
                    {/*      onClick={() => {*/}
                    {/*        handleDisableButton(rowTitle);*/}
                    {/*        handleSingleRowMergeData(rowTitle, 0);*/}
                    {/*      }}*/}
                    {/*    >*/}
                    {/*      <KeyboardArrowLeftSharpIcon align="right" />*/}
                    {/*    </MergeTableButton>*/}

                    {/*    {handleRowData(rowTitle, objCompare.at(0))}*/}
                    {/*  </div>*/}
                    {/*</MergeTableCell>*/}
                    {/*<MergeTableCell*/}
                    {/*  className={` ${handleCompareToMerge(rowTitle, 1)}`}*/}
                    {/*  align="left"*/}
                    {/*>*/}
                    {/*  <div className={`div-inside`}>*/}
                    {/*    <MergeTableButton*/}
                    {/*      disabled={handleDisableButton(rowTitle)}*/}
                    {/*      className={`${handleDisableButtonClass(*/}
                    {/*        rowTitle*/}
                    {/*      )}`}*/}
                    {/*      onClick={() => {*/}
                    {/*        handleSingleRowMergeData(rowTitle, 1);*/}
                    {/*      }}*/}
                    {/*    >*/}
                    {/*      <KeyboardArrowRightSharpIcon />*/}
                    {/*    </MergeTableButton>*/}
                    {/*    {handleRowData(rowTitle, objCompare.at(1))}*/}
                    {/*  </div>*/}
                    {/*</MergeTableCell>*/}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/*</TableContainer>*/}
        {/*</Card>*/}
      </Box>
    </>
  );
}

export default SelectLocationTable;
