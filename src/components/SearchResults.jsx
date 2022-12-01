import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { LocationNamingMap } from "../util/constants";
import axios from "axios";

function SearchResults({
  searchResults,
  setSelectedResult,
  setApiError,
  setFullList,
  setSearchResults,
}) {
  const [dataColumns, setDataColumns] = useState([{ field: "id" }]);

  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";

  const retrieveLocations = async (url) => {
    try {
      setApiError(null);
      const res = await axios.get([`${url}`]);
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
      console.log(data);
      data.forEach((el) => {
        el.createdOn = dateAdjust(el.createdOn);
        el.updatedOn = dateAdjust(el.updatedOn);
      });
      console.log(data);
      setFullList(data);
      setSearchResults(data);
    });
  }, [baseURL]);

  useEffect(() => {
    setDataColumns(
      Object.keys(LocationNamingMap).map((shortName) => {
        const obj = {};
        obj.field = shortName;
        obj.headerName = LocationNamingMap[`${shortName}`];
        obj.width = 160;
        return obj;
      })
    );
  }, []);

  return (
    <>
      {/*<Grid*/}
      {/*  container*/}
      {/*  spacing={0}*/}
      {/*  direction="column"*/}
      {/*  alignItems="center"*/}
      {/*  justify="center"*/}
      {/*  style={{ minHeight: "100vh" }}*/}
      {/*>*/}
      <Box height="600px" width="50%">
        <h2>Data Grid</h2>
        <DataGrid
          onCellClick={(rowData) => setSelectedResult(rowData.row)}
          rows={searchResults || []}
          columns={dataColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableMultipleSelection={true}
          // disableSelectionOnClick
        />
      </Box>
      {/*</Grid>*/}
    </>
  );
}

export default SearchResults;
