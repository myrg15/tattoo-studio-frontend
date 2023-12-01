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
import {
  appointmentUpdate,
  createAppointment,
  getAllArtist,
} from "../../services/apiCalls";

const HOURS_AVAILABLE = ["09:00", "12:00", "15:00", "18:00"];

export const AppointmentCreate = ({
  open,
  setOpen,
  idGallery,
  dataEdit,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectHour, setSelectHour] = useState(dataEdit?.time); //si dataEdit es nulo o indefinido, la variable selectHour se establecerá en nulo. De lo contrario, se establecerá en el valor de dataEdit.time
  const [selectArtist, setSelectArtist] = useState(dataEdit?.artist);
  const [artist, setArtist] = useState([]);
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [isCreateAppointment, setIsCreateAppointment] = useState(true)

  useEffect(() => {
    if (isEdit && dataEdit?.date) {
      setSelectDate(new Date(dataEdit?.date)?.toISOString()?.split("T")?.[0]);
      setSelectHour(dataEdit?.time);
      setSelectArtist(dataEdit?.artist);
    }
  }, [dataEdit]);

  useEffect(() => {
    const fetchData = async () => {
      const artist = await getAllArtist();
      setArtist(artist);
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectDate(new Date());
    setSelectHour("");
    setSelectArtist("");
  };

  const handleDate = (e) => {
    setSelectDate(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: dataEdit?.id,
      employees: selectArtist,
      date: date,
      time: selectHour,
      desingallery: idGallery,
    };

    try {
      console.log(data);

      if (isEdit) {
        try {
          await appointmentUpdate(data);
          setTimeout(() => {
            handleClose();
          }, 4000);
          return setMessage("Successfully updated appointment");
        } catch (error) {
          return console.log(error);
        }
      }

      setIsCreateAppointment(false)
      await createAppointment(data);
      setMessage("Successfully created appointment");
      setTimeout(() => {
        setMessage("");
        setSelectHour("");
        setSelectArtist("");
        setSelectDate(new Date());
        handleClose();
        setIsCreateAppointment(true)
      }, 3000);
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
        padding="20px"
        borderRadius="5px"
      >
        {message && <Typography color="green">{message}</Typography>}
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap="40px"
          onSubmit={onSubmit}
          padding="5px"
        >
          <FormControl fullWidth>
            <InputLabel sx={{ bgcolor: "white" }}>Date</InputLabel>
            <input
              type="date"
              value={selectDate}
              onChange={handleDate}
             
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

          {isCreateAppointment && <Button type="submit" variant="contained">
            Submit
          </Button>}
        </Box>
      </Box>
    </Modal>
  );
};

export default AppointmentCreate;
