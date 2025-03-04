import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { InputAdornment, TableCell } from "@mui/material";
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
  const [data, setData] = useState({
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

  //function to handle open modal
  const handleOpen = () => setOpen(true);

  //function to handle change date
  const handleDateChange = (date) => setData({ ...data, selectedDate: date });

  //function to handle change option select
  const handleChangeOption = (e) => {
    e.preventDefault();
    setData({ ...data, selectedOption: e.target.value });
  };

  //function to handle no dokumen
  const handleNoDokumen = (e) => {
    e.preventDefault();
    setData({ ...data, noDokumen: e.target.value });
  };

  //function to handle nama dokumen
  const handleNamaDokumen = (e) => {
    e.preventDefault();
    setData({ ...data, name: e.target.value });
  };

  //function to handle file dokumen
  const handleFileDokumen = (e) => {
    if (e.currentTarget.files) {
      setData({ ...data, file: e.currentTarget.files[0] });
    }
  };

  //function to get data dokumen khusus
  const getDokumenKhusus = async () => {
    try {
      const { data } = await dokumenKhususService(token);
      setDokumenKhusus(data);
    } catch (error) {
      console.log(error);
    }
  };

  //format date
  const todayFormatted =
    data.selectedDate.getFullYear() +
    "-" +
    String(data.selectedDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(data.selectedDate.getDate()).padStart(2, "0");

  //store and manage data entered by users through forms
  const formData = new FormData();
  formData.append("jenis_dokumen", data.selectedOption);
  formData.append("no_dokumen", data.noDokumen);
  formData.append("tanggal_terbit", todayFormatted);
  formData.append("nama_dokumen", data.name);
  formData.append("file_dokumen", data.file);

  //function handle to post data dokumen khusus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDokumenKhusus(formData, token);
      setOpen(false);
      setOpenSnackBar({ ...openSnackBar, success: true });
      console.log("Fetching updated dokumen khusus...");
      await getDokumenKhusus();
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
        <ContentBox>
          <Card sx={{ width: "100%" }}>
            <CardContent style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}>
              <TextField
                fullWidth
                type="text"
                name="search"
                placeholder="Cari Dokumen"
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
              <Button variant="outlined" color="ochre">
                <SearchOutlinedIcon color="ochre" />
              </Button>
              <Button variant="outlined" onClick={handleOpen}>
                <ArticleOutlinedIcon />
              </Button>
            </CardContent>
          </Card>
          {/** Begin Table */}
          <Card>
            <PaginationTable key={dokumenKhusus.length} data={dokumenKhusus}>
              <TableCell align="left">No</TableCell>
              <TableCell align="center">Jenis Dokumen</TableCell>
              <TableCell align="center">No Dokumen</TableCell>
              <TableCell align="center">Tahun</TableCell>
              <TableCell align="center">Nama Dokumen</TableCell>
              <TableCell align="center">Tanggal Terbit</TableCell>
              <TableCell align="right">Actions</TableCell>
            </PaginationTable>
          </Card>
          {/** End Table */}
        </ContentBox>
        {/** Begin Modal */}
        <ModalContent
          open={open}
          data={data}
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
