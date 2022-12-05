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
      <h3>Compare Table</h3>
      <Box className="compare-table-box" height="400px">
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
              width: "100%",
            },
            content: {
              // td
            },
            diffContainer: {
              // table
              "& tbody": {},
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
    </>
  );
}

export default CompareTable;
