import { Alert, AlertTitle } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

// ContentBox Component
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

// theme
const theme = createTheme({
  palette: {
    ochre: {
      main: "#E3D026",
      light: "#E9DB5D",
      dark: "#A29415"
    }
  }
});

const LayoutDokumen = ({ children, token }) => {
  return (
    <ThemeProvider theme={theme}>
      {/** if token not found in local storage will bring up alert */}
      {!token && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            position: "absolute",
            top: "3%",
            left: "37%"
          }}
        >
          <AlertTitle>Error</AlertTitle>
          You do not have access, please log in again !
        </Alert>
      )}
      {/** Content of ContentBox from props children */}
      <ContentBox>{children}</ContentBox>
    </ThemeProvider>
  );
};

export default LayoutDokumen;
