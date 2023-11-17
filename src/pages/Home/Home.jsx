import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import * as React from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getAllDesing } from "../../services/apiCalls";


//falta LOGICA
export const Home = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await getAllDesing();
      setDesigns(response);
    };

    data();
  }, []);

  return (
    <Box display="flex" gap="10px" padding="20px" sx={{ cursor: "pointer" }}>
      {designs.map((item) => (
        <Box width="200px" height="200px">
          <Box
            component="img"
            src={`${item.imag}?w=180&h=180&fit=crop&auto=format`}
            width="100%"
            height="100%"
          />

          <Button variant="contained">
            Agendar
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
