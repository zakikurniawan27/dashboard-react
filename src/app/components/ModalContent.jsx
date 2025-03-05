import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SelectContent from "app/components/SelectContent";
import DatepickerContent from "app/components/DatepickerContent";
import { getJenisDokumen } from "app/service/dokumenKhusus/dokumenKhusus.service";
import SnackbarContent from "./SnackbarContent";

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

const ModalContent = ({
  open,
  data,
  token,
  openSnackBar,
  setOpenSnackBar,
  setOpen,
  handleChangeOption,
  handleDateChange,
  handleNoDokumen,
  handleNamaDokumen,
  handleFileDokumen,
  handleSubmit
}) => {
  //state jenis dokumen
  const [jenisDokumen, setJenisDokumen] = useState("");

  //function to handle close modal
  const handleClose = () => setOpen(false);

  //function to handle close snackbar
  const handleCloseSnackBarSucces = () => setOpenSnackBar({ ...openSnackBar, success: false });
  const handleCloseSnackBarfailed = () => setOpenSnackBar({ ...openSnackBar, failed: false });

  //function handle get jenis dokumen
  const getJenisDokumenData = async () => {
    try {
      const { data } = await getJenisDokumen(token);
      setJenisDokumen(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJenisDokumenData();
  }, []);
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
            height: 570,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            padding: 2.5,
            overflow: "auto"
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Dokumen Khusus</h2>
          <ContentModal>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "initial", lineHeight: "1rem" }}>No Dokumen</p>
              <TextField
                fullWidth
                type="text"
                onChange={handleNoDokumen}
                id="fullWidth"
                name="noDokumen"
                placeholder="No Dokumen"
                variant="outlined"
                size="small"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "initial", lineHeight: "1rem" }}>Jenis Dokumen</p>
              <SelectContent
                title="Pilih Jenis Dokumen"
                option={jenisDokumen}
                selectedOption={data.selectedOption}
                handleChange={handleChangeOption}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "initial", lineHeight: "1rem" }}>Tanggal Terbit</p>
              <DatepickerContent
                selectedDate={data.selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "initial", lineHeight: "1rem" }}>Nama Dokumen</p>
              <TextField
                fullWidth
                type="text"
                multiline
                rows={4}
                placeholder="Nama Dokumen"
                onChange={handleNamaDokumen}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "initial", lineHeight: "1rem" }}>Upload File</p>
              <TextField
                fullWidth
                type="file"
                placeholder="Upload File"
                size="small"
                onChange={handleFileDokumen}
              />
            </div>
          </ContentModal>
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
        </Box>
      </Modal>
      <SnackbarContent
        vertical={openSnackBar.vertical}
        horizontal={openSnackBar.horizontal}
        open={openSnackBar.success}
        severity={"success"}
        handleCloseSnackBar={handleCloseSnackBarSucces}
      >
        Dokumen Berhasil Diunggah !
      </SnackbarContent>
      <SnackbarContent
        vertical={openSnackBar.vertical}
        horizontal={openSnackBar.horizontal}
        open={openSnackBar.failed}
        severity={"error"}
        handleCloseSnackBar={handleCloseSnackBarfailed}
      >
        Dokumen Gagal Diunggah !
      </SnackbarContent>
    </>
  );
};

export default ModalContent;
