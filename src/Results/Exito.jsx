import React from "react";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import BlackBox from "../Landing/InfoTopBox";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";
import { color } from "framer-motion";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

export default function Exito() {
  const pedidoActual = useSelector((state) => state.pedidoActual);
  const { id } = useParams();
  const Arrow = (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.15 6.99952H1C0.716667 6.99952 0.479167 6.90369 0.2875 6.71202C0.0958333 6.52036 0 6.28286 0 5.99952C0 5.71619 0.0958333 5.47869 0.2875 5.28702C0.479167 5.09536 0.716667 4.99952 1 4.99952H12.15L9.3 2.14952C9.1 1.94952 9.00417 1.71619 9.0125 1.44952C9.02083 1.18286 9.11667 0.949523 9.3 0.749523C9.5 0.549523 9.7375 0.445357 10.0125 0.437023C10.2875 0.42869 10.525 0.524523 10.725 0.724523L15.3 5.29952C15.4 5.39952 15.4708 5.50786 15.5125 5.62452C15.5542 5.74119 15.575 5.86619 15.575 5.99952C15.575 6.13286 15.5542 6.25786 15.5125 6.37452C15.4708 6.49119 15.4 6.59952 15.3 6.69952L10.725 11.2745C10.525 11.4745 10.2875 11.5704 10.0125 11.562C9.7375 11.5537 9.5 11.4495 9.3 11.2495C9.11667 11.0495 9.02083 10.8162 9.0125 10.5495C9.00417 10.2829 9.1 10.0495 9.3 9.84952L12.15 6.99952Z"
        fill="#1C1B1F"
      />
    </svg>
  );
  const Error = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14C11 13.7167 10.9042 13.4792 10.7125 13.2875C10.5208 13.0958 10.2833 13 10 13C9.71667 13 9.47917 13.0958 9.2875 13.2875C9.09583 13.4792 9 13.7167 9 14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15ZM9 11H11V5H9V11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
        fill="#010101"
      />
    </svg>
  );
  return (
    <VStack textAlign="center" py={10} px={6} height="100vh">
      <BlackBox
        titulo={`Pedido realizado `}
        info={`Tu número de pedido es #${id}. Si ya eres cliente, podrás ver el detalle y estado del mismo en la sección “Mis pedidos”`}
      />
      <Text style={styles.proximo}>Próximos pasos</Text>
      <Text style={styles.text}>
        En breve empezaremos a preparar tu pedido y te enviaremos el link de
        pago con su precio final.
      </Text>

      <HStack bgColor={"#F2F2F2"} borderRadius={"16px"} padding={"12px"}>
        {Error}
        <Text style={styles.text2}>
          Recordá que tenés 24h para realizar el pago o el pedido quedará
          cancelado.
        </Text>
      </HStack>
      <Text style={styles.text}>
        En breve empezaremos a preparar tu pedido y te enviaremos el link de
        pago con su precio final.
      </Text>
      <Button
        as={NavLink}
        to={"/UserProfile"}
        border={"solid black 2px"}
        width="100%"
        display={"flex"}
        justifyContent={"space-between"}
        borderRadius={"24px"}
        height={"70px"}
      >
        Perfil {Arrow}
      </Button>
    </VStack>
  );
}

const styles = {
  proximo: {
    display: "flex",
    fontFamily: "Segoe UI",
    fontSize: "24px",
    fontWeigth: "bold",
    textAlign: "left",
    width: "100%",
  },
  text: {
    fontFamily: "Segoe UI",
    fontSize: "16px",
    textAlign: "left",
  },
  text2: {
    fontFamily: "Segoe UI",
    fontSize: "16px",
    fontWeigth: "bold",
    textAlign: "left",
  },
};
