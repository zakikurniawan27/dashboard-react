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
import ModalContent from "app/components/ModalContent";
import {
  dokumenKhususService,
  postDokumenKhusus
} from "app/service/dokumenKhusus/dokumenKhusus.service";

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
    isLoading: false,
    noDokumen: "",
    name: "",
    file: "",
    selectedOption: "",
    selectedDate: date
  });

  //state open snackbar
  const [openSnackBar, setOpenSnackBar] = useState({
    success: false,
    failed: false,
    vertical: "bottom",
    horizontal: "right"
  });

  //state dokumen khusus
  const [dokumenKhusus, setDokumenKhusus] = useState("");

  //state open modal
  const [open, setOpen] = useState(false);

  //state search
  const [search, setSearch] = useState("");

  //function to handle open modal
  const handleOpen = () => setOpen(true);

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

  //function to handle keypress Enter in keyboard on input search
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchDokumenKhusus();
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

  //function handle to post data dokumen khusus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStateData({ ...stateData, isLoading: true });
      await postDokumenKhusus(formData, token);
      setOpenSnackBar({ ...openSnackBar, success: true });
      console.log("Fetching updated dokumen khusus...");
      await getDokumenKhusus();
      setStateData({ ...stateData, isLoading: false });
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setOpen(false);
      setOpenSnackBar({ ...openSnackBar, failed: true });
    }
  };

  useEffect(() => {
    getDokumenKhusus();
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
              <Button variant="outlined" onClick={handleOpen}>
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
        {/** Begin Modal */}
        <ModalContent
          open={open}
          data={stateData}
          token={token}
          openSnackBar={openSnackBar}
          setOpen={setOpen}
          setOpenSnackBar={setOpenSnackBar}
          handleChangeOption={handleChangeOption}
          handleDateChange={handleDateChange}
          handleFileDokumen={handleFileDokumen}
          handleNamaDokumen={handleNamaDokumen}
          handleNoDokumen={handleNoDokumen}
          handleSubmit={handleSubmit}
        />
        {/** End Modal */}
      </ThemeProvider>
    </>
  );
};

export default DokumenKhusus;
