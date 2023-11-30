import React, { useEffect, useState } from "react";
import { Typography, Box, Card, Tooltip } from "@mui/material";
import {
  getAllAppointments,
  getAllAppointmentsByUser,
} from "../../services/apiCalls";
import { Icon } from "@iconify/react";
import AppointmentCreate from "./Appointment";

const ViewAppointments = () => {
  const role = localStorage.getItem("role");
  console.log(role);
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (role == "super_admin") {
        const resp = await getAllAppointments();
        console.log(resp);
        return setAppointments(resp.appointments);
      }

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

  if (appointments?.length === 0) {
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
      <AppointmentCreate open={open} setOpen={setOpen} dataEdit={data} isEdit={true} />
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
              <Typography variant="body1">
                Design : {item.desingallery}
              </Typography>
              <Typography variant="body1">
                Employee : {item.employees}
              </Typography>
              <Typography variant="body1">Time : {item.time}</Typography>
              <Box display="flex" justifyContent="flex-end" gap="5px">
                <Tooltip title="Edit">
                  <Icon
                    icon="basil:edit-outline"
                    fontSize="25px"
                    cursor="pointer"
                    onClick={() => {
                      setData({
                        id: item.id,
                        date : item.date,
                        time : item.time,
                        artist: item.employees
                      })
                      setOpen(true)}}
                  />
                </Tooltip>
                {/*<Tooltip title="Delete">
                  <Icon
                    icon="fluent:delete-12-regular"
                    fontSize="25px"
                    color="red"
                    cursor="pointer"
                  />
                    </Tooltip>*/}
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default ViewAppointments;
