import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { InputAdornment, TableCell } from "@mui/material";
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import ModalContent from "app/components/ModalContent";
import SelectContent from "app/components/SelectContent";
import DatepickerContent from "app/components/DatepickerContent";
import { dokumenKhususService } from "app/service/dokumenKhusus/dokumenKhusus.service";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

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

const jenisDokumen = [
  { label: "Surat Keputusan Direktur" },
  { label: "Peraturan Direktur" },
  { label: "Peraturan Daerah" },
  { label: "Peraturan Bupati" },
  { label: "Perjanjian Kerja Sama" }
];

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

  //format date
  const todayFormatted =
    data.selectedDate.getFullYear() +
    "-" +
    String(data.selectedDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(data.selectedDate.getDate()).padStart(2, "0");

  //state dokumen khusus
  const [dokumenKhusus, setDokumenKhusus] = useState("");

  //state open modal
  const [open, setOpen] = useState(false);

  //function to handle open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    e.preventDefault();
    if (e.target.files) {
      setData({ ...data, file: e.target.files[0] });
    }
  };

  //function to get data dokumen khusus
  const getDokumenKhusus = async () => {
    try {
      const { data } = await dokumenKhususService();
      setDokumenKhusus(data);
    } catch (error) {
      console.log(error);
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
            <PaginationTable data={dokumenKhusus}>
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
        <ModalContent open={open}>
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
            >
              Simpan
            </Button>
          </BoxButtonModal>
        </ModalContent>
        {/** End Modal */}
      </ThemeProvider>
    </>
  );
};

export default DokumenKhusus;
