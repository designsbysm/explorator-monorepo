import { CircularProgress, Stack, Typography } from "@mui/material";

/**
 * @returns {React.JSX.Element}
 */
const LoadingSpinner = () => (
  <Stack
    sx={{
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <Stack
      spacing={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h6">Loading...</Typography>
    </Stack>
  </Stack>
);

export default LoadingSpinner;
