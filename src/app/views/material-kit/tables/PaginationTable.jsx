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

export default function PaginationTable({ children, data, token, stateData, handleDelete }) {
  const [statePage, setStatePage] = useState({
    page: 0,
    rowsPerPage: 10,
    isLoading: false
  });
  const nomor = (i) => statePage.page * statePage.rowsPerPage + i + 1;

  const handleChangePage = (_, newPage) => {
    setStatePage({ ...statePage, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setStatePage({ ...statePage, rowsPerPage: +event.target.value });
    setStatePage({ ...statePage, page: 0 });
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
      setStatePage({ ...statePage, isLoading: true });
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

      // open pdf to new tab
      window.open(blobUrl, "_blank");

      // delete blob URL after 10 second to save memory
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 10000);
      setStatePage({ ...statePage, isLoading: false });
    } catch (error) {
      console.error("Terjadi kesalahan saat membuka PDF:", error);
    }
  };

  return (
    <Box width="100%" overflow="auto">
      {stateData.isLoading === true && (
        <CircularProgress
          size={70}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      )}
      <StyledTable>
        <TableHead>
          <TableRow>{children}</TableRow>
        </TableHead>
        <TableBody>
          {data.data?.length > 0 ? (
            data.data
              ?.slice(
                statePage.page * statePage.rowsPerPage,
                statePage.page * statePage.rowsPerPage + statePage.rowsPerPage
              )
              .map((item, index) => (
                <TableRow key={index} sx={{ cursor: "pointer" }}>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {nomor(index)}
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {item.jenis_dokumen}
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {item.no_dokumen}
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {parseInt(item.tanggal_terbit)}
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {item.nama_dokumen}
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {item.Pokja}
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOpenPdf(item.id, token)}>
                    {item.tanggal_terbit}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(item.id)}>
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
        page={statePage.page}
        component="div"
        rowsPerPage={statePage.rowsPerPage}
        count={data?.data?.length || 0}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
      {statePage.isLoading === true ? (
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
