import React from "react";
import { Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <>
      <Box
        id={`simple-tabpanel-${index}`}
        className="tab-panel-component"
        role="tabpanel"
        hidden={value !== index}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && <Box className="single-tab">{children}</Box>}
      </Box>
    </>
  );
}

export default TabPanel;
