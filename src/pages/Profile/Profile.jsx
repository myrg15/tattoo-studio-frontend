import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, TextField } from "@mui/material"
import { CustomInput} from "../../common/CustomInput";
import { validator } from "../../services/userful";

//elemntos para conexión a RDX en modo lectura 
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import InputController from "../../common/Inputs/InputController";
import { userData } from "../userSlice";
import axiosInstance from "../../utils/axios";
import { validator } from "../../services/userful";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  //instancia de RDX en modo lectura
  const datosRdxUser = useSelector(userData);
  //variables de estado con hook useData
  //definicion del componente funcional profile
  //valores iniciales de profile se establecen utilizando los datos obtenidos 
  //del estado global a través del selector userData.
  const [profile, setProfile] = useState({
    userName: datosRdxUser.credentials.userName,
    email: datosRdxUser.credentials.email,
    password: datosRdxUser.credentials.password,
    phone: datosRdxUser.credentials.phone,
  });

  const [profileError, setProfileError] = useState({
    userNameError: '',
    emailError: '',
    passwordError: '',
    phoneError: '',
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
      const res = await axiosInstance.get('/profile, auth profile', data)
      navigate('/profile')
    }catch(error){
      console.log(error)
    }

  };

  //aqui debo return diseño con BOX de mui


  
  
  

  /*return (
    <div>
      Profile
    </div>
  )*/
}

export default Profile;
