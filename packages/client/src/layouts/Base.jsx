import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

// import NavBar from "@/components/NavBar";

/**
 * @returns {React.JSX.Element}
 */
const BaseLayout = () => (
  <>
    {/* <NavBar /> */}
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: "flex", flexDirection: "column", my: 4, gap: 4 }}
    >
      <Outlet />
    </Container>
  </>
);

export default BaseLayout;
