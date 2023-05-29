import React, { useEffect, useState } from 'react';
import SimpleCard from '../../atomics/SimpleCard';
import AddButton from '../../atomics/AddButton';
import { useNavigate,useLocation } from 'react-router';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {TextField} from '@mui/material';
import Layout from '../../Layout';
import './Users.css'
export function Users() {

  const {state} = useLocation()

  const [data, setData] = useState([]),
  [ search, setSearch ] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3001/users/getUsers')
    .then((response) => setData(response.data))
  }, [])
  
  const navigate = useNavigate();

  var userLogged;
  useEffect(()=>{
    try {
      userLogged = state.user
  
    } catch (error) {
      navigate("/");
    }
  },[]);

  const handleClick = () => {
    navigate("/UserForm", {state: {user:userLogged, transaction:"Add"}});
  }

  const editUser = (user) => {
    //sends data to render
    navigate("/UserForm", {state: {
      name: user.name,
      email: user.email,
      password: user.password,
      user:userLogged,
      transaction:"Edit"
    }});
  }
  //Search function
  const searcher = (e) => {
    setSearch(e.target.value)   
  }

  const results = !search ? data : data.filter((customer)=> customer.name.toLowerCase().includes(search.toLocaleLowerCase()))

  const deleteUser = (customer) => {
    axios.post('http://localhost:3001/users/deleteUser', {email : customer.email, name : customer.name})
    .then((response) => {
      window.location.reload();
    })
    
  }

  return (
    <Layout>
        <>
            <br /><br />
            <h1>Usuarios</h1>
            <AddButton label="Nuevo" handleClick={handleClick} /><br/><br/>
            <TextField value={search} 
                    onChange={searcher} 
                    type="text" 
                    placeholder='Búsqueda por nombre'
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
            />
            <br/>
            <br/>
            <div className="card--grid">
            {results.map((user) =>
                <SimpleCard 
                title={user.name} 
                description={user.email} 
                handleEdit={() => {
                    editUser(user);
                }}
                handleDelete={() => {
                    deleteUser(user);
                }}
                />
            )}
            </div>
        </>

    </Layout>
    
  )
}
