import React, { useState,useEffect } from 'react'
import {Dialog,DialogTitle,DialogActions} from '@mui/material'
import Box from '@mui/material/Box';

import { makeStyles } from '@mui/styles';
import { InputLabel, MenuItem, Select, FormControl,Button } from '@mui/material';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useLocation,useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import "./Workshops.css"

const useStyles = makeStyles({
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
  });



export function DeleteWorkshops() {
  const {state} = useLocation(),
  navigate = useNavigate()

  var userLogged;
  useEffect(()=>{
    try {
      userLogged = state.user
  
    } catch (error) {
      navigate("/");
    }
  },[]);
  
  const sendingUser = {state:{user:userLogged}},
    classes = useStyles(),
    [workshops, setWorkshops] = useState([]),
    {register,handleSubmit} = useForm(),
    [open,setOpen] = useState(false),
    
    [notificationText,setNotificationText] = useState(""),
    onSubmit = async(data)=>{
      try{
        const result = await axios.post('http://localhost:3001/workshops/deleteWorkshop', data);               
        setNotificationText(result.data.message)
        setOpen(true);                
        navigate('/Workshops',sendingUser)
        
      }catch(err){
          alert(err)
      }

    },
    handleClose = () => {
      setOpen(false);
  };
  useEffect(()=>{
    const workshopOptions = async() => {
      try {
        const response = await axios.get('http://localhost:3001/workshops/getWorkshop')
        setWorkshops(response.data);
        
      } catch (err) {
        console.error(err);
      }
    };
    workshopOptions();
  },[]);

  return (
    <Layout>
        
        <h1>Eliminar Taller</h1>

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
                    <h2> Seleccione el taller a eliminar</h2>
                    <br/>
                    <FormControl sx={{minWidth: "50%" }}>
                <InputLabel id="discount-client">Taller</InputLabel>

                <Select 
                    labelId="select-client"
                    id="discount-client"
                    label="Taller"
                    
                    {...register('workshop',{required : true})}
                  >
                    {workshops.map((option)=> (
                      <MenuItem value={option.name} >{option.name}</MenuItem>
                    ))}
                    
                </Select>
                <br />
                &nbsp;
                <Button type="submit"  color="primary" variant="contained" >
                        Eliminar
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
    </Layout>
    
  )
}
