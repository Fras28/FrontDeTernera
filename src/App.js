import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing/Landing';
import SimpleCard from './Autenticacion/LogIn';
import SignupCard from './Autenticacion/SignUp';
import Exito from './Results/Exito';
import Error from './Results/Error';
import NotFound from './Results/NotFound';
import UserProfile from './Results/Perfil';
import EditUser from './Results/EditUser';
import Ayuda from './Results/Ayuda';
import Layout from './Results/layout';
import CatallogoFull from './Catalogo/CatalogoFull';
import PersonalDataForm from './Results/PersonalData';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<SimpleCard />} />
          <Route path="/Signup" element={<SignupCard />} />
          <Route path="/Exito" element={<Exito />} />
          <Route path="/error" element={<Error />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/EditUser" element={<EditUser />} />
          <Route path="/Ayuda" element={<Layout child={<Ayuda/>} />} />
          <Route path="/CatFull" element={<Layout child={<CatallogoFull/>} />} />
          <Route path="/PersonalData" element={<PersonalDataForm/>} />
          
          {/* Ruta para redirigir a NotFound si la URL no coincide con ninguna ruta definida */}
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
