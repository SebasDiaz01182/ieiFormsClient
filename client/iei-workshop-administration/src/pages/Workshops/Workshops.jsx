import React, {useEffect} from 'react'
import Layout from '../../Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box} from '@mui/material'

export function Workshops() {
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

  const sendingUser = {state:{user:userLogged}};
  
  return (
    <Layout>
      <h1>Gestión de Talleres</h1>

      <Stack spacing={4}>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Box sx={{ '& button': { m: 1 } }}>
            <br /> <br /> <br />
            <div>
              <Button
                startIcon={<AddBoxIcon />}
                size="large"
                color="success"
                variant="contained" 
                onClick={()=>{navigate("/AddWorkshops", sendingUser)}}>
                  Nuevo Taller
              </Button>
            </div>
            <br />
            <div>
              <Button 
                size="large"
                startIcon={<EditIcon />}
                color="success"
                variant="contained"
                onClick={()=>{navigate("/EditWorkshops", sendingUser)}}>
                  Editar un Taller
              </Button>
            </div>
            <br />
            <div>
              <Button 
                size="large"
                startIcon={<DeleteIcon />}
                color="success"
                variant="contained"
                onClick={()=>{navigate("/DeleteWorkshops", sendingUser)}}>
                  Eliminar un taller    
              </Button>
            </div>
          </Box>
        </Stack>
    </Stack>
    </Layout>
    
  )
}
