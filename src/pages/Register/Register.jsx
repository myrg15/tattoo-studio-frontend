import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputController from "../../common/Inputs/InputController";
import { validator } from "../../services/userful";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export const Register = ({ isCreateEmployee }) => {
  const navigate = useNavigate();

  const [seleccion, setSeleccion] = useState("Tatto");
  const [rol, setRol] = useState("admin");

  const [userError, setUserError] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSeleccion = (e) => {
    setSeleccion(e.target.value);
  };

  const handleRol = (e) => {
    setRol(e.target.value);
  };

  const errorCheck = (e) => {
    const error = validator(e.target.name, e.target.value);

    setUserError((prevState) => {
      const newState = {
        ...prevState,
        [e.target.name]: error,
      };

      return newState;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    for (let test in userError) {
      if (userError[test] !== "") {
        return;
      }
    }

    let data;

    if (isCreateEmployee) { //el super admin registra un empleado
      data = {
        username: e.target.userName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone: e.target.phone.value,
        specialtyServices: seleccion,
        role: rol,
      };
    } else { //si no se estaria registrando un usuario
      data = {
        username: e.target.userName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone: e.target.phone.value,
      };
    }

    try {
      const res = await axiosInstance.post("/users/register", data);
      if(!isCreateEmployee){
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box component="form" onSubmit={onSubmit} width="200px">
        <Typography variant="h5" textAlign="center" marginBottom="20px">
          {isCreateEmployee ? "Create Employee" : "Register"}
        </Typography>
        <InputController
          label="User"
          name="userName"
          error={userError.userName ? userError.Name : ""}
          functionBlur={errorCheck}
        />
        <InputController
          label="Email"
          name="email"
          error={userError.email ? userError.email : ""}
          functionBlur={errorCheck}
        />
        <InputController
          label="Password"
          name="password"
          type="password"
          error={userError.password ? userError.password : ""}
          functionBlur={errorCheck}
        />
        <InputController
          label="Phone"
          name="phone"
          error={userError.phone ? userError.phone : ""}
          functionBlur={errorCheck}
        />
        {isCreateEmployee && (
          <>
            <FormControl fullWidth>
              <InputLabel sx={{ bgcolor: "white" }}>
                Specialty Services
              </InputLabel>
              <Select fullWidth value={seleccion} onChange={handleSeleccion}>
                <MenuItem value="Tatto">Tatto</MenuItem>
                <MenuItem value="Piercing">Piercing</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ bgcolor: "white" }}>Rol</InputLabel>
              <Select fullWidth value={rol} onChange={handleRol}>
                <MenuItem value="super_admin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
