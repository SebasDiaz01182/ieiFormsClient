import React, { Fragment, useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

export function Metrics() {
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

return (
  <Fragment>
      <h1>Análisis de Información</h1>
      <br/>
      <div>
        <iframe title="Promedio de profesores por taller" styles="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-iee-wacna/embed/charts?id=64630e59-f710-4650-8692-8637d2e70317&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
        <iframe title="Desempeño general de profesores" styles="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-iee-wacna/embed/charts?id=64631524-36b3-44ad-8e39-adc5fc9b21d7&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
      </div>
      <br/>
      <div>
        <iframe title = "Comportamiento por taller" styles="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-iee-wacna/embed/charts?id=6463170b-1a61-43b3-896f-0834cfcf6e5f&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
        <iframe title = "Desempeño ocupacional por taller" styles="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-iee-wacna/embed/charts?id=64631826-cbdd-42ab-8868-1db6a64fa149&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
      </div>
      <div>
      <iframe title = "Habilidades blandas por taller" styles="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-iee-wacna/embed/charts?id=6463197d-36b3-47c8-8116-adc5fc9d2ff4&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
        
      </div>
  </Fragment>
)
}