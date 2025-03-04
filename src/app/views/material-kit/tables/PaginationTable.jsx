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
  TablePagination
} from "@mui/material";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 15, paddingRight: 15 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 15, paddingRight: 15, textTransform: "capitalize" } }
  }
}));

export default function PaginationTable({ children, data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const nomor = (i) => page * rowsPerPage + i + 1;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //function handle download pdf
  const handleDownloadPdf = async (filePath, fileName) => {
    if (!filePath) {
      console.error("File path tidak ditemukan");
      return;
    }

    const baseUrl = "http://192.168.10.167:8089/library/getDownloadDokumenKhusus/";
    const fullUrl = `${baseUrl}${filePath}`;

    try {
      const response = await fetch(fullUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error(`Gagal mengunduh file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "dokumen.pdf"; // File Name Document
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Delete URL blob after finish
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunduh:", error);
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
                <TableRow key={index}>
                  <TableCell
                    align="left"
                    onClick={() => handleDownloadPdf(item.id, item.nama_dokumen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {nomor(index)}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDownloadPdf(item.id, item.nama_dokumen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {item.jenis_dokumen}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDownloadPdf(item.id, item.nama_dokumen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {item.no_dokumen}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDownloadPdf(item.id, item.nama_dokumen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {parseInt(item.tanggal_terbit)}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDownloadPdf(item.id, item.nama_dokumen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {item.nama_dokumen}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDownloadPdf(item.id, item.nama_dokumen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {item.tanggal_terbit}
                  </TableCell>
                  <TableCell align="right">
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
    </Box>
  );
}
