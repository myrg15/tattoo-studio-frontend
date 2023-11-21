import { createSlice } from '@reduxjs/toolkit';
//import { CustomInput} from "../../common/CustomInput";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {}
    },
    reducers: {
      login: (state, action) => { //le vas agregar todo lo que yo le pase por el path
        return {
          ...state, //al estado inicial le pasa lo que esta en la constante userslice
          ...action.payload// es todo el objeto que le he pasado
        }
      },
      logout: (state, action) => {
        return {
          ...state,
          ...action.payload
         // credentials {} 
        }
      }
      
    }
    
});

export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;