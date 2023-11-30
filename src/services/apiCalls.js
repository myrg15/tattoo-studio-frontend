import axiosInstance from "../utils/axios";

export const login = async (data) => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    localStorage.setItem("token", res.data.token); //por medio de setItem guardamos el valor de token en el localStorage
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("role", res.data.role);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axiosInstance.post("/users/register", data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllDesing = async () => {
  try {
    const res = await axiosInstance.get("/desingallery/all");
    return res.data.desings;
  } catch (error) {
    console.log(error);
  }
};

export const getAllArtist = async () => {
  try {
    const response = await axiosInstance.get("/artist/all");
    return response.data.artist;
  } catch (error) {
    console.log(error);
  }
};

export const createAppointment = async (data) => {
  const token = localStorage.getItem('token'); //getItem para recuperar el token de autenticación almacenado en el local storage
   console.log(token)

  try {
    const response = await axiosInstance.post( //usamos una solitud POST para enviar los datos proporcionados en el objeto data(user_id, date, time), incluimos en token recuperado del localStore
      "/appointment/appointment_create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const appointmentUpdate = async (data) => {
  const token = localStorage.getItem('token'); //getItem para recuperar el token de autenticación almacenado en el local storage
   console.log(token)

  try {
    const response = await axiosInstance.put( 
     `/appointment/appointment_update/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllAppointmentsByUser = async () => {
  const token = localStorage.getItem('token'); //getItem para recuperar el token de autenticación almacenado en el local storage

 try {
   const response = await axiosInstance.get( 
     "/appointment/appointments_get_by_id",
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
   );
   return response.data
 } catch (error) {
   console.log(error);
 }
}


export const getProfile = async() => {
  const token = localStorage.getItem('token');
  try{
    const response = await   axiosInstance.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data.date
  }catch(error){
    console.log(error)
  }
}

export const getAllUsers = async () => {
  try{
    const response = await axiosInstance.get('/users/allusers')
    return response.data
   
  }catch(error){
    console.log(error)
  }
}

export const getAllAppointments = async () => {
  const token = localStorage.getItem('token');
  try {
      const response = await axiosInstance('/appointment/appointments_get_all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
  } catch (error) {
    console.log(error)
  }
}