import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

function SnackbarDefault({open, handleClose, message}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarDefault;
