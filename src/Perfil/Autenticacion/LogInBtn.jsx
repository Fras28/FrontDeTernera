import React from "react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const LogInBtn = () => {
  return (
    <Button
      as={RouterLink}
      to="/login"
      // colorScheme="blue"
      style={styles}
    >
      Identificarte
    </Button>
  );
};

export default LogInBtn;


const styles = {
  borderRadius:"16px",
  backgroundColor :"#CA0017",
  color:"white",
  width:"328px",
  padding:"12px 24px",
  height:"48px"
}