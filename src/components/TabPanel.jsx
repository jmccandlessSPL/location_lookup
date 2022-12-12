import React from "react";
import { Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      width="100%"
      height="500px"
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export default TabPanel;
