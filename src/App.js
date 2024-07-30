import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./Landing/Landing";
import SimpleCard from "./Autenticacion/LogIn";
import SignupCard from "./Autenticacion/SignUp";
import Exito from "./Results/Exito";
import Error from "./Results/Error";
import NotFound from "./Results/NotFound";
import UserProfile from "./Results/Perfil";
import EditUser from "./Results/EditUser";
import Ayuda from "./Results/Ayuda";
import Layout from "./Results/layout";
import CatalogoFull from "./Catalogo/CatalogoFull";
import PersonalDataForm from "./Results/PersonalData";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchValor } from "./Redux/Slice";
import DetalleProducto from "./Catalogo/ProductDetail";
import Pedidos from "./Results/Pedidos";
import Carrito from "./Results/Carrito";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchValor())
  }, [dispatch]);

  const categorias = useSelector(state => state.allData.categories);

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
          <Route path="/Pedidos" element={<Pedidos />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Pedidos/:id?" element={<Pedidos />} />
          <Route path="/EditUser" element={<EditUser />} />
          <Route path="/Ayuda" element={<Layout child={<Ayuda />} />} />
          <Route path="/ProdDetalle/:id" element={<DetalleProducto />} />
          <Route
            path="/CatFull"
            element={<Layout child={<CatalogoFull />} />}
          />
          <Route path="/PersonalData" element={<PersonalDataForm />} />
          
          {/* Rutas dinámicas para categorías */}
          {categorias && categorias.map(categoria => (
            <Route 
              key={categoria.id}
              path={`/${categoria.nombre}`} 
              element={<Layout child={<CatalogoFull categori={categoria}/>} />} 
            />
          ))}
          
          {/* Ruta para redirigir a NotFound si la URL no coincide con ninguna ruta definida */}
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;