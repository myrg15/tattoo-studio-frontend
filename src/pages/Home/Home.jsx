import { Box, Button, InputLabel, MenuItem, Select, Typography, Grid} from "@mui/material";
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
      <Grid container spacing={3}>
      {designs.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
         <Box
              sx={{
                width: "100%",
                height: "200px",
                position: "relative",
                overflow: "hidden",
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img
                src={`${item.imag}?w=180&h=180&fit=crop&auto=format`}
                alt={item.description}
              />
              <Button
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Agendar
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
       
export default Home;
