import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate, useLocation, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";
import { IF } from "../IF/IF";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  const token = JSON.parse(localStorage.getItem("user"));

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { palette } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Career Search Platform
          </Typography>
          <IF condition={!token}>
            <Button color="inherit">
              <Link
                to="/signup"
                style={{ color: "white", textDecoration: "none" }}
              >
                Signup
              </Link>
            </Button>
            <Button>
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </Button>
          </IF>
          <IF condition={isAuth}>
            <Logout />
          </IF>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
