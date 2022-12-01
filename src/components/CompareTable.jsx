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

  console.log(objCompare);
  // console.log(nestedObjManipNONORIG(objCompare));

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
      <Box display={compareScreen ? "" : "none"}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
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
        </Grid>
      </Box>
    </>
  );
}

export default CompareTable;
