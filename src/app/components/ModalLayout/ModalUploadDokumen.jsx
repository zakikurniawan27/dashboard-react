import ModalContent from "./ModalContent";
import { Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const BoxButtonModal = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  justifyContent: "end"
}));

const ContentModal = styled("div")(() => ({
  borderTop: "1px solid #a0a0a0",
  borderBottom: "1px solid #a0a0a0",
  paddingTop: "10px",
  paddingBottom: "10px ",
  marginBottom: "10px"
}));

const ModalUploadDokumen = ({
  open,
  data,
  title,
  children,
  handleClose,
  openSnackBar,
  handleSubmit,
  titleSnackBarSuccess,
  titleSnackBarFailed,
  handleCloseSnackBarSuccesDocument,
  handleCloseSnackBarfailedDocument
}) => {
  return (
    <>
      <ModalContent
        open={open}
        openSnackBar={openSnackBar}
        success={openSnackBar.successDokumen}
        failed={openSnackBar.faildeDokumen}
        titleSnackBarSuccess={titleSnackBarSuccess}
        titleSnackBarFailed={titleSnackBarFailed}
        handleCloseSnackBarSucces={handleCloseSnackBarSuccesDocument}
        handleCloseSnackBarfailed={handleCloseSnackBarfailedDocument}
      >
        <h2 style={{ fontWeight: "bold" }}>{title}</h2>
        <ContentModal>{children}</ContentModal>
        <BoxButtonModal>
          <Button
            variant="outlined"
            color="error"
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
            sx={{ fontSize: "13px" }}
            startIcon={<SaveAltOutlinedIcon />}
            disabled={!data.name || !data.noDokumen || !data.file || !data.selectedOption}
            onClick={handleSubmit}
          >
            Simpan
          </Button>
          {data.isLoading === true && (
            <CircularProgress
              size={70}
              sx={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-60%, -50%)"
              }}
            />
          )}
        </BoxButtonModal>
      </ModalContent>
    </>
  );
};

export default ModalUploadDokumen;
