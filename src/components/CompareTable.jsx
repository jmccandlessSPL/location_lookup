import React, { useEffect, useState } from "react";
import {
  Box,
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
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { useMemo } from "react";
import ReactDOM from "react-dom";
import { Input } from "antd";
import { diffLines, formatLines } from "unidiff";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import { useInput } from "./hooks";

// import "antd/dist/antd.min.css";
import "react-diff-view/style/index.css";
// import "./styles.css";

import tokenize from "./tokenize";

const EMPTY_HUNKS = [];

function CompareTable({
  handleChange,
  setDataToMerge,
  objCompare,
  dataToMerge,
  filteredLocationListFull,
  compareScreen,
}) {
  const uneditableAttr = {
    createdOn: true,
    updatedOn: true,
    createdBy: true,
    updatedBy: true,
  };

  const [totalCompFieldsArr, setTotalCompFieldsArr] = useState([
    ...new Set([...Object.keys(objCompare), ...Object.keys(dataToMerge)]),
  ]);

  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");

  // // const oldText = useInput(objCompare[0].locName);
  // // const newText = useInput(objCompare[1].locName);
  const [{ type, hunks }, setDiff] = useState("");
  const updateDiffText = useEffect(() => {
    const diffText = formatLines(diffLines(oldText, newText), {
      context: 3,
    });
    const [diff] = parseDiff(diffText, { nearbySequences: "zip" });
    setDiff(diff);
    console.log(diffText);
    console.log([diff]);
  }, [oldText, newText]);

  console.log("type", type);
  console.log("hunk", hunks);

  const tokens = useMemo(() => tokenize(hunks), [hunks]);
  console.log(diffLines(newText, oldText));
  console.log(formatLines(diffLines(newText, oldText)));
  console.log(parseDiff(newText));
  // const files = parseDiff(newText, oldText);
  const files = parseDiff("text3");
  console.log(files);
  const renderFile = ({ oldRevision, newRevision, type, hunks }) => (
    <Diff
      key={`${oldRevision}-${newRevision}`}
      viewType="split"
      diffType={type}
      hunks={hunks || EMPTY_HUNKS}
      // tokens={tokens}
      gutterType={"none"}
    >
      {(hunks) => hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
  );

  // console.log(totalCompFieldsArr);

  function createText(obj) {
    let text = ``;
    let text2 = ``;
    for (const att of totalCompFieldsArr) {
      text = text.concat(`
      ${att}: ${obj[`${att}`] || ""}`);
      // return `
      //   <span>
      //     ${text}
      //     <button>clickme</button>
      //   </span>
      // `;
    }
    // Object.entries(obj).map(([key, value], i) => {
    //   text2 = text2.concat(`
    //   ${key}: ${value}`);
    // return `
    //   <span>
    //     ${text2}
    //     <button>clickme</button>
    //   </span>
    // `;
    // });
    console.log(text);
    console.log(text2);
    return text;
  }

  const text1 = createText(dataToMerge);
  const text2 = createText(objCompare);

  return (
    <>
      <Box display={compareScreen ? "" : "none"}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Box>
            <h2>diff viewer</h2>
            <ReactDiffViewer
              rightTitle={"New Location"}
              leftTitle={"Old Location"}
              oldValue={text1}
              newValue={text2}
              splitView={true}
              hideLineNumbers={true}
              onLineNumberClick={(lineId) => console.log("click")}
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
