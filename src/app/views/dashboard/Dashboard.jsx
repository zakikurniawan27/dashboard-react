import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import StatCards2 from "./shared/StatCards2";
import { getJumlahDokumenKhususService } from "app/service/dokumenKhusus/dokumenKhusus.service";
import { getJumlahDokumenUmumService } from "app/service/dokumenUmum/dokumenUmum.service";
import { Link } from "react-router-dom";
import Loading from "app/components/MatxLoading";

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
  // get token from local storage
  const token = localStorage.getItem("accessToken");

  // state jumlah dokumen
  const [jumlahDokumen, setJumlahDokumen] = useState({
    isLoading: [],
    khusus: [],
    umum: []
  });

  // function to get jumlah dokumen
  const getJumlahDokumen = async () => {
    try {
      setJumlahDokumen((prev) => ({ ...prev, isLoading: true }));
      const { data } = await getJumlahDokumenKhususService(token);
      const response = await getJumlahDokumenUmumService(token);
      setJumlahDokumen((prev) => ({
        ...prev,
        khusus: data,
        umum: response.data,
        isLoading: false
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // to run the function after render the component
  useEffect(() => {
    getJumlahDokumen();
  }, []);
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid size={{ md: 12, xs: 12 }}>
            <H4>Dokumen Khusus</H4>
            {/**Begin the Card Jumlah Dokumen Khusus */}
            {jumlahDokumen.khusus && (
              <Link to={"/dokumen-khusus"}>
                <StatCards2 dokumen={jumlahDokumen.khusus} />
              </Link>
            )}
            {/**End the Card Jumlah Dokumen Khusus */}
            <H4>Dokumen Umum</H4>
            {/**Begin the Card Jumlah Dokumen Umum */}
            {jumlahDokumen.umum && (
              <Link to={"/dokumen-umum"}>
                <StatCards2 dokumen={jumlahDokumen.umum} />
              </Link>
            )}
            {/**End the Card Jumlah Dokumen Umum */}
          </Grid>
        </Grid>
        {/** Begin Loading */}
        {jumlahDokumen.isLoading === true && <Loading />}
        {/** End Loading */}
      </ContentBox>
    </Fragment>
  );
}
