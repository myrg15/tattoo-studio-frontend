import React, { useState, useEffect } from "react";
import { Modal, Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { updateAppointments, getAllArtist } from "../../services/apiCalls";
import InputController from "../../common/Inputs/InputController";

const HOURS_AVAILABLE = ["09:00", "12:00", "15:00", "18:00"];

const AppointmentUpdate = ({ open, setOpen, idGallery, updAppoint }) => {
  const [selectDate, setSelectDate] = useState(updAppoint.date);
  const [selectHour, setSelectHour] = useState(updAppoint.time);
  const [selectArtist, setSelectArtist] = useState(updAppoint.employees);
  const [artist, setArtist] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const artists = await getAllArtist();
      setArtist(artists);
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectDate("");
    setSelectHour("");
    setSelectArtist("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      date: selectDate,
      time: selectHour,
      employees: selectArtist,
      desingallery: idGallery,
    };

    try {
        await updateAppointments(updAppoint.appointmentId, data);
        setMessage("Successfully updated appointment");
        setTimeout(() => {
          setMessage("");
          setSelectHour("");
          setSelectArtist("");
          setSelectDate("");
          handleClose();
        }, 8000);
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
                  value={selectDate}
                  onChange={(e) => setSelectDate(e.target.value)}
                />
              </FormControl>
    
              <FormControl fullWidth>
                <InputLabel sx={{ bgcolor: "white" }}>Hours Available</InputLabel>
                <Select
                  fullWidth
                  value={selectHour}
                  onChange={(e) => setSelectHour(e.target.value)}
                >
                  {HOURS_AVAILABLE.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
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
                Update
              </Button>
    
              <Button type="button" variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      );
    };

export default AppointmentUpdate;