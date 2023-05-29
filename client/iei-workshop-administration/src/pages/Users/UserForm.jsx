import React, { Fragment, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { FormControl,Button,TextField ,Dialog,DialogTitle,DialogActions } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import {useForm} from 'react-hook-form';
import './Users.css'
const useStyles = makeStyles({
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
    },
  });

export function UserForm() {

  const {state} = useLocation(),
  navigate = useNavigate();

  var userLogged;

  useEffect(()=>{
    try {
      userLogged = state.user
    } catch (error) {
      navigate("/");
    }
  },[]);

  const classes = useStyles(),
  {register,handleSubmit} = useForm(),
  [open,setOpen] = useState(false),
  [notificationText,setNotificationText] = useState(""),
  sendingUser = {state:{user:userLogged}},
  onSubmit = async(data)=>{
    try{
      
        if(state.transaction === "Add"){  //new client
            try{
                const result = await axios.post('http://localhost:3001/users/addUser', data);
                setNotificationText(result.data.message)
                setOpen(true);  
            }catch(err){
                alert(err)
            }
        }
        else {  //edit client
            try{
                const result = await axios.post('http://localhost:3001/users/editUser', data);
                setNotificationText(result.data.message)
                setOpen(true);  
            }catch(err){
                alert(err)
            }
        }                
      
  }catch(err){
      alert(err)
  }
  },
  handleClose = () => {
    setOpen(false);
    navigate('/Users',sendingUser )
  };
  try {
    
    return (
      <Layout>
  
  <Fragment>
          <br /><br />
          <h1>Gestionar Usuario</h1>
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
                  
                  <TextField  required id={"name"} label={"Nombre"} variant="outlined" 
                  defaultValue={state.name}
                  inputProps={{ maxLength: 100 }}
                  {...register('name',{required : true})}
                  />
                  <br />
                  &nbsp;
                  <TextField  required id={"email"} label={"Email"} variant="outlined" 
                  value={state.email}
                  inputProps={{ maxLength: 100 }}
                  type = "email"
                  {...register('userEmail',{required : true})}
                  />
                  <br />
                  &nbsp;
                  <TextField  required id={"password"} label={"Contraseña"} variant="outlined" 
                  defaultValue={state.password} 
                  inputProps={{ maxLength: 8 }}
                  type = "password"
                  {...register('password',{required : true})}
                  />                
                  <br />
                  &nbsp;
                  <Button type="submit"  color="primary" variant="contained" >
                          Registrar datos
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

  } catch (error) {
    navigate("/")
  }
}
