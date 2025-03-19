import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import StatCards2 from "./shared/StatCards2";
import { getJumlahDokumenKhususService } from "app/service/dokumenKhusus/dokumenKhusus.service";
import { getJumlahDokumenUmumService } from "app/service/dokumenUmum/dokumenUmum.service";
import { Link } from "react-router-dom";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

export default function Dashboard() {
  const token = localStorage.getItem("accessToken");

  const [jumlahDokumen, setJumlahDokumen] = useState({
    khusus: "",
    umum: ""
  });
  const getJumlahDokumen = async () => {
    try {
      const { data } = await getJumlahDokumenKhususService(token);
      const response = await getJumlahDokumenUmumService(token);
      setJumlahDokumen({ ...jumlahDokumen, khusus: data, umum: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJumlahDokumen();
  }, []);
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid size={{ md: 12, xs: 12 }}>
            <H4>Dokumen Khusus</H4>
            {jumlahDokumen.khusus && (
              <Link to={"/dokumen-khusus"}>
                <StatCards2 dokumen={jumlahDokumen.khusus} />
              </Link>
            )}
            <H4>Dokumen Umum</H4>
            {jumlahDokumen.umum && (
              <Link to={"/dokumen-umum"}>
                <StatCards2 dokumen={jumlahDokumen.umum} />
              </Link>
            )}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
