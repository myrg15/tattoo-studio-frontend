import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import  { Login }  from '../Login/Login';
import  { Register }  from '../Register/Register';
import  { Profile } from '../Profile/Profile';
import {appointmentCreate} from '../Appointment/Appointment';

//aqui tiene que ir las rutas de login, register, profile, home, todas ls rutas que tengo en el HEADER
    export const Body = () => {
     return (
         <>
            <Routes>
                <Route path={'*'} element={<Navigate to="/" />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/create-employee" element={<Register isCreateEmployee={true}/>} />            
                <Route path="/appointmentCreate" element={<Appointment/>}/>
            </Routes>
         </>
     )
}
