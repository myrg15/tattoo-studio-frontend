import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { createAppointment, getAllArtist } from "../../services/apiCalls";
import InputController from "../../common/Inputs/InputController";

const HOURS_AVAILABLE = ["09:00", "12:00", "15:00", "18:00"];

export const AppointmentCreate = ({ open, setOpen, idGallery }) => {
  const navigate = useNavigate();

  const [selectDate, setSelectDate] = useState(new Date());
  const [selectHour, setSelectHour] = useState("");
  const [selectArtist, setSelectArtist] = useState("");
  const [artist, setArtist] = useState([]);
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
 // const [modify, setModify] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      const artist = await getAllArtist();
      setArtist(artist);
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    //setModify(false);
    setSelectDate(new Date());
    setSelectHour("");
    setSelectArtist("");
  };

  /*const handleModify = () =>{
    setOpen(true);
    setModify(true);
    setSelectDate(new Date());
    setSelectHour("");
    setSelectArtist("");
  };*/

  const handleDate = (e) => {
    setDate(e.target.value);
    //console.log("fecha");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      employees: selectArtist,
      date: date,
      time: selectHour,
      desingallery: idGallery,
    };

    try {
      console.log(data);
      await createAppointment(data);
      setMessage("Successfully created appointment");
      setTimeout(() => {
        setMessage("");
        setSelectHour("");
        setSelectArtist("");
        setSelectDate(new Date());
        handleClose();
      },8000);
    } catch (error) {
      console.log(error);
    }
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
        borderRadius="5px"
      >
        {message && <Typography color="green">{message}</Typography>}
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap="15px"
          onSubmit={onSubmit}
          padding="5px"
        >
          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Date</InputLabel>
            <input
              type="date"
              value={date}
              onChange={handleDate}
              //disabled={modify}
            />
          </FormControl>

          {/*<FormControl fullWidth>
            <InputController
              value={date}
              type="date"
              label="Date"
              onChange={handleDate}
            >
              Date Available
            </InputController>
          </FormControl>*/}

          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Hours Available</InputLabel>
            <Select
              fullWidth
              value={selectHour}
              onChange={(e) => setSelectHour(e.target.value)}
              //disabled={modify}
            >
              {HOURS_AVAILABLE.map((item) => (
                //return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                //);
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Artists</InputLabel>
            <Select
              fullWidth
              value={selectArtist}
              onChange={(e) => setSelectArtist(e.target.value)}
              //disabled={modify}
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
          {message && (
            <Button type="button" variant="contained" onClick={handleClose}>
            Cerrar
          </Button>
          )}
          {/*<Button type="button" variant="contained" onClick={handleModify}>
            Modificar
              </Button>*/}
          ¨{/*{!modify && (*/}
        </Box>
      </Box>
    </Modal>
  );
};

export default AppointmentCreate;
