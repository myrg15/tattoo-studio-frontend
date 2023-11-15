import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Register",
    path: "/register",
  },
];

const Header = () => {
 
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      gap="15px"
      p="10px"
      sx={{ height: "60px", bgcolor: "blue" }}
    >
      {navItems.map((item) => {
        return (
          <NavLinkCustom key={item.path} to={item.path}>
            <Typography>{item.label}</Typography>
          </NavLinkCustom>
        );
      })}
    </Box>
  );
};

const NavLinkCustom = styled(NavLink)`
  color: white;
  text-decoration: none;
`

export default Header;
