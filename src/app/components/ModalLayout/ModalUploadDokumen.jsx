import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import { Button, CircularProgress, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SelectContent from "app/components/SelectContent";
import DatepickerContent from "app/components/DatepickerContent";
import { getJenisDokumen } from "app/service/dokumenKhusus/dokumenKhusus.service";

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
  token,
  handleClose,
  openSnackBar,
  handleChangeOption,
  handleDateChange,
  handleNoDokumen,
  handleNamaDokumen,
  handleFileDokumen,
  handleSubmit,
  titleSnackBarSuccess,
  titleSnackBarFailed,
  handleCloseSnackBarSuccesDocument,
  handleCloseSnackBarfailedDocument
}) => {
  //state jenis dokumen
  const [jenisDokumen, setJenisDokumen] = useState("");

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
      </ModalContent>
    </>
  );
};

export default ModalUploadDokumen;
