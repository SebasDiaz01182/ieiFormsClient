import React from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from '@mui/material/Button';

export default function AddButton({label, handleClick}) {
  return (
    <Button 
      endIcon={<AddCircleRoundedIcon />} 
      color="primary" 
      variant="contained"
      onClick={handleClick}>
        {label}
    </Button>
  )
}
