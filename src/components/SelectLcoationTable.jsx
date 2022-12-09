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

function SelectLocationTable({ objCompare }) {
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
        <table style={{ height: "inherit", width: "100%" }}>
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
              ?.filter(
                (rowTitle) =>
                  rowTitle !== "id" && rowTitle !== "keyy" && rowTitle !== "lon"
              )
              .sort()
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
                      <div className="pre-style">
                        {nestedObjManipNONORIG(objCompare)[`${rowTitle}`]}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Box>
    </>
  );
}

export default SelectLocationTable;
