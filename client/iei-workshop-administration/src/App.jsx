import React from 'react';
import './App.css';

import { LoginPage } from './pages/LoginPage/LoginPage';
import {AdminPage} from './pages/AdminPage/AdminPage';
import { Workshops } from './pages/Workshops/Workshops';
import { AddWorkshops } from './pages/Workshops/AddWorkshops';
import { EditWorkshops } from './pages/Workshops/EditWorkshops';
import { DeleteWorkshops } from './pages/Workshops/DeleteWorkshops';
import { Users } from './pages/Users/Users';
import { UserForm } from './pages/Users/UserForm';
import { Metrics } from './pages/Metrics/Metrics';
import Nav from './molecules/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Forms } from './pages/Forms/Forms';
import { SendPassword } from './pages/Users/SendPassword';

export function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="" element={<Nav />}>
            <Route path="/AdminPage" element={<AdminPage />} />

            <Route path="/Workshops" element={<Workshops />} />
            <Route path="/AddWorkshops" element={<AddWorkshops />} />
            <Route path="/EditWorkshops" element={<EditWorkshops />} />
            <Route path="/DeleteWorkshops" element={<DeleteWorkshops />} />

            <Route path="/Metrics" element={<Metrics/>} />

            <Route path="/Users" element={<Users />} />
            <Route path="/UserForm" element={<UserForm />} />
            <Route path="/SendPassword" element={<SendPassword />} />

            <Route path="/Forms" element={<Forms />} />
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
