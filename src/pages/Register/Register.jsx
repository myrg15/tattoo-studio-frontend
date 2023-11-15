import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputController from "../../common/Inputs/InputController";
import { validator } from "../../services/userful";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate()

  const [userError, setUserError] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });

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
  
    const data = {
      username : e.target.userName.value,
      email : e.target.email.value,
      password : e.target.password.value,
      phone: e.target.phone.value
    }

    try{
      const res = await axiosInstance.post('/users/register', data)
      navigate('/login')
    }catch(error){
      console.log(error)
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
          Register
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
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
