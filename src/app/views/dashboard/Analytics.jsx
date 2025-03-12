import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";

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

export default function Analytics() {
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid size={{ md: 12, xs: 12 }}>
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
