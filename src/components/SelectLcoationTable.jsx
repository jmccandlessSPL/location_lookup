import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ReactDiffViewer from "react-diff-viewer";
import { useMemo } from "react";
import tokenize from "./tokenize";

import "react-diff-view/style/index.css";
import { LocationNamingMap } from "../util/constants";

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
      <Box className="compare-table-box" height="400px"></Box>
    </>
  );
}

export default SelectLocationTable;
