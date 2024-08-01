import React from "react";
import BlackBox from "../Landing/InfoTopBox";
import { Input } from "@chakra-ui/react";

const PersonalDataForm = () => {
  return (

      <div className="flex items-center mb-6" style={{margin:"1rem"}}>
        <BlackBox
          showBackButton={true}
          titulo="Datos personales"
          info="Estos son los datos que usaremos a la ora de facturar y enviar tu pedido"
        />

      <form
        className="space-y-4"
        style={{ display: "flex", flexDirection: "column", gap:"1rem", marginTop:"1rem" }}
      >
        <label htmlFor="" style={styles.label}>Nombre</label>
        <Input type="text"  style={styles.input}  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}/>
        <label htmlFor="" style={styles.label}>Apellido</label>
        <Input type="text"  style={styles.input}  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}/>
        <label htmlFor="" style={styles.label}>Dirección de entrega</label>
        <Input type="text" style={styles.input}  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }} />
        <label htmlFor="" style={styles.label}>Telefono</label>
        <Input type="text"  style={styles.input}  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}/>
        <label htmlFor="" style={styles.label}>Correo electrónico</label>
        <Input type="text" style={styles.input}   _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}/>
      </form>
    </div>
  );
};

export default PersonalDataForm;

const styles ={
    label:{
        fontWeight:"bold",
        textAlign:"left",
        paddingLeft:".5rem"
    },
    input:{
        backgroundColor:"#F2F2F2", 
        borderRadius:"12px",
         padding:".5rem",
         paddingLeft:"1rem",
         fontWeight:"500"
    }

}