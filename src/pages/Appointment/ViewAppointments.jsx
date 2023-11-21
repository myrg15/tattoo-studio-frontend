import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { getAllAppointmentsByUser } from '../../services/apiCalls';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState (false);
    
    useEffect(() => {
      const fetchData = async () => {
        const resp = await getAllAppointmentsByUser();
        setAppointments(resp);
    }; 

    fetchData();
    
}, []);

const handleOpen = () => {
    setOpen(true);
};
    
const handleClose = () =>{
    setOpen(false);
}
  
return (
    <div>
    <Button variant="conatined" onClick={handleOpen}>
        View Appointments
    </Button>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>My Appointments</DialogTitle>
        <DialogContent>
            {appointments.map((appointment) => (
        <div key={appointment.id}>
            <Typography variant="subtitle1">
                Date: {new Date(appointment.date).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle2">
                Hour:{appointment.time}
            </Typography>
            <Typography variant="subtitle3">
                Gallery:{appointment.desingallery}
            </Typography>
            <Typography variant="subtitle4">
                Employees:{appointment.employees}
            </Typography>
            <Typography variant="subtitle5">
                Users:{appointment.users}
            </Typography>
            <Typography variant="subtitle6">
                Id:{appointment.id}
            </Typography>
        </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
    </Dialog>
    </div>
  )
 }

export default ViewAppointments;
