import { Snackbar, Alert } from "@mui/material";

const SnackbarContent = ({
  open,
  handleCloseSnackBar,
  children,
  severity,
  vertical,
  horizontal
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleCloseSnackBar}
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
    >
      <Alert
        onClose={handleCloseSnackBar}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarContent;
