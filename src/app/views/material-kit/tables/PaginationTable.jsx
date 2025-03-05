import { useState } from "react";
import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination,
  CircularProgress
} from "@mui/material";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 15, paddingRight: 15 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 15, textTransform: "capitalize" } }
  }
}));

export default function PaginationTable({ children, data, token }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const nomor = (i) => page * rowsPerPage + i + 1;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //function handle download pdf
  const handleOpenPdf = async (filePath, accessToken) => {
    if (!filePath) {
      console.error("File path tidak ditemukan");
      return;
    }

    const baseUrl = "http://192.168.10.167:8089/library/getDownloadDokumenKhusus/";
    const fullUrl = `${baseUrl}${filePath}`;

    try {
      setIsLoading(true);
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer  ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Gagal mengambil file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Buka PDF di tab baru
      window.open(blobUrl, "_blank");

      // Hapus blob URL setelah beberapa saat untuk menghemat memori
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 10000); // 10 detik
      setIsLoading(false);
    } catch (error) {
      console.error("Terjadi kesalahan saat membuka PDF:", error);
    }
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>{children}</TableRow>
        </TableHead>
        <TableBody>
          {data.data?.length > 0 ? (
            data.data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleOpenPdf(item.id, token)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="center">{nomor(index)}</TableCell>
                  <TableCell align="center">{item.jenis_dokumen}</TableCell>
                  <TableCell align="center">{item.no_dokumen}</TableCell>
                  <TableCell align="center">{parseInt(item.tanggal_terbit)}</TableCell>
                  <TableCell align="center">{item.nama_dokumen}</TableCell>
                  <TableCell align="center">{item.tanggal_terbit}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Icon sx={{ color: "#E3D026" }}>edit</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
          ) : data.data?.length === 0 ? (
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Data Kosong</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data?.data?.length || 0}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
      {isLoading === true ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <CircularProgress size={"5rem"} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
