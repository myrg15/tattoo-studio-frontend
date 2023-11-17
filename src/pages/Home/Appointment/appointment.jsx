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
import { Message } from "@mui/icons-material";
  
  const CreateAppointment = () => {
    const navigate = useNavigate();
  
    const [seleccion, setSeleccion] = useState("user");
    const [employees, setEmployees] = useNavigate ("employees");
    
    const [userError, setUserError] = useState({
      id: "",
      users: "",
      employees: "",
      portfolio_id: "",
      imag:"",
      date: "",
      time:"",
      service:"",
      status:"",
      is_active:"",
      created_at:"",

    });
  
    const handleSeleccion = (e) => {
      setSeleccion(e.target.value);
    };
    
    const handleEmployees = (e) => {
        setEmployees(e.target.value);
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
  
      if (users) { //el user crea una cita
        data = {
          id: e.target.userName.value,
          users: e.target.email.value,
          employees: e.target.password.value,
          portfolio_id: e.target.phone.value,
          imag: e.target.imag.value,
          date: e.target.date.value,
          time: e.target.time.value,
          service: e.target.service.value,
          status: e.target.status.value,
          is_active: e.target.is_active.value,
          created_at: e.target.created_at.value,
        };
      } else { //si no se estaria registrando un usuario
        (employees)
        data = {
            id: e.target.userName.value,
            users: e.target.email.value,
            employees: e.target.password.value,
            portfolio_id: e.target.phone.value,
            imag: e.target.imag.value,
            date: e.target.date.value,
            time: e.target.time.value,
            service: e.target.service.value,
            status: e.target.status.value,
            is_active: e.target.is_active.value,
            created_at: e.target.created_at.value,
        };
      }
  
      try {
        const res = await axiosInstance.post("/users/CreateAppointment", data);
        const resul= await axiosInstance.post("/employess/CreateAppointment", data);
        if(users){
          message: ('puede crear su cita'),
        }else{
            if (employees){
            message: ('cree nueva cita'),
            navigate("/login");
         }
        };
      } catch (error) {
        console.log(error);
      }  
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
           {users ? "Create appointment" : "CreateAppointment"}
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
  
  export default CreateAppointment;
  