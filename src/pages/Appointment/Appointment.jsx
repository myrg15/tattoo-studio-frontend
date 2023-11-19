import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createAppointment, getAllArtist } from "../../../services/apiCalls";
import { Home } from "../Home";
import { useNavigate } from "react-router-dom";

const HOURS_AVAILABLE = ["09:00", "12:00", "15:00", "18:00"];

export const appointmentCreate = () => {
  const navigate = useNavigate();
 
  const [open, setOpen] = useState(true);
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectHour, setSelectHour] = useState("");
  const [selectArtist, setSelectArtist] = useState("");

  useEffect(() => {
    // const data = async () => {
    const fetchData = async () => {
      const artist = await getAllArtist();
      setSelectArtist(artist[0]?.user_id || ""); //establezco el primer artista como predeterminado
      //const dateApoint= await createAppointment();
      //const hourApoint = await createAppointment();
      fetchData();
      //setSelectDate(dateApoint);
      //setSelectHour(hourApoint);
      //setSelectArtist(artist);
    };
    //data();
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate("/Home");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: selectArtist,
      date: selectDate,
      time: selectHour,
    };
    await createAppointment(data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        width="300px"
        bgcolor="white"
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)" }}
        padding="15px"
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap="10px"
          onSubmit={onSubmit}
        >
          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Date Available</InputLabel>
            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Hours Available</InputLabel>
            <Select
              fullWidth
              value={selectHour}
              onChange={(e) => setSelectHour(e.target.value)}
            >
              {HOURS_AVAILABLE.map((item) => {
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Artists</InputLabel>
            <Select
              fullWidth
              value={selectArtist}
              onChange={(e) => setSelectArtist(e.target.value)}
            >
              {artist.map((item) => (
                <MenuItem key={item.user_id} value={item.user_id}>
                  {item.user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default appointmentCreate;
