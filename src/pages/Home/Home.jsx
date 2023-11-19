import {
  Box,
  Button,
  Grid,
  Modal
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import * as React from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getAllDesing } from "../../services/apiCalls";
import InputController from "../../common/Inputs/InputController";
//import {Home} from "../Home/../Home";

//const HORAS_DISPONIBLES = ["09:00", "12:00", "15:00", "18:00"];

export const Home = () => {
  const [designs, setDesigns] = useState([]);
  //const [artist, setArtist] = useState([]);
  const [open, setOpen] = useState(false);
  //const [selectHour, setSelectHour] = useState("")
  //const [selectArtist, setSelectArtist] = useState("")*/

  useEffect(() => {
    const data = async () => {
      const response = await getAllDesing();
      //const artist = await getAllArtist();
      //setArtist(artist);
      setDesigns(response);
    };

    data();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /*const seleccionHour = (e) => {
    setSelectHour(e.target.value)
  };
  const seleccionArtist = (e) => {
    setSelectArtist(e.target.value)
  };*/

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      imag : setDesigns,
      //tattooartist_id : selectArtist,
      //service : 'tattoo'
    }

    await getAllDesing(data);
  };
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
                onClick={handleOpen}
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Schedule
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar aquí */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          {/* Contenido del modal aquí */}
          <h2 id="modal-modal-title">Modal Title</h2>
          <p id="modal-modal-description">Modal Content</p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

  
export default Home;
