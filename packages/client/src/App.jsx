import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter } from "react-router";

// import { DarkTheme, LightTheme } from "@/theme/~~index";
import { theme } from "@/theme";
import AppRoutes from "@/components/AppRoutes";

/**
 * @returns {React.JSX.Element}
 */
const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
