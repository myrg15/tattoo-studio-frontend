import React from 'react';
import { TextField, Typography } from '@mui/material';

const InputController = ({ label, name, error, functionBlur }) => {

    console.log(error)

  return (
    <div>
      <TextField
        label={label}
        variant="outlined"
        name={name}
        onBlur={functionBlur}
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
