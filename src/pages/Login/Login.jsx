import { Box, Button, Typography } from "@mui/material"
import InputController from "../../common/Inputs/InputController"
import axiosInstance from "../../utils/axios"
import { useNavigate } from "react-router-dom"
import { Body } from "../Body/Body";
import { login } from "../../services/apiCalls";


export const Login = () => {

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email : e.target.email.value,
      password : e.target.password.value
    }

    try {
      await login(data)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Box
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Box component="form" onSubmit={onSubmit} width="200px">
      <Typography variant="h5" textAlign="center" marginBottom="20px">
        Login
      </Typography>
      <InputController
        label="Email"
        name="email"
      />
      <InputController
        label="Password"
        name="password"
        type="password"
      />
      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  </Box>
  )
}

export default Login
