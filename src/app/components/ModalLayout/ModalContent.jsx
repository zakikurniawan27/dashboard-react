import { Box } from "@mui/material";
import SnackbarContent from "../SnackbarContent";
import Modal from "@mui/material/Modal";

const ModalContent = ({
  open,
  success,
  failed,
  children,
  openSnackBar,
  handleCloseSnackBarSucces,
  handleCloseSnackBarfailed,
  titleSnackBarSuccess,
  titleSnackBarFailed
}) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "100%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            padding: 2.5,
            overflow: "auto"
          }}
        >
          {children}
        </Box>
      </Modal>
      <SnackbarContent
        vertical={openSnackBar.vertical}
        horizontal={openSnackBar.horizontal}
        open={success}
        severity={"success"}
        handleCloseSnackBar={handleCloseSnackBarSucces}
      >
        {titleSnackBarSuccess}
      </SnackbarContent>
      <SnackbarContent
        vertical={openSnackBar.vertical}
        horizontal={openSnackBar.horizontal}
        open={failed}
        severity={"error"}
        handleCloseSnackBar={handleCloseSnackBarfailed}
      >
        {titleSnackBarFailed}
      </SnackbarContent>
    </>
  );
};

export default ModalContent;
