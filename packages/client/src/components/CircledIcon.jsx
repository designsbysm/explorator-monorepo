import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";

const CircledIcon = ({ OverlayIcon }) => (
  <Box sx={{ display: "inline-flex", position: "relative" }}>
    <CircleIcon fontSize="large" />
    <OverlayIcon
      color="action"
      fontSize="large"
      sx={(theme) => ({
        color: theme.palette.background.paper,
        position: "absolute",
        right: 0,
        top: 0,
      })}
    />
  </Box>
);

export default CircledIcon;
