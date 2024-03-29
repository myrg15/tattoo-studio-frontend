import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import  { Login }  from '../Login/Login';
import  { Register }  from '../Register/Register';
import  { Profile } from '../Profile/Profile';
import ViewAppointments from '../Appointment/ViewAppointments';
import ViewUsers from '../User/ViewUsers';
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
                <Route path="/view-users" element={<ViewUsers />} />         
                <Route path="/appointment" element={<ViewAppointments/>}/>
             </Routes>
         </>
     )
}
