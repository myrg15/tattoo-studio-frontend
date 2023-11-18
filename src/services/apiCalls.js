//aqui debo poner todas mis rutas
//export const register

import axiosInstance from "../utils/axios";

//export const logUser = asyn (boby)

export const login = async (data) => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    localStorage.setItem("token", res.data.token);
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
  const token = localStorage.getItem('token');
  console.log(token)

  try {
    const response = await axiosInstance.post(
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
