import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
//import InputController from "../../common/Inputs/InputController";
//import { validator } from "../../services/userful";
//import axiosInstance from "../../utils/axios";
//import { useNavigate } from "react-router-dom";
//import { Message } from "@mui/icons-material";

//declaro la constante HOURS_AVAILABLE al inicio para acceder a ella desde cualquier lugar del componente.
const HOURS_AVAILABLE = ["09:00", "12:00", "15:00", "18:00"];

const [artist, setArtist] = useState([]); //useState permite al componente artist tener estado local, devuelve un array con dos elementos
const [open, setOpen] = React.useState(false); //predetermino el estado actual del componente open en false
const [selectHour, setSelectHour] = useState(""); //predetermino el estado del componente selectHour vacio para que luego se pueda seleccionar las horas disponibles
const [selectDate, setSelectDate] = useState("");
const [selectArtist, setSelectArtist] = useState("");

//dos funciones que me indica la libreia de mui para poder tener el diseño
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

//useEffect solicita al servidor los datos de todos los diseños y todos los artistas
useEffect(() => {
  const data = async () => { //esta funcion data asinccrona realiza dos solicitudes HTTP usando las funciones getALLDesin y getAllArtist
    const response = await getAllDesing();
    const artist = await getAllArtist();
    setArtist(artist); //se actualiza el estado del componente artist una vez resuelta la solicitud 
    setDesigns(response);
  };

  data();
}, []);

const seleccionHour = (e) => {
  setSelectHour(e.target.value); //se actualiza el estado del componente selectHour
};
const seleccionArtist = (e) => { //se llama cuando estamos seleccionando un artista (e) representa el evento que se ha producido
  setSelectArtist(e.target.value); //e.target se utiliza para obtener el elemento que ha desencadenado el evento
};
const selectionDate = (e) => { 
    setSelectDate(e.target.value);
  };
//onSubmit maneja la presentacion del formulario
const onSubmit = async (e) => {
  e.preventDefault(); //evita que el formulario se envie de forma predeterminada
//cuando se envía el formulario, se crea un objeto data que contiene los valores de selectHour, selectArtist y tattoo para el servicio
  const data = {
    user_id: selectArtist,
    date: selectDate,
    time: selectHour
  };
//luego se llama a la uncion createAppointment con el objeto data commo argumento
  await createAppointment(data);
};
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
        <InputLabel sx={{ bgcolor: "white" }}>Hours Available</InputLabel>
        <Select fullWidth value={selectHour} onChange={seleccionHour}>
          {HOURS_AVAILABLE.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel sx={{ bgcolor: "white" }}>Artists</InputLabel>
        <Select fullWidth value={selectArtist} onChange={seleccionArtist}>
          {artist.map((item) => {
            return (
              <MenuItem value={item.user_id}>{item.user.username}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  </Box>
</Modal>;

/*const CreateAppointment = () => {
    const navigate = useNavigate();
  
    const [seleccion, setSeleccion] = useState("user");
    const [employees, setEmployees] = useNavigate ("employees");
    
    const [userError, setUserError] = useState({
      id: "",
      users: "",
      employees: "",
      portfolio_id: "",
      imag:"",
      date: "",
      time:"",
      service:"",
      status:"",
      is_active:"",
      created_at:"",

    });
  
    const handleSeleccion = (e) => {
      setSeleccion(e.target.value);
    };
    
    const handleEmployees = (e) => {
        setEmployees(e.target.value);
      };

    const errorCheck = (e) => {
      const error = validator(e.target.name, e.target.value);
  
      setUserError((prevState) => {
        const newState = {
          ...prevState,
          [e.target.name]: error,
        };
  
        return newState;
      });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      for (let test in userError) {
        if (userError[test] !== "") {
          return;
        }
      }
  
      let data;
  
      if (users) { //el user crea una cita
        data = {
          id: e.target.userName.value,
          users: e.target.email.value,
          employees: e.target.password.value,
          portfolio_id: e.target.phone.value,
          imag: e.target.imag.value,
          date: e.target.date.value,
          time: e.target.time.value,
          service: e.target.service.value,
          status: e.target.status.value,
          is_active: e.target.is_active.value,
          created_at: e.target.created_at.value,
        };
      } else { //si no se estaria registrando un usuario
        (employees)
        data = {
            id: e.target.userName.value,
            users: e.target.email.value,
            employees: e.target.password.value,
            portfolio_id: e.target.phone.value,
            imag: e.target.imag.value,
            date: e.target.date.value,
            time: e.target.time.value,
            service: e.target.service.value,
            status: e.target.status.value,
            is_active: e.target.is_active.value,
            created_at: e.target.created_at.value,
        };
      }
  
      try {
        const res = await axiosInstance.post("/users/CreateAppointment", data);
        const resul= await axiosInstance.post("/employess/CreateAppointment", data);
        if(users){
          message: ('puede crear su cita'),
        }else{
            if (employees){
            message: ('cree nueva cita'),
            navigate("/login");
         }
        };
      } catch (error) {
        console.log(error);
      }  
    }
    };
  
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box component="form" onSubmit={onSubmit} width="200px">
          <Typography variant="h5" textAlign="center" marginBottom="20px">
           {users ? "Create appointment" : "CreateAppointment"}
          </Typography>
          <InputController
            label="User"
            name="userName"
            error={userError.userName ? userError.Name : ""}
            functionBlur={errorCheck}
          />
          <InputController
            label="Email"
            name="email"
            error={userError.email ? userError.email : ""}
            functionBlur={errorCheck}
          />
          <InputController
            label="Password"
            name="password"
            type="password"
            error={userError.password ? userError.password : ""}
            functionBlur={errorCheck}
          />
          <InputController
            label="Phone"
            name="phone"
            error={userError.phone ? userError.phone : ""}
            functionBlur={errorCheck}
          />
          {isCreateEmployee && (
            <>
              <FormControl fullWidth>
                <InputLabel sx={{ bgcolor: "white" }}>
                  Specialty Services
                </InputLabel>
                <Select fullWidth value={seleccion} onChange={handleSeleccion}>
                  <MenuItem value="Tatto">Tatto</MenuItem>
                  <MenuItem value="Piercing">Piercing</MenuItem>
                </Select>
              </FormControl>
  
              <FormControl fullWidth>
                <InputLabel sx={{ bgcolor: "white" }}>Rol</InputLabel>
                <Select fullWidth value={rol} onChange={handleRol}>
                  <MenuItem value="super_admin">Super Admin</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
  
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      </Box>
    );
  };*/

export default CreateAppointment;
