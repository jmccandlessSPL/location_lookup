import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ReactDiffViewer from "react-diff-viewer";
import { useMemo } from "react";
import tokenize from "./tokenize";

import "react-diff-view/style/index.css";

function CompareTable({ objCompare, dataToMerge, compareScreen }) {
  const [totalCompFieldsArr, setTotalCompFieldsArr] = useState([
    ...new Set([...Object.keys(objCompare), ...Object.keys(dataToMerge)]),
  ]);
  const [inputText, setInputText] = useState("");
  const [compareText, setCompareText] = useState("");

  const [{ hunks }] = useState("");

  useMemo(() => tokenize(hunks), [hunks]);

  useEffect(() => {
    setInputText(createText(dataToMerge));
    setCompareText(createText(objCompare));
  }, [dataToMerge, objCompare]);

  function createText(obj) {
    let text = ``;
    for (const att of totalCompFieldsArr) {
      text = text.concat(`
  ${att}: ${obj[`${att}`] || ""}`);
    }
    return text;
  }

  return (
    <>
      <Box>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          // sx={{ width: "40%" }}
        >
          <Box>
            <h3>Compare Table</h3>
            <ReactDiffViewer
              leftTitle={"Input Location"}
              rightTitle={"Existing Location"}
              oldValue={inputText}
              newValue={compareText}
              splitView={true}
              hideLineNumbers={true}
              showDiffOnly={false}
              codeFoldMessageRenderer={(number) => {
                return `Expand Rows (${number} rows have same data)`;
              }}
              // extraLinesSurroundingDiff={5}
              onLineNumberClick={(lineId) => console.log("click")}
              styles={{
                contentText: {
                  minWidth: "max-content",
                },
                diffContainer: {
                  display: "flex",
                  height: "500px",
                  // overflow: "hidden",
                  overflowY: "auto",
                },
                marker: {
                  padding: "0",
                  maxWidth: "0px",
                  opacity: "0",
                },
                titleBlock: {
                  textAlign: "center",
                  width: "150px",
                },
              }}
            />
          </Box>
          {/*    <Card*/}
          {/*      sx={{*/}
          {/*        display: "flex",*/}
          {/*        flexDirection: "column",*/}
          {/*        height: "600px",*/}
          {/*        width: "70%",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <CardHeader*/}
          {/*        title="Compare"*/}
          {/*        titleTypographyProps={{ align: "center" }}*/}
          {/*      />*/}

          {/*      <TableContainer sx={{ height: "inherit", display: "flex" }}>*/}
          {/*        <Table stickyHeader style={{ height: "inherit" }}>*/}
          {/*          <TableHead>*/}
          {/*            <TableRow>*/}
          {/*              <MergeTableCell>Attribute</MergeTableCell>*/}
          {/*              <MergeTableCell>First</MergeTableCell>*/}
          {/*              <MergeTableCell>Second</MergeTableCell>*/}
          {/*            </TableRow>*/}
          {/*          </TableHead>*/}
          {/*          <TableBody>*/}
          {/*            {Object.keys(LocationNamingMap)*/}
          {/*              ?.filter(*/}
          {/*                (rowTitle) => rowTitle !== "id" && rowTitle !== "keyy"*/}
          {/*              )*/}
          {/*              .map((rowTitle, i) => {*/}
          {/*                return (*/}
          {/*                  <TableRow key={i}>*/}
          {/*                    <MergeTableCell*/}
          {/*                      className="att-name"*/}
          {/*                      style={{ padding: "5px 10px" }}*/}
          {/*                      align="left"*/}
          {/*                    >*/}
          {/*                      <div className={`div-inside`}>*/}
          {/*                        {LocationNamingMap[`${rowTitle}`]}*/}
          {/*                      </div>*/}
          {/*                    </MergeTableCell>*/}
          {/*                    <MergeTableCell align="left">*/}
          {/*                      <div className={`div-inside`}>*/}
          {/*                        <TextField*/}
          {/*                          id={`${rowTitle}`}*/}
          {/*                          name={`${rowTitle}`}*/}
          {/*                          fullWidth*/}
          {/*                          onChange={handleChange}*/}
          {/*                          size="small"*/}
          {/*                          value={handleRowData(rowTitle, dataToMerge)}*/}
          {/*                        />*/}
          {/*                        /!*{handleRowData(rowTitle, dataToMerge[0])}*!/*/}
          {/*                        /!*</TextField>*!/*/}
          {/*                      </div>*/}
          {/*                    </MergeTableCell>*/}
          {/*                    <MergeTableCell align="left">*/}
          {/*                      <div className={`div-inside`}>*/}
          {/*                        {handleRowData(rowTitle, objCompare)}*/}
          {/*                      </div>*/}
          {/*                    </MergeTableCell>*/}
          {/*                  </TableRow>*/}
          {/*                );*/}
          {/*              })}*/}
          {/*          </TableBody>*/}
          {/*        </Table>*/}
          {/*      </TableContainer>*/}
          {/*    </Card>*/}
        </Grid>
      </Box>
    </>
  );
}

export default CompareTable;
