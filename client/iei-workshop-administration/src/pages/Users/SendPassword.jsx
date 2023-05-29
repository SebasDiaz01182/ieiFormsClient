import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { FormControl,Button,TextField ,Dialog,DialogTitle,DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import {useForm} from 'react-hook-form';
import './Users.css'
import EmailIcon from '@mui/icons-material/Email';
const useStyles = makeStyles({
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
    },
  });

export function SendPassword() {

  const navigate = useNavigate(),
  classes = useStyles(),
  {register,handleSubmit} = useForm(),
  [open,setOpen] = useState(false),
  [notificationText,setNotificationText] = useState(""),
  onSubmit = async(data)=>{
    try{
        const result = await axios.post('http://localhost:3001/users/sendPassword', data);
        setNotificationText(result.data.message)
        setOpen(true);   

  }catch(err){
      alert(err)
  }
  },
  handleClose = () => {
    setOpen(false);
    navigate('/')
  };

  return (
    <Layout>
        <Fragment>
            <br /><br />
            <h1>Recuperar contraseña</h1>
            <br /><br /><br /><br />
            <div className={classes.center}>
                <Box

                sx={{
                    '& > :not(style)': { m: 1, width: '80ch' },
                    top:'50%',
                    transform : 'translateY(-50%)'

                }}
                noValidate
                autoComplete="off"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className='workshop-form'>
                    <FormControl sx={{minWidth: "50%" }}>
                    <br />

                    <label htmlFor="information">¡ Para recuperar su contraseña por favor ingrese su dirección electrónica y su datos serán enviados a su correo !</label>
                    <br />
                    <TextField  required id={"email"} label={"Correo electrónico"} variant="outlined" 
                    inputProps={{ maxLength: 100 }}
                    type="email" 
                    {...register('email',{required : true})}
                    />
                    <br />
                    &nbsp;
                    <Button type="submit"  color="primary" variant="contained" startIcon={<EmailIcon />} >
                            Enviar información
                    </Button>
                </FormControl> 
                        
                        
                    </form>
                </Box>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {notificationText}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Entendido</Button>
                </DialogActions>

            </Dialog>
            
        </Fragment>

    </Layout>
    
  )
}