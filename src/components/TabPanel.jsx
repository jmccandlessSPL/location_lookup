import React from "react";
import { Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <>
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        height="100%"
        maxHeight="452px"
      >
        {value === index && (
          <Box
            id="single-tab"
            display="flex"
            flexDirection="column"
            height="100%"
          >
            {children}
          </Box>
        )}
      </Box>
    </>
  );
}

export default TabPanel;
