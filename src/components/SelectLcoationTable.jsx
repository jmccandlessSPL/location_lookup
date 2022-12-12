import React, { useEffect, useState } from "react";
import { Box, Button, styled, TextField } from "@mui/material";

import "react-diff-view/style/index.css";
import { LocationNamingMap } from "../util/constants";

const EditTableTextArea = styled(TextField)(({ theme }) => ({
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0 5px",
  },
  // padding: "0",
}));

function SelectLocationTable({ objCompare }) {
  const [canEdit, setCanEdit] = useState(false);

  const [editableObj, setEditableObj] = useState({});

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

  useEffect(() => {
    setEditableObj(nestedObjManipNONORIG(objCompare));
  }, [objCompare]);

  function handleEditButton(e) {
    e.preventDefault();
    setCanEdit(true);
  }

  function handleSaveButton(e) {
    setCanEdit(false);
    console.log(editableObj);
    //need to put the obj back into the codebase formatting
  }

  function handleChange(e) {
    e.preventDefault();
    setEditableObj({ ...editableObj, [`${e.target.name}`]: e.target.value });
  }

  return (
    <>
      <Box
        className="tab-header"
        display="grid"
        gridTemplateColumns="1fr 3fr 1fr"
      >
        <h3 style={{ gridColumn: "2" }}>Single Location</h3>
        <Box className="edit-data-box" alignSelf="center">
          <button onClick={handleSaveButton}>save</button>
          <button onClick={handleEditButton}>edit</button>
        </Box>
      </Box>
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
                      <div
                        className="pre-style"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <EditTableTextArea
                          sx={{
                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                              canEdit
                                ? { borderWidth: "1px", borderStyle: "solid" }
                                : { border: "none" },
                          }}
                          name={rowTitle}
                          disabled={!canEdit}
                          value={editableObj[`${rowTitle}`] || ""}
                          onChange={(e) => handleChange(e)}
                        />
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
