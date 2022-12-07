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

// attritubes that need a date type input
export const dateAttributes = [
  "updatedOn",
  "createdOn",
  "effectiveStartDate",
  "effectiveEndDate",
];

// location attributes for the grid. gets rid of nested obj and
export const AbbrLocationMapForDataGrid = {
  id: "ID",
  locName: "Name",
  locNameLong: "Long Name",
  locType: "Type",
  locSubType: "Sub Type",
  isActive: "Active",
  businessStatus: "Business Status",
  primaryOwner: "Primary Owner",
  effectiveStartDate: "Effective Start Date",
  effectiveEndDate: "Effective End Date",
  addrState: "Address State",
  addrCounty: "Address County",
  beId: "Business Entity ID",
  beRole: "Busniess Entity Role",
  status: "Status",
  parentLocId: "Parent Location ID",
  updatedBy: "Updated By",
  updatedOn: "Updated On",
  createdBy: "Created By",
  createdOn: "Created On",
};

export const LocationInfoFromTags = ["Location", "Station", "Station No."];

/*

/*
 * Cylinder Tag Inputs
 * Cylinder #
 * Company
 * System
 * Location
 * Sample Of (Checkbox or radio with Gas, Oil, Condensate)
 * Station
 * Station No.
 * Sample Point
 * Type (Checkbox or radio with Spot, composite
 * Source Pressure
 * Source Temperature
 * Ambient Temperature
 * Sampled By
 * Company
 * Date/Time Off (am/pm)
 * On (am/pm)
 * Sample Pressure? (Checkbox PSIG, PSIA)
 * Sample Temperature
 * H20 Count
 * H2S Count (Checkbox PPM, Grains, %)
 * % Outage
 * Remarks?
 *
 * */
