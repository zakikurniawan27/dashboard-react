import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import { TableCell } from "@mui/material";

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
  return (
    <>
      <ThemeProvider theme={theme}>
        <ContentBox>
          <Card sx={{ width: "100%" }}>
            <CardContent style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}>
              <TextField fullWidth type="text" id="fullWidth" name="search" label="Cari Dokumen" />
              <Button variant="outlined" color="ochre">
                <SearchOutlinedIcon color="ochre" />
              </Button>
              <Button variant="outlined">
                <ArticleOutlinedIcon />
              </Button>
            </CardContent>
          </Card>
          <Card>
            <PaginationTable>
              <TableCell align="left">No</TableCell>
              <TableCell align="center">Jenis Dokumen</TableCell>
              <TableCell align="center">No Dokumen</TableCell>
              <TableCell align="center">Tahun</TableCell>
              <TableCell align="center">Nama Dokumen</TableCell>
              <TableCell align="center">Tanggal Terbit</TableCell>
              <TableCell align="right">Actions</TableCell>
            </PaginationTable>
          </Card>
        </ContentBox>
      </ThemeProvider>
    </>
  );
};

export default DokumenKhusus;
