import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Alert, AlertTitle, InputAdornment, TableCell } from "@mui/material";
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import {
  deleteDokumenKhusus,
  dokumenKhususService,
  getJenisDokumen,
  postDokumenKhusus
} from "app/service/dokumenKhusus/dokumenKhusus.service";
import ModalUploadDokumen from "app/components/ModalLayout/ModalUploadDokumen";
import ModalConfirm from "app/components/ModalLayout/ModalConfirm";
import SelectContent from "app/components/SelectContent";
import DatepickerContent from "app/components/DatepickerContent";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

const theme = createTheme({
  palette: {
    ochre: {
      main: "#E3D026",
      light: "#E9DB5D",
      dark: "#A29415"
    }
  }
});

const DokumenKhusus = () => {
  //get token from local storage
  const token = localStorage.getItem("accessToken");
  //state date
  const date = new Date();

  //state data dokumen
  const [stateData, setStateData] = useState({
    id: "",
    isLoading: false,
    noDokumen: "",
    name: "",
    file: "",
    selectedOption: "",
    selectedDate: date,
    jenisDokumen: ""
  });

  //state open snackbar
  const [openSnackBar, setOpenSnackBar] = useState({
    successDokumen: false,
    successConfirm: false,
    failedDokumen: false,
    failedConfirm: false,
    vertical: "bottom",
    horizontal: "right"
  });

  //state dokumen khusus
  const [dokumenKhusus, setDokumenKhusus] = useState("");

  //state open modal
  const [stateOpen, setStateOpen] = useState({
    openModalUploadDokumen: false,
    openModalConfirm: false
  });

  //state search
  const [search, setSearch] = useState("");

  //function to handle open modal
  const handleOpenModalDokumen = () => setStateOpen({ ...stateOpen, openModalUploadDokumen: true });

  //function to handle close modal dokumen
  const handleCloseModalDokumen = () =>
    setStateOpen({ ...stateOpen, openModalUploadDokumen: false });

  //function to handle open modal confirm
  const handleOpenModalConfirm = (id) => {
    setStateOpen({ ...stateOpen, openModalConfirm: true });
    setStateData({ ...stateData, id: id });
  };

  //function to handle close modal confirm
  const handleCloseModalConfirm = () => setStateOpen({ ...stateOpen, openModalConfirm: false });

  //function to handle close snackbar document
  const handleCloseSnackBarSuccesDocument = () =>
    setOpenSnackBar({ ...openSnackBar, successDokumen: false });
  const handleCloseSnackBarfailedDocument = () =>
    setOpenSnackBar({ ...openSnackBar, failedDokumen: false });

  //function to handle close snackbar confirm
  const handleCloseSnackBarSuccesConfirm = () =>
    setOpenSnackBar({ ...openSnackBar, successConfirm: false });
  const handleCloseSnackBarfailedConfirm = () =>
    setOpenSnackBar({ ...openSnackBar, failedConfirm: false });

  //function to handle search
  const handleSearch = (e) => setSearch(e.target.value);

  //function to handle change date
  const handleDateChange = (date) => setStateData({ ...stateData, selectedDate: date });

  //function to handle change option select
  const handleChangeOption = (e) => setStateData({ ...stateData, selectedOption: e.target.value });

  //function to handle no dokumen
  const handleNoDokumen = (e) => setStateData({ ...stateData, noDokumen: e.target.value });

  //function to handle nama dokumen
  const handleNamaDokumen = (e) => setStateData({ ...stateData, name: e.target.value });

  //function to handle file dokumen
  const handleFileDokumen = (e) => {
    if (e.currentTarget.files) {
      setStateData({ ...stateData, file: e.currentTarget.files[0] });
    }
  };

  //function to handle keypress Enter in keyboard on input search
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchDokumenKhusus();
    }
  };

  //function to get data dokumen khusus
  const getDokumenKhusus = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      const { data } = await dokumenKhususService(token, search);
      setDokumenKhusus(data);
      setStateData({ ...stateData, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  //function handle get jenis dokumen
  const getJenisDokumenData = async () => {
    try {
      const { data } = await getJenisDokumen(token);
      setStateData((prev) => ({ ...prev, jenisDokumen: data }));
    } catch (error) {
      console.log(error);
    }
  };

  //function to search data dokumen khusus
  const searchDokumenKhusus = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      const { data } = await dokumenKhususService(token, search);
      setDokumenKhusus(data);
      setStateData({ ...stateData, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  //format date
  const todayFormatted =
    stateData.selectedDate.getFullYear() +
    "-" +
    String(stateData.selectedDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(stateData.selectedDate.getDate()).padStart(2, "0");

  //store and manage data entered by users through forms
  const formData = new FormData();
  formData.append("jenis_dokumen", stateData.selectedOption);
  formData.append("no_dokumen", stateData.noDokumen);
  formData.append("tanggal_terbit", todayFormatted);
  formData.append("nama_dokumen", stateData.name);
  formData.append("file_dokumen", stateData.file);

  //function to handle post data dokumen khusus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStateData({ ...stateData, isLoading: true });
      await postDokumenKhusus(formData, token);
      setOpenSnackBar({ ...openSnackBar, successDokumen: true });
      await getDokumenKhusus();
      setStateData({ ...stateData, isLoading: false });
      handleCloseModalDokumen();
    } catch (error) {
      console.log(error);
      alert(error);
      setStateOpen({ ...stateOpen, openModalUploadDokumen: false });
      setOpenSnackBar({ ...openSnackBar, failed: true });
    }
  };

  //function to handle delete document
  const handleDelete = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      await deleteDokumenKhusus(token, stateData.id);
      setOpenSnackBar({ ...openSnackBar, successConfirm: true });
      await getDokumenKhusus();
      setStateData({ ...stateData, isLoading: false });
      handleCloseModalConfirm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDokumenKhusus();
    getJenisDokumenData();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        {!token && (
          <Alert
            severity="error"
            variant="filled"
            sx={{
              position: "absolute",
              top: "3%",
              left: "37%"
            }}
          >
            <AlertTitle>Error</AlertTitle>
            You do not have access, please log in again !
          </Alert>
        )}
        <ContentBox>
          <Card sx={{ width: "100%" }}>
            <CardContent style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}>
              <TextField
                fullWidth
                onKeyDown={handleEnterSearch}
                type="text"
                name="search"
                placeholder="Cari Dokumen"
                onChange={handleSearch}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    )
                  }
                }}
                size="small"
              />
              <Button variant="outlined" color="ochre" onClick={searchDokumenKhusus}>
                <SearchOutlinedIcon color="ochre" />
              </Button>
              <Button variant="outlined" onClick={handleOpenModalDokumen}>
                <ArticleOutlinedIcon />
              </Button>
            </CardContent>
          </Card>
          {/** Begin Table */}
          <Card>
            <PaginationTable
              key={dokumenKhusus.length}
              stateData={stateData}
              data={dokumenKhusus}
              token={token}
              handleDelete={handleOpenModalConfirm}
            >
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Jenis Dokumen</TableCell>
              <TableCell align="center">No Dokumen</TableCell>
              <TableCell align="center">Tahun</TableCell>
              <TableCell align="center">Nama Dokumen</TableCell>
              <TableCell align="center">Tanggal Terbit</TableCell>
              <TableCell align="center">Actions</TableCell>
            </PaginationTable>
          </Card>
          {/** End Table */}
        </ContentBox>
        {/** Begin Modal Upload Dokumen */}
        <ModalUploadDokumen
          open={stateOpen.openModalUploadDokumen}
          data={stateData}
          title={"Dokumen Khusus"}
          handleClose={handleCloseModalDokumen}
          openSnackBar={openSnackBar}
          handleSubmit={handleSubmit}
          titleSnackBarSuccess={"Dokumen Berhasil Tersimpan !"}
          titleSnackBarFailed={"Dokumen Gagal Tersimpan !"}
          handleCloseSnackBarSuccesDocument={handleCloseSnackBarSuccesDocument}
          handleCloseSnackBarfailedDocument={handleCloseSnackBarfailedDocument}
        >
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
              option={stateData.jenisDokumen}
              selectedOption={stateData.selectedOption}
              handleChange={handleChangeOption}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontWeight: "initial", lineHeight: "1rem" }}>Tanggal Terbit</p>
            <DatepickerContent
              selectedDate={stateData.selectedDate}
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
        </ModalUploadDokumen>
        {/** End Modal Upload Dokumen */}

        {/** Begin Modal Confirm */}
        <ModalConfirm
          open={stateOpen.openModalConfirm}
          handleClose={handleCloseModalConfirm}
          openSnackBar={openSnackBar}
          title={"Hapus Dokumen"}
          titleButton={"Hapus"}
          titleSnackBarSuccess={"Dokumen Berhasil Terhapus !"}
          titleSnackBarFailed={"Dokumen Gagal Terhapus !"}
          handleCloseSnackBarSuccesConfirm={handleCloseSnackBarSuccesConfirm}
          handleCloseSnackBarfailedConfirm={handleCloseSnackBarfailedConfirm}
          handleSubmit={handleDelete}
          textContent={"apakah anda yakin ingin menghapus dokumen ini ?"}
        />
        {/** End Modal Confirm */}
      </ThemeProvider>
    </>
  );
};

export default DokumenKhusus;
