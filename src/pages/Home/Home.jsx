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
//import * as React from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import ImageList  from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

//const Home = () => {
 // return (
    
 
 //falta poner la logica para regresar a login o register
export const Home = () => {
  return (
    <Box>
    <ImageList sx={{width: 1350, height: 750}} cols={3} rowHeight={180}>
      {itemData.map((item) => (
        <ImageListItem key={item.imag}>
          <img
            srcSet={`${item.imag}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.imag}?w=180&h=180&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Box>
  );
 };

const itemData =  [
  {
    id: 1,
    name:'compass',
    date:'2023-11-05',
    imag: 'https://th.bing.com/th/id/OIP.eVjdo6y2DC00kfd9CADtkwAAAA?pid=ImgDet&w=167&h=325&c=7',
    description: 'compass',
    created_at:'2023-11-16 13:41:41.093282',
    update_at:'2023-11-16 13:41:41.093282',
  },
  {
    id:2,
    name:'flower',
    date:'2023-11-05',
    imag: 'https://piercingytatuajes.com/img/tatuajes-en-tres-d.jpg',
    description: 'flower',
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:3,
    name:'guide',
    date: '2023-11-05',
    imag: 'https://th.bing.com/th/id/OIP.ow3d5Crpvov7PKuj8Es-nQHaNK?pid=ImgDet&w=188&h=333&c=7',
    description: 'guide',
    created_at: '2023-11-16 13:41:41.093282',
    update_at:'2023-11-16 13:41:41.093282',
  },
  {
    id:4,
    name:'spinal column',
    date: '2023-11-05',
    imag: 'https://th.bing.com/th/id/R.44caf4cef997ce3ead598ce189706758?rik=tIMDbUBf7J5EHw&riu=http%3a%2f%2fwww.thisistattoo.com%2fwp-content%2fuploads%2f2014%2f07%2f3D-tattoos010.jpg&ehk=%2bNlagKYx6orLTs5NJwm0gXYSn7TeOi9JREWeVxd2PTY%3d&risl=&pid=ImgRaw&r=0',
    description: 'spinal column 3D',
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:5,
    name:'chest',
    date:'2023-11-05',
    imag: 'https://i.pinimg.com/originals/03/7a/8d/037a8d5ddc0c202feac1ba8127b61621.jpg',
    description: 'chest 3D',
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:6,
    name:'back',
    date:'2023-11-05',
    imag: 'https://i.pinimg.com/originals/ca/e4/58/cae458fdf71418407b41527a14a4e5f5.jpg',
    description: 'back 3D',
    created_at:'2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:7,
    name:'face Man',
    date:'2023-11-05',
    imag: 'https://th.bing.com/th/id/OIP.XaUXbsrFifHhNOJ8NMtX3AHaHa?rs=1&pid=ImgDetMain',
    description: 'face Man 3D',
    created_at:'2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:8,
    name:'face Woman',
    date:'2023-11-05',
    imag: 'https://i.pinimg.com/736x/94/92/62/9492626eec6a7497e1966f4471cd4722.jpg',
    description: 'face Woman 3D ',
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:9,
    name:'Woman',
    date:'2023-11-05',
    imag: 'https://i.pinimg.com/originals/eb/a0/aa/eba0aa3f946a82e4b75fa5b0f89910fb.jpg',
    description: 'Woman color',
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:10,
    name:'face',
    date:'2023-11-05',
    imag: 'https://www.minabo.com/wp-content/uploads/2020/03/tatuajes-3d-realistas-1.jpg',
    description: 'face 3D' ,
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
    id:11,
    name:'arm',
    date:'2023-11-05',
    imag: 'https://th.bing.com/th/id/OIP.hUG6D4Xo7WOO2SDWSBFkmgAAAA?rs=1&pid=ImgDetMain',
    description: 'arm 3D',
    created_at: '2023-11-16 13:41:41.093282',
    update_at: '2023-11-16 13:41:41.093282',
  },
  {
   id:12,
   name:'arm color',
   date:'2023-11-05',
   imag: 'https://archziner.com/wp-content/uploads/2020/04/female-face-surrounded-by-flowers-arm-tattoo-traditional-tattoo-designs-floral-crown.jpg',
   description: 'arm color 3D',
   created_at: '2023-11-16 13:41:41.093282',
   update_at: '2023-11-16 13:41:41.093282',
  },
];

export default Home