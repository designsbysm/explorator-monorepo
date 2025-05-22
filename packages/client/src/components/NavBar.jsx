import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  MenuItem,
  styled,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { useNavigate } from "react-router";

import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  borderBottom: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 14px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Button
                onClick={() => navigate("ship-components")}
                variant="text"
                color="info"
                size="small"
              >
                Ship Components
              </Button>
              {/* <Button variant="text" color="info" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small">
                Highlights
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button> */}
              {/* <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Blog
              </Button> */}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            <Button color="primary" variant="contained" size="small">
              Sign up
            </Button> */}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem onClick={() => navigate("ship-components")}>
                  Ship Components
                </MenuItem>
                {/* <MenuItem>Testimonials</MenuItem> */}
                {/* <MenuItem>Highlights</MenuItem> */}
                {/* <MenuItem>Pricing</MenuItem> */}
                {/* <MenuItem>FAQ</MenuItem> */}
                {/* <MenuItem>Blog</MenuItem> */}
                {/* <Divider sx={{ my: 3 }} /> */}
                {/* <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem> */}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
