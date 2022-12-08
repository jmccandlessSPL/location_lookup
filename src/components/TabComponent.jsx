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
      <Box width="40%">
        <Box
          sx={{
            // flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs
            // orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Compare" />
            <Tab label="Selected" />
          </Tabs>
        </Box>
        {/*<TabPanel value={value} index={0}>*/}
        {/*  {lookupForm}*/}
        {/*</TabPanel>*/}
        <TabPanel value={value} index={0}>
          {comparingTable}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {singleLocationTable}
        </TabPanel>
      </Box>
    </>
  );
}

export default TabComponent;
