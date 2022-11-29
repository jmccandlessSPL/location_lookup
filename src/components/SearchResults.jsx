import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { LocationNamingMap } from "../util/constants";

function SearchResults({ searchResults, setSelectedResult }) {
  const [dataColumns, setDataColumns] = useState([{ field: "id" }]);

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

  // const columns = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "firstName",
  //     headerName: "First name",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
  // ];

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <h2>Data Grid</h2>
        <Box height="600px" width="70%">
          <DataGrid
            onCellClick={(rowData) => setSelectedResult(rowData.row)}
            rows={searchResults}
            columns={dataColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            disableMultipleSelection={true}
            // disableSelectionOnClick
          />
        </Box>
      </Grid>
    </>
  );
}

export default SearchResults;
