import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  AbbrLocationMapForDataGrid,
  LocationNamingMap,
} from "../util/constants";
import axios from "axios";
import { Box, styled } from "@mui/material";

const StyledMuiDataGrid = styled(DataGrid)(({ theme }) => ({
  height: "390px",
}));

function SearchResults({
  searchResults,
  setSelectedResult,
  setApiError,
  setFullList,
  setSearchResults,
}) {
  const [dataColumns, setDataColumns] = useState([{}]);

  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";

  const retrieveLocations = async (url) => {
    try {
      setApiError(null);
      const res = await axios.get(`${url}`);
      return res.data;
    } catch (err) {
      setApiError(err);
    }
  };

  function dateAdjust(isoDate) {
    return new Date(isoDate).toLocaleString();
  }

  useEffect(() => {
    retrieveLocations(baseURL).then((data) => {
      data?.forEach((el) => {
        el.createdOn = dateAdjust(el.createdOn);
        el.updatedOn = dateAdjust(el.updatedOn);
      });
      setFullList(data);
      setSearchResults(data);
    });
  }, [setFullList, setSearchResults, baseURL]);

  useEffect(() => {
    setDataColumns(
      Object.keys(AbbrLocationMapForDataGrid).map((shortName) => {
        const obj = {};
        obj.field = shortName;
        obj.headerName = LocationNamingMap[`${shortName}`];
        obj.width = 160;
        return obj;
      })
    );
  }, [setFullList, setSearchResults]);

  return (
    <>
      {/*<Box marginTop="110px">*/}
      <h3>Location List</h3>
      <StyledMuiDataGrid
        onCellClick={(rowData) => setSelectedResult(rowData.row)}
        rows={searchResults || []}
        columns={dataColumns || null}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableMultipleSelection={true}
        // autoHeight={true}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        // disableSelectionOnClick
      />
      {/*</Box>*/}
    </>
  );
}

export default SearchResults;
