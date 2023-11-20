import React from "react";
import { TextField, Typography } from "@mui/material";

const InputController = ({
  label,
  name,
  error,
  type,
  functionBlur,
  value,
  onChange,
}) => {
  return (
    <div>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={value}
        name={name}
        onBlur={functionBlur}
        type={type}
        onChange={onChange}
      />
      {error && (
        <Typography color="error" fontSize="13px">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default InputController;
