import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "./TabPanel";

function TabComponent(props) {
  const { comparingTable, lookupForm } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        width="40%"
        sx={{
          // flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Input" />
          <Tab label="Compare" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {lookupForm}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {comparingTable}
        </TabPanel>
      </Box>
    </>
  );
}

export default TabComponent;
