import React from "react";
import { Box, Paper, styled, Tab, Tabs } from "@mui/material";
import TabPanel from "./TabPanel";

const StyledTab = styled(Tab)(({ theme }) => ({
  padding: "0px 10px",
  width: "max-content",
  minWidth: "0px",
  maxWidth: "150px",
  margin: "0 10px",
}));

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
          onChange={(e, val) => handleChange(e, val)}
          textColor="inherit"
          scrollButtons={false}
          sx={{
            padding: "0px 15px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <StyledTab className="tab-name" label="Input" />
          <StyledTab className="tab-name" label="Compare" />
          <StyledTab className="tab-name" label="Edit" />
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
