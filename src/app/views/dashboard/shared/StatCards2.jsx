import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center"
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important"
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px"
}));

const H2 = styled("h2")(() => ({
  marginLeft: 12,
  flexGrow: 1
}));

export default function StatCards2({ dokumen }) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/** mapping data dokumen with card */}
      {dokumen.data?.map((item, index) => (
        <Grid size={{ md: 6, xs: 12 }} key={index}>
          <Card elevation={3} sx={{ p: 2 }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: "rgba(9, 116, 182, 0.15)" }}>
                <ArticleIcon color="primary" />
              </FabIcon>

              <H2 color="#08ad6c">{item.jenis_dokumen}</H2>
            </ContentBox>

            <ContentBox sx={{ pt: 2 }}>
              <H3>Jumlah Dokumen = {item.total}</H3>
            </ContentBox>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
