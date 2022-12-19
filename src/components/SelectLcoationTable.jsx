import React, { useEffect, useState } from "react";
import { Box, styled, TextField } from "@mui/material";

import "react-diff-view/style/index.css";
import {
  AttNotNeededSingleLocTable,
  LocationNamingMap,
  MinimumFieldsSureVue,
  nestedObjManipNONORIG,
} from "../util/constants";

const EditTableTextArea = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0 5px",
  },
}));

function SelectLocationTable({ objCompare, isInfoDetailed }) {
  const [canEdit, setCanEdit] = useState(false);

  const [editableObj, setEditableObj] = useState({});

  useEffect(() => {
    setEditableObj(nestedObjManipNONORIG(objCompare));
  }, [objCompare]);

  function handleEditButton(e) {
    e.preventDefault();
    setCanEdit(true);
  }

  function handleSaveButton() {
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
      <Box className="tab-header">
        <h3 className="tab-body-title">Single Location</h3>
        <Box className="tab-body-title-right">
          <button onClick={handleEditButton}>edit</button>
          <button onClick={handleSaveButton}>save</button>
        </Box>
      </Box>
      <Box id="single-location-info">
        <table>
          <tbody className="select-local-table">
            <tr>
              <td className="title-block table-divider">Attribute</td>
              <td className="title-block">Value</td>
            </tr>
            {Object.keys(
              isInfoDetailed ? LocationNamingMap : MinimumFieldsSureVue
            )
              ?.filter(
                (rowTitle) => !AttNotNeededSingleLocTable.includes(rowTitle)
              )
              .sort()
              .map((rowTitle, i) => {
                return (
                  <tr key={i}>
                    <td className="att-name table-divider" align="left">
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
