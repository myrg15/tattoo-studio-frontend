import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
} from "@mui/material";
import { getAllAppointmentsByUser } from "../../services/apiCalls";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllAppointmentsByUser();
      console.log(resp);
      setAppointments(resp.appointments);
    };

    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (appointments.length === 0) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">Has no appointment pending</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" padding="10px">
        Appointments
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap="15px"
        padding="20px"
        justifyContent="center"
      >
        {appointments.map((item) => {
          return (
            <Card sx={{ padding: "10px" }}>
              <Typography variant="body1">Date : {item.date}</Typography>
              <Typography variant="body1">Design : {item.desingallery}</Typography>
              <Typography variant="body1">Employee : {item.employees}</Typography>
              <Typography variant="body1">Time : {item.time}</Typography>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default ViewAppointments;
