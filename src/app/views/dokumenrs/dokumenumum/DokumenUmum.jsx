import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TableCell,
  TextField
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useState, useEffect } from "react";
import {
  deleteDokumenUmumService,
  getDokumenUmumService
} from "app/service/dokumenUmum/dokumenUmum.service";
import ModalUploadDokumen from "app/components/ModalLayout/ModalUploadDokumen";
import ModalConfirm from "app/components/ModalLayout/ModalConfirm";

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

const DokumenUmum = () => {
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
    dokumenUmum: "",
    search: ""
  });

  //format date
  const todayFormatted =
    stateData.selectedDate.getFullYear() +
    "-" +
    String(stateData.selectedDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(stateData.selectedDate.getDate()).padStart(2, "0");

  //state open snackbar
  const [openSnackBar, setOpenSnackBar] = useState({
    successDokumen: false,
    successConfirm: false,
    failedDokumen: false,
    failedConfirm: false,
    vertical: "bottom",
    horizontal: "right"
  });

  //state open modal
  const [stateOpen, setStateOpen] = useState({
    openModalUploadDokumen: false,
    openModalConfirm: false
  });

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

  //function to handle search
  const handleSearch = (e) => setStateData({ ...stateData, search: e.targer.value });

  //function to get search document umum
  const searchDokumenUmum = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      const { data } = await getDokumenUmum(token, stateData.search);
      setStateData((prev) => ({ ...prev, dokumenUmum: data, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  //function to handle keypress Enter in keyboard on input search
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchDokumenUmum();
    }
  };

  //function to get document umum
  const getDokumenUmum = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      const { data } = await getDokumenUmumService(token, stateData.search);
      setStateData((prev) => ({ ...prev, dokumenUmum: data, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

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
      await deleteDokumenUmumService(token, stateData.id);
      setOpenSnackBar({ ...openSnackBar, successConfirm: true });
      await getDokumenUmum();
      setStateData({ ...stateData, isLoading: false });
      handleCloseModalConfirm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDokumenUmum();
  }, []);
  return (
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
            <Button variant="outlined" color="ochre" onClick={searchDokumenUmum}>
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
            key={stateData.dokumenUmum.length}
            stateData={stateData}
            data={stateData.dokumenUmum}
            token={token}
            handleDelete={handleOpenModalConfirm}
          >
            <TableCell align="center">No</TableCell>
            <TableCell align="center">Jenis Dokumen</TableCell>
            <TableCell align="center">No Dokumen</TableCell>
            <TableCell align="center">Tahun</TableCell>
            <TableCell align="center">Nama Dokumen</TableCell>
            <TableCell align="center">Pokja</TableCell>
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
        token={token}
        handleClose={handleCloseModalDokumen}
        openSnackBar={openSnackBar}
        handleChangeOption={handleChangeOption}
        handleDateChange={handleDateChange}
        handleFileDokumen={handleFileDokumen}
        handleNamaDokumen={handleNamaDokumen}
        handleNoDokumen={handleNoDokumen}
        handleSubmit={handleSubmit}
        titleSnackBarSuccess={"Dokumen Berhasil Tersimpan !"}
        titleSnackBarFailed={"Dokumen Gagal Tersimpan !"}
        handleCloseSnackBarSuccesDocument={handleCloseSnackBarSuccesDocument}
        handleCloseSnackBarfailedDocument={handleCloseSnackBarfailedDocument}
      />
      \{/** End Modal Upload Dokumen */}
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
  );
};

export default DokumenUmum;
