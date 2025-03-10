import ModalContent from "./ModalContent";
import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ModalConfirm = ({
  open,
  title,
  titleButton,
  titleSnackBarSuccess,
  titleSnackBarFailed,
  handleSubmit,
  textContent,
  handleClose,
  openSnackBar,
  handleCloseSnackBarSuccesConfirm,
  handleCloseSnackBarfailedConfirm
}) => {
  return (
    <ModalContent
      open={open}
      openSnackBar={openSnackBar}
      success={openSnackBar.successConfirm}
      failed={openSnackBar.failedConfirm}
      handleCloseSnackBarSucces={handleCloseSnackBarSuccesConfirm}
      handleCloseSnackBarfailed={handleCloseSnackBarfailedConfirm}
      titleSnackBarSuccess={titleSnackBarSuccess}
      titleSnackBarFailed={titleSnackBarFailed}
    >
      <h2 style={{ fontWeight: "bold" }}>{title}</h2>
      <h3 style={{ textAlign: "center", textTransform: "capitalize" }}>{textContent}</h3>
      <div
        style={{ display: "flex", flexDirection: "row", gap: "0.5rem", justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{ fontSize: "13px" }}
          onClick={handleClose}
          startIcon={<CloseOutlinedIcon />}
        >
          Tutup
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          sx={{ fontSize: "13px" }}
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleSubmit}
        >
          {titleButton}
        </Button>
      </div>
    </ModalContent>
  );
};

export default ModalConfirm;
