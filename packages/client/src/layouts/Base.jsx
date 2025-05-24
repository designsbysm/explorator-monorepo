import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

// import NavBar from "@/components/NavBar";

/**
 * @returns {React.JSX.Element}
 */
const BaseLayout = () => (
  <Container maxWidth="lg" component="main" sx={{ py: 3 }}>
    <Outlet />
  </Container>
);

export default BaseLayout;
