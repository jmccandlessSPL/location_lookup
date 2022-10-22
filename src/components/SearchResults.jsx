import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const LocationNamingMap = {
  id: "ID",
  locName: "Name",
  locNameLong: "Long Name",
  dataCleanseLevel: "Data Cleanse Level",
  locType: "Type",
  locSubType: "Sub Type",
  locDesc: "Description",
  isActive: "Active",
  locRefId: "Reference ID",
  locRefIdType: "Reference ID Type",
  dqStatus: "DQ Status",
  notes: "Notes",
  lob: "Line of Business",
  workFlowStatus: "Work Flow Status",
  businessStatus: "Business Status",
  primaryOwner: "Primary Owner",
  effectiveStartDate: "Effective Start Date",
  effectiveEndDate: "Effective End Date",
  addrState: "Address State",
  addrCounty: "Address County",
  coordLonLat: "Coordinates",
  lon: "Longitude",
  lat: "Latitude",
  name: "Name",
  val: "Value",
  beId: "Business Entity ID",
  beRole: "Busniess Entity Role",
  internalProjSysName: "Internal Project System Name",
  keyy: "Key",
  status: "Status",
  locationChars: "Location Characters",
  parentLocId: "Parent Location ID",
  updatedBy: "Updated By",
  updatedOn: "Updated On",
  createdBy: "Created By",
  createdOn: "Created On",
  isDeleted: "Deleted",
};

function SearchResults({ searchResults }) {
  // console.log(Object.keys(LocationNamingMap));
  const [dataColumns, setDataColumns] = useState([{ field: "id" }]);

  useEffect(() => {
    setDataColumns(
      Object.keys(LocationNamingMap).map((shortName, index, array) => {
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
      <h2>Data Grid</h2>
      <Box sx={{ height: 400, width: "100%" }}>
        <h3>inside box</h3>
        <DataGrid
          rows={searchResults}
          columns={dataColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </>
  );
}

export default SearchResults;
