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
    isViewToken: false,
  },
  {
    label: "Register",
    path: "/register",
    isViewToken: false,
  
  },
  {
    label: "Create Employee",
    path: "/create-employee",
    isViewToken: true,
    role: "super_admin",
  },
];

const Header = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")
  const username = localStorage.getItem("username");

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
        
        if ((item.label === "Login" || item.label === "Register") && token) return null;

        
        if (item.isViewToken && !token) return null;

        
        if (item.role && item.role !== role) return null;

        
        return (
          <NavLinkCustom key={item.path} to={item.path}>
            <Typography>{item.label}</Typography>
          </NavLinkCustom>
        );
      })}
      {token && <Typography color="white">{username}</Typography>}
    </Box>
  );
};

const NavLinkCustom = styled(NavLink)`
  color: white;
  text-decoration: none;
`;

export default Header;
