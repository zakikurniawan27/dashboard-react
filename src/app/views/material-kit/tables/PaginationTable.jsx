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
  let nomor = 1;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>{children}</TableRow>
        </TableHead>
        <TableBody>
          {data.data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell align="left">{nomor++}</TableCell>
                <TableCell align="center">{item.jenis_dokumen}</TableCell>
                <TableCell align="center">{item.no_dokumen}</TableCell>
                <TableCell align="center">{parseInt(item.tanggal_terbit)}</TableCell>
                <TableCell align="center">{item.nama_dokumen}</TableCell>
                <TableCell align="center">{item.tanggal_terbit}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Icon sx={{ color: "#E3D026" }}>edit</Icon>
                    <Icon color="primary">download</Icon>
                    <Icon color="error">delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data?.data?.length || 0}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}
