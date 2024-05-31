import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Default({ show }) {
  return (
    <>
      {show && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            top: "0",
            left: "0",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "999999",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      )}
    </>
  );
}
