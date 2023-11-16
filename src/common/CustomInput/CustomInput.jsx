import React from 'react'
import { Box, Button, Typography, TextField } from "@mui/material"
import { CustomInput} from "../../common/CustomInput";
import {Profile} from "../../pages/Profile";
//import { analysis } from "vite"; como se debe importar plugin vite:import-analysis

export const CustomInput = ({disabled, design, type, name, placeholder, value, functionProp, functionBlur}) => {

    return (
        <div>
        <TextField
            disabled={disabled}
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value || undefined}
            onChange={(e)=>functionProp(e)}
            onBlur={(e)=>functionBlur(e)}
         />
        </div>

     )
}