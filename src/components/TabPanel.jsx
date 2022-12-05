import React from "react";
import { Box, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      width="100%"
      height="500px"
    >
      {value === index && <Box height="100px">{children}</Box>}
    </Box>
  );
}

export default TabPanel;
