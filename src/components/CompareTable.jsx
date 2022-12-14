import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ReactDiffViewer from "react-diff-viewer";
import { useMemo } from "react";
import tokenize from "./tokenize";

import "react-diff-view/style/index.css";
import {
  LocationNamingMapMinimized,
  nestedObjManipNONORIG,
} from "../util/constants";

function CompareTable({ objCompare, dataToMerge }) {
  const [totalCompFieldsArr, setTotalCompFieldsArr] = useState([
    ...new Set([
      ...Object.keys(objCompare),
      ...Object.keys(dataToMerge),
      "lng",
    ]),
  ]);

  const [inputText, setInputText] = useState("");
  const [compareText, setCompareText] = useState("");
  const [{ hunks }] = useState("");

  useMemo(() => tokenize(hunks), [hunks]);

  useEffect(() => {
    setInputText(createText(nestedObjManipNONORIG(dataToMerge)));
    setCompareText(createText(nestedObjManipNONORIG(objCompare)));
  }, [dataToMerge, objCompare]);

  function createText(obj) {
    let text = ``;
    for (const att of totalCompFieldsArr.sort()) {
      if (LocationNamingMapMinimized[`${att}`]) {
        text = text.concat(`
  ${LocationNamingMapMinimized[`${att}`]}: ${obj[`${att}`] || ""}`);
      }
    }
    return text;
  }

  return (
    <>
      <Box className="tab-header">
        <h3 className="tab-body-title">Compare Locations</h3>
      </Box>
      <Box id="compare-data-table">
        <ReactDiffViewer
          leftTitle={"Input Location"}
          rightTitle={"Existing Location"}
          oldValue={inputText}
          newValue={compareText}
          splitView={true}
          hideLineNumbers={true}
          showDiffOnly={false}
          codeFoldMessageRenderer={(num1) => {
            return <p>Expand Rows ({num1} rows have same data)</p>;
          }}
          // extraLinesSurroundingDiff={5}
          onLineNumberClick={(lineId) => console.log("click")}
          styles={{
            wordDiff: {
              padding: 0,
            },
            contentText: {
              minWidth: "max-content",
              width: "100%",
            },
            content: {
              //td
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
