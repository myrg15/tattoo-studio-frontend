import React from 'react'
import { Box, Button, Typography, TextField } from "@mui/material"
//import InputController from "../../common/Inputs/InputController"

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