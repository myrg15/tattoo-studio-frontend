import { Box, Button, Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment, getAllDesing } from "../../services/apiCalls";
import AppointmentCreate from "../Appointment/Appointment";

export const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [designs, setDesigns] = useState([]);
  const [open, setOpen] = useState(false);
  const [idGallery, setIdGallery] = useState("");

  useEffect(() => {
    const data = async () => {
      const response = await getAllDesing();
      setDesigns(response);
    };

    data();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      imag: setDesigns,
      //tattooartist_id : selectArtist,
      //service : 'tattoo'
    };

    await getAllDesing(data);
  };
  const openModal = (id) => {
    if (!token) {
      return navigate("/login");
    }
    setIdGallery(id);
    setOpen(true);
  };
  return (
    <Box display="flex" gap="10px" padding="20px" sx={{ cursor: "pointer" }}>
      <AppointmentCreate open={open} setOpen={setOpen} idGallery={idGallery} />
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
                onClick={() => openModal(item.id)}
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
    </Box>
  );
};
export default Home;
