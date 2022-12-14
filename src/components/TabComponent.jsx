import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "./TabPanel";

function TabComponent(props) {
  const { comparingTable, lookupForm, singleLocationTable } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box id="tab-panel-full">
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Input" />
          <Tab label="Compare" />
          <Tab label="Edit" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {lookupForm}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {comparingTable}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {singleLocationTable}
      </TabPanel>
    </>
  );
}

export default TabComponent;
