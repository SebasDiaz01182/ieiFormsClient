import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function SimpleCard({title, caption, description,handleEdit, handleDelete}) {
  
  return (
    <Card sx={{ minWidth: 275, maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {caption}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleEdit} size="small">Editar</Button>
        <Button onClick={handleDelete} size="small">Eliminar</Button>
      </CardActions>
    </Card>    
  )
}

export default SimpleCard