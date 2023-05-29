import React,{useState, useEffect} from 'react';
import Layout from '../../Layout';
import {useForm} from 'react-hook-form';
import {TextField,Button,MenuItem, Box,Select,InputLabel, Radio,RadioGroup,FormControlLabel,FormLabel,FormControl,Dialog,DialogTitle,DialogActions} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation,useNavigate } from 'react-router-dom';
import './Forms.css'
import axios from 'axios'

const useStyles = makeStyles({
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '120vh',
    },
  });

export function Forms() {
    const {state} = useLocation(),
    {register,handleSubmit} = useForm(),
    [workshops, setWorkshops] = useState([]),
    [open,setOpen] = useState(false),
    navigate = useNavigate()

    var userLogged;
    useEffect(()=>{
      try {
        userLogged = state.user
        console.log("Try");
    
      } catch (error) {
        navigate("/");
      }
    },[]);


    const sendingUser = {state:{user:userLogged}},
    handleClose = () => {
        setOpen(false);
        navigate('/AdminPage',sendingUser)
    };
    

    //Submit function for form
    const onSubmit = async(data)=>{
        console.log(data);
        const response = await axios.post('http://localhost:3001/forms/submitForm', data);
        if(response.data.message !== undefined) {
            setOpen(true);
        }
        console.log(response);
    }

    //Update form styles
    useStyles();

    //Get workshops from database
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
            <br/>
            <h1>Registro para Supervisión de Talleres Vocacionales</h1>
            <br/>
            <br/>
            <br/>
            
            <center>
                
                <div >
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '100ch' },
                            top:'50%',
                            
                            

                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className='workshop-form'>
                                                                  
                            <div className="form-grid">
                                <FormControl sx={{minWidth: "99%" }}>            
                                        <InputLabel id="workshop">Taller</InputLabel>                
                                        <Select 
                                                labelId="workshop"
                                                id="workshop"
                                                label="Taller"
                                                
                                                {...register('workshop',{required : true})}
                                            >
                                                {workshops.map((option)=> (
                                                <MenuItem value={option.name} >{option.name}</MenuItem>
                                                ))}
                                    
                                        </Select>
                                </FormControl>                                  
                                <TextField sx={{width:{md: "49%"}}} id="formDate" variant="outlined"
                                    type = "date"
                                    required
                                    inputProps={{ maxLength: 100 }}
                                    {...register('formDate',{required : false})}
                                />

                                <TextField sx={{width:{md: "49%"}}} id="teacher" variant="outlined"
                                    label="Profesor a cargo" 
                                    type = "text"
                                    required
                                    inputProps={{ maxLength: 100 }}
                                    {...register('teacher',{required : false})}
                                />

                                <TextField sx={{width:{md: "49%"}}} id="partner" variant="outlined"
                                    label="Persona encargada que acompaña" 
                                    type = "text"
                                    required
                                    inputProps={{ maxLength: 100 }}
                                    {...register('partner',{required : false})}
                                />

                                <TextField sx={{width:{md: "49%"}}} id="participants" variant="outlined"
                                    label="Cantidad de Participantes" 
                                    type = "number"
                                    required
                                    inputProps={{ maxLength: 100 }}
                                    {...register('participantsAmount',{required : false})}
                                />
                                <TextField sx={{width:{md: "100%"}}} id="participantsNames"  variant="outlined" 
                                    required 
                                    multiline 
                                    rows={6}
                                    label="Nombre de los participantes"
                                    {...register('participantsList',{required : false})}
                                />                                            
                                <h5>1-Evaluación sobre el desempeño del profesor al impartir el taller: </h5>          
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Brinda indicaciones claras y concisas que facilitan el aprendizaje.</FormLabel>
                                    <RadioGroup                            
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        
                                    >
                                        <FormControlLabel value='1' control={<Radio />} label="1" {...register('clearInstructions',{required : false})}/>
                                        <FormControlLabel value='2' control={<Radio />} label="2" {...register('clearInstructions',{required : false})}/>
                                        <FormControlLabel value='3' control={<Radio />} label="3" {...register('clearInstructions',{required : false})}/>                                        
                                    </RadioGroup>
                                    
                                </FormControl>
                                
                                
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Relación de respeto y autoridad con los estudiantes.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('respectAuthority',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('respectAuthority',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('respectAuthority',{required : false})}/>
                                        
                                    </RadioGroup> 
                                </FormControl>
                                <FormControl> 
                                <FormLabel id="demo-row-radio-buttons-group-label">Establecimiento de normas y límites claros dentro del taller</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('rulesLimits',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('rulesLimits',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('rulesLimits',{required : false})}/>
                                        
                                    </RadioGroup> 
                                </FormControl>
                                <FormControl> 
                                <FormLabel id="demo-row-radio-buttons-group-label">Promueve la participación activa y el uso adecuado del equipo de los estudiantes.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('activeParticipation',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('activeParticipation',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('activeParticipation',{required : false})}/>
                                        
                                    </RadioGroup>
                                </FormControl>  
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Promueve un ambiente positivo para el aprendizaje.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('positiveEnvironment',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('positiveEnvironment',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('positiveEnvironment',{required : false})}/>
                                        
                                    </RadioGroup>
                                </FormControl>
                                
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Explica, acompaña y guía de manera positiva durante el taller.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('positiveGuidance',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('positiveGuidance',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('positiveGuidance',{required : false})}/>
                                        
                                    </RadioGroup>                                       
                                </FormControl>
                                <TextField sx={{width:{md: "100%"}}} id="firstObservations"  variant="outlined" 
                                    required 
                                    multiline 
                                    rows={6}
                                    label="Observaciones"
                                    {...register('performanceNotes',{required : false})}
                                /> 
                                <h5>2-Evaluación del desempeño conductual de los estudiantes:</h5>
                                <FormControl>                                
                                    <FormLabel id="demo-row-radio-buttons-group-label">Seguimiento de indicaciones y cumplimiento de normas del taller.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('followInstructions',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('followInstructions',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('followInstructions',{required : false})}/>
                                        
                                    </RadioGroup>
                                </FormControl>

                                <FormControl> 
                                <FormLabel id="demo-row-radio-buttons-group-label">Propicia una convivencia positiva.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('positiveCoexistence',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('positiveCoexistence',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('positiveCoexistence',{required : false})}/>
                                        
                                    </RadioGroup> 
                                </FormControl>

                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Trato respetuoso con el docente y compañeros.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('respectfulTreat',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('respectfulTreat',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('respectfulTreat',{required : false})}/>
                                        
                                    </RadioGroup> 
                                </FormControl>
                                
                                <FormControl> 
                                <FormLabel id="demo-row-radio-buttons-group-label">Mantiene una actitud de interés y participación activa.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('interestParticipation',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('interestParticipation',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('interestParticipation',{required : false})}/>
                                        
                                    </RadioGroup>
                                </FormControl>  
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Presentacion y aseo personal.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('cleanPresentation',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('cleanPresentation',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('cleanPresentation',{required : false})}/>
                                        
                                    </RadioGroup>
                                </FormControl>
                                
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Uso adecuado y cuido de equipo, herramientas y materiales.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('toolCorrectUsage',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('toolCorrectUsage',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('toolCorrectUsage',{required : false})}/>
                                        
                                    </RadioGroup>                                       
                                </FormControl>
                                <TextField sx={{width:{md: "100%"}}} id="secondObservations"  variant="outlined" 
                                    required 
                                    multiline 
                                    rows={6}
                                    label="Observaciones"
                                    {...register('behavioralNotes',{required : false})}
                                />
                                <h5>3-Evaluación del rendimiento ocupacional de los estudiantes:</h5>

                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Los temas vistos en el taller contribuyen a la formación técnica de los estudiantes.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('technicalFormation',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('technicalFormation',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('technicalFormation',{required : false})}/>
                                        
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Los temas vistos coinciden con los objetivos del taller.</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('topicsMatch',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('topicsMatch',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('topicsMatch',{required : false})}/>
                                        
                                    </RadioGroup>                                       
                                </FormControl>
                                <TextField sx={{width:{md: "100%"}}} id="topics"  variant="outlined" 
                                    required 
                                    multiline 
                                    rows={6}
                                    label="Escriba los temas y las habilidades técnicas vistas en el taller (consultar al profesor)"
                                    {...register('ocupationalNotes',{required : false})}
                                />
                                <h5>4-Evaluación de habilidades blandas y sociales de los estudiantes durante el taller.</h5>
                               
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Comunicacion asertiva</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('asertiveCommunication',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('asertiveCommunication',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('asertiveCommunication',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('asertiveCommunication',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl>
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Responsabilidad</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('responsability',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('responsability',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('responsability',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('responsability',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl>
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Actitud positiva hacia el aprendizaje</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('positiveActitude',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('positiveActitude',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('positiveActitude',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('positiveActitude',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl>
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Manejo de frustracion y estres</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('managesFrustration',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('managesFrustration',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('managesFrustration',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('managesFrustration',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl>           
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Iniciativa y proactividad</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('proactivity',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('proactivity',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('proactivity',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('proactivity',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl>        
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Valora su trabajo</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('valuesWork',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('valuesWork',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('valuesWork',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('valuesWork',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Manifiesta autonomia</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('manifestsAutonomy',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('manifestsAutonomy',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('manifestsAutonomy',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('manifestsAutonomy',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Manifiesta seguridad en el trabajo</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('workSecurity',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('workSecurity',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('workSecurity',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('workSecurity',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Manifiesta interes por el trabajo</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('manifestInterest',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('manifestInterest',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('manifestInterest',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('manifestInterest',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Respeto, cortesia y convivencia</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('convivence',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('convivence',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('convivence',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('convivence',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Trabajo en equipo y cooperacion</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('teamwork',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('teamwork',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('teamwork',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('teamwork',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Creatividad e innovacion</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('creativity',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('creativity',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('creativity',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('creativity',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl> 
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Perseverancia: trata de hacer las cosas bien, no se rinde ante los obstaculos</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"                                        
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="0" {...register('perseverance',{required : false})}/>
                                        <FormControlLabel value="1" control={<Radio />} label="1" {...register('perseverance',{required : false})}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" {...register('perseverance',{required : false})}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" {...register('perseverance',{required : false})}/>
                                    </RadioGroup>                                       
                                </FormControl>
                                <TextField sx={{width:{md: "100%"}}} id="thirdObservations"  variant="outlined" 
                                    required 
                                    multiline 
                                    rows={6}
                                    label="Observaciones"
                                    {...register('softSkillsNotes',{required : false})}
                                />
                            
                            </div>
                        <br />
                        <Button
                            type="submit" 
                            size="large"
                            color="success"
                            variant="outlined"
                            >
                                Enviar Evaluación    
                        </Button>
                        </form>
                        
                    </Box>
                    
                </div>
            </center>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Formulario ingresado exitosamente
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Entendido</Button>
                </DialogActions>

            </Dialog>
            </Layout>
        
    );
}
