import React from "react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SignInBtn = () => {
  return (
    <Button
      as={RouterLink}
      to="/Signup"
     style={styles}
    >
      Registrarte
    </Button>
  );
};

export default SignInBtn;
const styles = {
  borderRadius:"16px",
  backgroundColor :"#CA0017",
  color:"white",
  width:"100%",
  padding:"12px 24px"
}