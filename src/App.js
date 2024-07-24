import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { uploadProducts } from './Redux/Slice';

const allData = {"data":[
  {
    "sub_categoria": "Tapeos/Para picar",
    "items": [
      {
        "name": "Chicken Fingers",
        "detail": "Bastoncitos de pollo con salsa picante",
        "price": 5200
      },
      {
        "name": "Cheese Snack",
        "detail": "Bastoncitos de muzzarella con salsa alioli",
        "price": 5600
      },
      {
        "name": "Salchi Roll",
        "detail": "Salchichas envueltas en cheddar y masa crocante con dip de mostaza ahumada",
        "price": 5000
      },
      {
        "name": "Empanadas veganas",
        "detail": "(4) Empanaditas de verduras salteadas, zanahoria, morron, cebolla, berenjena & champigniones.",
        "price": 5000
      },
      {
        "name": "Empanadas de carne",
        "detail": "(4) Empanaditas de carne, cebolla & queso, con salsa picante",
        "price": 5400
      },
      {
        "name": "Rabas",
        "detail": "Rabas con limon & dip salsa aleoli",
        "price": null
      },
      {
        "name": "Tabla de tapeo",
        "detail": "Bastoncitos de pollo, bastoncitos de muzza & Salchi rolls con salsa de mostaza ahumada y barbacoa.",
        "price": 12000
      },
      {
        "name": "Tortilla",
        "detail": "Tortilla con jamon, queso, verdeo y lactonesa de ajo",
        "price": 4800
      },
      {
        "name": "Tortilla veggie",
        "detail": "Tortilla con roquefort, nuez, verdeo y lactosa de ajo",
        "price": 4800
      },
      {
        "name": "Salsas",
        "detail": "Aleoli | Picante | Mostaza Ahumada | Cheddar",
        "price": null
      }
    ]
  },
  {
    "sub_categoria": "Papas",
    "items": [
      {
        "name": "Baires",
        "detail": "Papas bañadas con chedar, acompañadas de panceta y verdeo",
        "price": 5000
      },
      {
        "name": "Palermo",
        "detail": "Papas con salchichas, huevo frito y barbacoa casera",
        "price": 5300
      },
      {
        "name": "Puerto Madero",
        "detail": "Papas con salsa de queso fundido, mix de hongos y nuez.",
        "price": 5500
      },
      {
        "name": "Congreso",
        "detail": "Papas con bondiola desmenuzada, salsa de queso fundido y pimientos asados.",
        "price": 5500
      }
    ]
  },
  {
    "sub_categoria": "Principales",
    "items": [
      {
        "name": "Lomo",
        "detail": "Lomo con papas españolas y verduras asadas, con manteca de hierbas.",
        "price": 8000
      },
      {
        "name": "Bondiola",
        "detail": "Bondiola braseada cubierta de queso fundido, lonjas de panceta, huevo frito, cebollas caramelizadas y pimientos asados acompañadas de papas españolas.",
        "price": 8000
      },
      {
        "name": "Milanesa Madero",
        "detail": "Milanesa con fondeau de queso y mix de hongos",
        "price": 6000
      },
      {
        "name": "Milanesa napo",
        "detail": "Milanesa napolitana (salsa de tomate, jamon, queso y oregano) acompañada de papas fritas",
        "price": 5400
      },
      {
        "name": "Milanesa a Caballo",
        "detail": "Milanesa con queso chedar y huevo frito acompañada de papas fritas",
        "price": 6000
      },
      {
        "name": "Wok de Lomo",
        "detail": "Fideos de arroz, verduras salteadas, lomo, panceta, hongos, salsa de soja y semilla de sesamo.",
        "price": 9000
      },
      {
        "name": "Wok de Verdura",
        "detail": "Fideos de arros, verduras salteadas, almendras tostadas, salsa de soja y semilla de sesamo.",
        "price": 8000
      },
      {
        "name": "Wok de Pollo",
        "detail": "Fideos de arroz, verduras salteadas, pollo, almendras, salsa de soja y semilla de sesamo.",
        "price": 9000
      }
    ]
  },
  {
    "sub_categoria": "Ensaladas",
    "items": [
      {
        "name": "Caesar",
        "detail": "Mix de hojas verdes, pechuga grille, croutons, queso parmesano y dressing caesar.",
        "price": 4000
      },
      {
        "name": "Caprese",
        "detail": "Cubos de queso, cherries confitados, aceitunas negras y pesto de albahaca.",
        "price": 3600
      },
      {
        "name": "Mediterranea",
        "detail": "Mix de hojas verdes, jamon serrano, cheese sticks, tomates cherries y aceite de oliva.",
        "price": 4000
      },
      {
        "name": "Crispy",
        "detail": "Mix de hojas verdes, pollo grispy, crocantes de panceta, queso en hebras y dressing ranch.",
        "price": 4200
      }
    ]
  },
  {
    "sub_categoria": "Entre Panes",
    "items": [
      {
        "name": "Baires",
        "detail": "Pan de papa, medallon de carne, panceta & doble chedar.",
        "price": 6000
      },
      {
        "name": "Congreso",
        "detail": "Pan de papa, doble carne, tomate, lechuga, jamon y queso.",
        "price": 7200
      },
      {
        "name": "Doble Baires",
        "detail": "Pan de papa , doble carne, doble cheddar, panceta, cebolla caramelizada & huevo frito.",
        "price": 7500
      },
      {
        "name": "Palermo",
        "detail": "Pan de papa, doble carne, doble chedar, lechuga, cebolla crispy & panceta",
        "price": 7500
      },
      {
        "name": "Puerto Madero",
        "detail": "Pan de papa, medallon carne, queso azul & morron asado.",
        "price": 7000
      },
      {
        "name": "Mega Baires",
        "detail": "Pan de papa, triple carne, triple chedar, panceta, cebolla caramelizada & huevo frito.",
        "price": 9000
      },
      {
        "name": "Lomo Baires",
        "detail": "Lomo en pan arabe, doble cheddar, panceta & huevo frito.",
        "price": 8000
      },
      {
        "name": "Lomo Madero",
        "detail": "Lomo en pan arabe, queso tybo, palta, tomate & huevo.",
        "price": 8000
      },
      {
        "name": "Veggie",
        "detail": "Medallon de spinaca/calabaza con lechuga, palta, cebolla caramelizada, queso crema, lonjas de parmesano & ciguliette",
        "price": 7000
      },
      {
        "name": "Bondiola Madero",
        "detail": "Bondiola desmenuzada, queso tibo, palta, tomate & huevo.",
        "price": 8000
      }
    ]
  },
  {
    "sub_categoria": "Pizzas",
    "items": [
      {
        "name": "Clasica",
        "detail": "Mozzarella, Jamon, aceitunas & oreganos",
        "price": 7000
      },
      {
        "name": "Napolitana",
        "detail": "Mozzarella - Albahaca & Aceite de oliva.",
        "price": 7500
      },
      {
        "name": "Caprese",
        "detail": "Mozzarella - Mix de tomates & Pesto de albahaca",
        "price": 7500
      },
      {
        "name": "Fuggazza",
        "detail": "Mozzarella - Cebolla",
        "price": 7500
      },
      {
        "name": "Especial",
        "detail": "Mozzarella - Jamon - Morrones - Aceitunas",
        "price": 7300
      },
      {
        "name": "Serrana",
        "detail": "Mozzarella - Jamon crudo - Rucula",
        "price": 7800
      },
      {
        "name": "Americana",
        "detail": "Mozzarella - Panceta - Huevos Fritos",
        "price": 7600
      },
      {
        "name": "4 Quesos",
        "detail": "",
        "price": 7600
      },
      {
        "name": "Baires",
        "detail": "Mozzarella - Cheddar - Pollo - Barbacoa Casera & Verdeo",
        "price": 8000
      }
    ]
  },
  {
    "sub_categoria": "S/Tacc",
    "items": [
      {
        "name": "Pizza Individual",
        "detail": "",
        "price": 5400
      },
      {
        "name": "Papas",
        "detail": "Papas con cheddar - Panceta & Verdeo.",
        "price": 4000
      }
    ]
  },
  {
    "sub_categoria": "Veggie & Vegano",
    "items": [
      {
        "name": "Empanadas veganas",
        "detail": "4 Empanadas de verduras salteadas, zanahoria, morron, cebolla, berenjena & champigniones.",
        "price": 5000
      },
      {
        "name": "Papas Puerto Madero",
        "detail": "Papas con salsa de queso fundido, mix de hongos y nuez.",
        "price": 5500
      },
      {
        "name": "Wok de Verdura",
        "detail": "Fideos de arros, verduras salteadas, almendras tostadas, salsa de soja y semilla de sesamo.",
        "price": 8000
      },
      {
        "name": "Buerger Veggie",
        "detail": "Medallon de spinaca/calabaza con lechuga, palta, cebolla caramelizada, queso crema, lonjas de parmesano & ciboulette",
        "price": 7000
      }
    ]
  },
  {
    "sub_categoria": "Postres",
    "items": [
      {
        "name": "",
        "detail": "Consultar variedad del dia",
        "price": 1200
      }
    ]
  },
  {
    "sub_categoria": "Beer",
    "items": [
      {
        "name": "Golden Ale",
        "detail": "4.86% - IBU 14 | Cerveza de alta tomabilidad con orientación hacia la malta. Balanceada y limpia. De color amarillo brillante con buena retención de espuma. Suave dulzor de malta y aromas a cereal, con presencia de lúpulo, aunque el amargar es bajo. El final es seco a ligeramente dulce-maltoso",
        "price": 2700
      },
      {
        "name": "Honey",
        "detail": "5.64% - IBU 22 | Cerveza rubia de un color dorado profundo. Maltas caramelo y clara presencia de miel en sabor y aroma. El cuerpo es de ligero a medio, buena tomabilidad. Amargor bajo y balance hacia la malta y la miel.",
        "price": 2700
      },
      {
        "name": "Ipa",
        "detail": "4,3% - IBU 31 | Cerveza clara de color amarillento. Cuerpo ligero, con sabores a malta y caramelo, aunque el predominante principal es el lúpulo. Amargor medio alto. Notas a resina, frutas tropicales y cítricas.",
        "price": 3000
      },
      {
        "name": "Scottish",
        "detail": "",
        "price": 2700
      }
    ]
  },
  {
    "sub_categoria": "Vino Tirado",
    "items": [
      {
        "name": "Canilla 1",
        "detail": "Malbec Reserva",
        "price": 2500
      },
      {
        "name": "Canilla 2",
        "detail": "Malbec Premium",
        "price": 2500
      }
    ]
  },
  {
    "sub_categoria": "Tragos Clasicos",
    "items": [
      {
        "name": "Fernet Branca",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Cuba libre",
        "detail": "(logo Havana)",
        "price": 4000
      },
      {
        "name": "Skyy + Naranja",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Skyy  + Speed",
        "detail": "",
        "price": 4800
      },
      {
        "name": "Aperol Spritz",
        "detail": "",
        "price": 4500
      },
      {
        "name": "Apple Whiskey",
        "detail": "Whisky, manzana macerada, almibar y dash de limon",
        "price": 4200
      },
      {
        "name": "Campari + Naranja",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Campari + Tonica",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Negroni",
        "detail": "",
        "price": 3800
      }
    ]
  },
  {
    "sub_categoria": "Tragos Clasicos",
    "items": [
      {
        "name": "Fernet Branca",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Cuba libre",
        "detail": "(logo Havana)",
        "price": 4000
      },
      {
        "name": "Skyy + Naranja",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Skyy  + Speed",
        "detail": "",
        "price": 4800
      },
      {
        "name": "Aperol Spritz",
        "detail": "",
        "price": 4500
      },
      {
        "name": "Apple Whiskey",
        "detail": "Whisky, manzana macerada, almibar y dash de limon",
        "price": 4200
      },
      {
        "name": "Campari + Naranja",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Campari + Tonica",
        "detail": "",
        "price": 3800
      },
      {
        "name": "Negroni",
        "detail": "",
        "price": 5000
      },
      {
        "name": "Jagger + Red Bull",
        "detail": "",
        "price": 6500
      }
    ]
  },
  {
    "sub_categoria": "Only Gin",
    "items": [
      {
        "name": "Beefeater",
        "detail": "(logo beefeater)",
        "price": 5000
      },
      {
        "name": "Bull Dog",
        "detail": "",
        "price": 4700
      },
      {
        "name": "Aconcagua",
        "detail": "",
        "price": 4400
      },
      {
        "name": "Blurs",
        "detail": "",
        "price": 3800
      }
    ]
  },
  {
    "sub_categoria": "GIN COCKTAILS",
    "items": [
      {
        "name": "Palermo Tonic",
        "detail": "Gin Tirado, Lima, Pomelo, Jugo de Limon, Almibar & Tonica",
        "price": 3800
      },
      {
        "name": "Berries Tonic",
        "detail": "Gin Tirado, Lima, Frutos Rojos, Almibar & Tonica",
        "price": 4300
      },
      {
        "name": "Recoleta Tonic",
        "detail": "Gin Tirado, Lima, Maracuya, Almibar & Tonica",
        "price": 4300
      },
      {
        "name": "Julep Tonic",
        "detail": "Refrescante Julep de gin con jugo de pomelo",
        "price": 3800
      },
      {
        "name": "Tom Collins",
        "detail": "Gin Tirado, almibar, jugo de limon y soda",
        "price": 3800
      }
    ]
  },
  {
    "sub_categoria": "Cokteleria",
    "items": [
      {
        "name": "Berries",
        "detail": "Sernova - Frutos rojos - Jugo de pomelo",
        "price": 4200
      },
      {
        "name": "Passion Fruit",
        "detail": "Sernova - Maracuya - dash almibar - jugo de naranja",
        "price": 4200
      },
      {
        "name": "Peach",
        "detail": "Sernova - durazno natural - soda - almibar, - jugo de limon",
        "price": 4200
      },
      {
        "name": "tinto de verano",
        "detail": "vino tinto- sprite- rodaja de limon",
        "price": 3800
      },
      {
        "name": "sangria",
        "detail": "vino tinto-jugo de naranja- rodaja de naranja",
        "price": 3800
      },
      {
        "name": "Malibu sunset",
        "detail": "ron malibu-jugo de naranja- jugo de anana-granadina",
        "price": 4200
      }
    ]
  },
  {
    "sub_categoria": "Ron",
    "items": [
      {
        "name": "Punch estacion",
        "detail": "Ron dorado - frutas de estacion - almibar - jugo de naranja - jugo de pomelo",
        "price": 4200
      },
      {
        "name": "Punch Malibu",
        "detail": "Ron malibu - frutas de estacion - almibar - jugo de naranja - jugo de pomelo",
        "price": 4200
      },
      {
        "name": "Maitai",
        "detail": "Ron blanco - ron malibu - anana macerado - jugo naranja",
        "price": 4200
      },
      {
        "name": "Mojito tradicional",
        "detail": "Ron blanco - menta - limon - almibar - soda",
        "price": 3800
      },
      {
        "name": "Mojito maracuya",
        "detail": "Ron blanco - maracuya - menta - limon - azucar - soda",
        "price": 4300
      },
      {
        "name": "Caipirisima",
        "detail": "Ron blanco- lima - azucar",
        "price": 4000
      }
    ]
  },
  {
    "sub_categoria": "Caipis",
    "items": [
      {
        "name": "Caipirinha",
        "detail": "Cachaza, lima y azucar",
        "price": 3600
      },
      {
        "name": "Caipiroska",
        "detail": "Vodka, lima y azucar",
        "price": 3600
      },
      {
        "name": "Boom",
        "detail": "Shaken de ron blanco con lima y azucar",
        "price": 3600
      },
      {
        "name": "Frutos Rojos",
        "detail": "Frutos rojos",
        "price": 4200
      },
      {
        "name": "Maracuya",
        "detail": "Maracuya",
        "price": 4200
      },
      {
        "name": "Durazno",
        "detail": "Durazno",
        "price": 4200
      }
    ]
  },
  {
    "sub_categoria": "Jaggermeister",
    "items": [
      {
        "name": "Jagger julep",
        "detail": "Jagger - menta - azucar negra - dash limon - jugo de naranja o pomelo",
        "price": 5000
      },
      {
        "name": "Jaggerbull",
        "detail": "Jagger + Red Bull",
        "price": 6500
      },
      {
        "name": "Applelime jagger",
        "detail": "Jagger - manzana - lima macerados - jugo de manzana",
        "price": 5000
      }
    ]
  },
  {
    "sub_categoria": "Absolut",
    "items": [
      {
        "name": "Raspberri Collins",
        "detail": "Absolut Raspberri - Almibar - Jugo de Limon - Frutos Rojos - Soda",
        "price": 5000
      },
      {
        "name": "Mandrinoska",
        "detail": "Absolut Mandarina - Azucar - Rodaja de Naranja",
        "price": 5000
      },
      {
        "name": "Pears Limonade",
        "detail": "Absolut Pears - Sprite - Limon",
        "price": 5000
      },
      {
        "name": "Vainilla Cola",
        "detail": "Absolut Vainilla - Coca Cola- Limon",
        "price": 5000
      },
      {
        "name": "Apeach Tonic",
        "detail": "Absolut Apeach - Tonica - Lima",
        "price": 5000
      },
      {
        "name": "Mango Mojito",
        "detail": "Absolut mango - Menta - Limón - Azúcar - Soda",
        "price": 5000
      },
      {
        "name": "Absolut + Speed",
        "detail": "",
        "price": 5500
      },
      {
        "name": "Absolut + Red Bull",
        "detail": "",
        "price": 6000
      }
    ]
  },
  {
    "sub_categoria": "Bebida S/Alcohol",
    "items": [
      {
        "name": "Lata linea Coca Cola",
        "detail": "",
        "price": 1500
      },
      {
        "name": "Lata paso de los toros",
        "detail": "",
        "price": 1500
      },
      {
        "name": "Agua c/s gas",
        "detail": "",
        "price": 1500
      },
      {
        "name": "Aquairus",
        "detail": "",
        "price": 1500
      },
      {
        "name": "Limonada clasica",
        "detail": "Menta - Limon - Azucar - Agua",
        "price": 1500
      },
      {
        "name": "Limonada de Maracuya",
        "detail": "",
        "price": 2500
      },
      {
        "name": "Limonada de Frutos Rojos",
        "detail": "",
        "price": 2500
      },
      {
        "name": "Limonada",
        "detail": "Shaken de jugo de naranja, pulpa de maracuya, almibar y jugo de naranja",
        "price": 2500
      },
      {
        "name": "Refresh",
        "detail": "Lima, pepino y gaseosa lima",
        "price": 2000
      },
      {
        "name": "Mix de Citricos con Frutos Rojos",
        "detail": "",
        "price": 2500
      }
    ]
  },
  {
    "sub_categoria": "Espumantes",
    "items": [
      {
        "name": "Chandon Brut Nature 750cc",
        "detail": "",
        "price": 15000
      },
      {
        "name": "Chandon Extra Brut 750cc/187cc",
        "detail": "",
        "price": 15000
      },
      {
        "name": "Chandon Delice 750cc/187cc",
        "detail": "",
        "price": 15000
      },
      {
        "name": "Chandon Rose 750cc/187cc",
        "detail": "",
        "price": 15000
      },
      {
        "name": "Chandon Aperitif 750cc/187cc",
        "detail": "",
        "price": 15000
      },
      {
        "name": "MUMM",
        "detail": "",
        "price": 10000
      }
    ]
  },
  {
    "sub_categoria": "Vinos Tintos",
    "items": [
      {
        "name": "Siempre Tengo un Plan B",
        "detail": "",
        "price": 5500
      },
      {
        "name": "Tucumen Reserva Malbec",
        "detail": "",
        "price": 6000
      },
      {
        "name": "4000 Malbec Blue",
        "detail": "",
        "price": 7000
      },
      {
        "name": "Don Bicho Ravera Wines",
        "detail": "Organicos & Naturales",
        "price": 7000
      }
    ]
  },
  {
    "sub_categoria": "Vinos Blancos",
    "items": [
      {
        "name": "Malabarista espumante dulce",
        "detail": "",
        "price": 6000
      },
      {
        "name": "Finca Gabriel Dulce",
        "detail": "",
        "price": 6000
      },
      {
        "name": "Guason espumante dulce/dulce",
        "detail": "",
        "price": 6000
      },
      {
        "name": "Finca Gabriel rose Dulce",
        "detail": "Dulce",
        "price": 6000
      }
    ]
  }
]}


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(uploadProducts(allData));
  },[])
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
