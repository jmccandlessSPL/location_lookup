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
    width: "350px",
    fontSize: "2rem",
    // fontWeight: "400",
    textAlign: "center",
    filter: "brightness(.90)",
    // padding: "5px 10px",
  },
  [`&.${tableCellClasses.body}`]: {
    borderCollapse: "seperate",
    fontSize: "1.3rem",
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
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            height: "inherit",
          }}
        >
          <CardHeader
            title="Compare and Merge"
            titleTypographyProps={{ fontSize: "2rem", align: "center" }}
          />

          <TableContainer style={{ height: "inherit", display: "flex" }}>
            <Table stickyHeader style={{ height: "inherit" }}>
              <TableHead>
                <TableRow>
                  <MergeTableCell style={{ width: "250px" }}>
                    Attribute
                  </MergeTableCell>
                  <MergeTableCell
                    style={{ backgroundColor: "#add2ed", fontWeight: "400px" }}
                  >
                    Desired Merge Data
                  </MergeTableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(LocationNamingMap)
                  // ?.filter(
                  //   (rowTitle) => rowTitle !== "id" && rowTitle !== "keyy"
                  // )
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
                        <MergeTableCell
                          // className="att-name"
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#add2ed",
                          }}
                          align="left"
                        >
                          <div className={"div-inside"}>
                            {nestedObjManipNONORIG(objCompare)[`${rowTitle}`]}
                            {/*{dataToMerge && dataToMerge[`${rowTitle}`]}*/}
                          </div>
                        </MergeTableCell>
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
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
}

export default SelectLocationTable;
