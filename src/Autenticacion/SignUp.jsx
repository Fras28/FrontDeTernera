import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Text,
  Link,
  useToast,
  Container,
  List,
  ListItem,
  ListIcon,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { registerUser } from '../Redux/Slice';
import BlackBox from '../Landing/InfoTopBox';

export default function SignupCard() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form validation states
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    special: true,
    uppercase: true,
    number: true
  });

  const dispatch = useDispatch();
  const toast = useToast();
  const status = useSelector((state) => state.allData.status);

  // Validation functions
  const validateName = (name) => name.trim().length > 0;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => {
    const errors = {
      length: password.length >= 8 && password.length <= 16,
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password)
    };
    setPasswordErrors(errors);
    return Object.values(errors).every(Boolean);
  };

  // Effect for real-time validation
  useEffect(() => {
    setIsFirstNameValid(firstName === '' || validateName(firstName));
    setIsLastNameValid(lastName === '' || validateName(lastName));
    setIsEmailValid(email === '' || validateEmail(email));
    setIsPasswordValid(password === '' || validatePassword(password));
    setIsConfirmPasswordValid(confirmPassword === '' || password === confirmPassword);
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation before submission
    const isFormValid = 
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword;

    if (!isFormValid) {
      toast({
        title: 'Error en el formulario',
        description: 'Por favor, corrija los campos marcados en rojo antes de enviar.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await dispatch(registerUser({
        username: `${firstName} ${lastName}`,
        email,
        password,
      })).unwrap();
      toast({
        title: 'Cuenta creada.',
        description: 'Hemos creado tu cuenta exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setRegisterSuccess(true);
    } catch (error) {
      toast({
        title: 'Error en el registro.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (registerSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxW="container.sm" pt={4}>
      <VStack spacing={6} align="stretch" bg="white" p={6} borderRadius="md" boxShadow="md">
        <BlackBox showBackButton={true} info={"Crea una cuenta de cliente y obtené todos nuestros beneficios."} titulo={"Registro"}/>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="firstName" isRequired isInvalid={!isFirstNameValid}>
              <FormLabel>Nombre</FormLabel>
              <Input
                style={{...styles.Input, borderColor: !isFirstNameValid ? 'red' : undefined}}
                placeholder="Ej: Juan" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
              />
              {!isFirstNameValid && <FormErrorMessage>El nombre es requerido</FormErrorMessage>}
            </FormControl>
            <FormControl id="lastName" isRequired isInvalid={!isLastNameValid}>
              <FormLabel>Apellido</FormLabel>
              <Input
                style={{...styles.Input, borderColor: !isLastNameValid ? 'red' : undefined}}
                placeholder="Ej: Martínez" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
              />
              {!isLastNameValid && <FormErrorMessage>El apellido es requerido</FormErrorMessage>}
            </FormControl>
            <FormControl id="email" isRequired isInvalid={!isEmailValid}>
              <FormLabel>Dirección de correo electrónico</FormLabel>
              <Input
                style={{...styles.Input, borderColor: !isEmailValid ? 'red' : undefined}}
                type="email" 
                placeholder="Ej: nombre.apellido@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && <FormErrorMessage>Ingrese un email válido</FormErrorMessage>}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!isPasswordValid}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  style={{...styles.Input, borderColor: !isPasswordValid ? 'red' : undefined}}
                  type={showPassword ? "text" : "password"}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <List spacing={2} mt={2} fontSize="sm" color="gray.600">
                <ListItem>
                  <ListIcon as={CheckIcon} color={passwordErrors.length ? "green.500" : "red.500"} />
                  Debe tener entre 8-16 caracteres.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color={passwordErrors.special ? "green.500" : "red.500"} />
                  Debe tener al menos un carácter especial (*, #, $, %, &, etc).
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color={passwordErrors.uppercase ? "green.500" : "red.500"} />
                  Debe tener al menos una mayúscula.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color={passwordErrors.number ? "green.500" : "red.500"} />
                  Debe tener al menos un número.
                </ListItem>
              </List>
            </FormControl>
            <FormControl id="confirmPassword" isRequired isInvalid={!isConfirmPasswordValid}>
              <FormLabel>Repetí la contraseña</FormLabel>
              <InputGroup>
                <Input
                  style={{...styles.Input, borderColor: !isConfirmPasswordValid ? 'red' : undefined}}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!isConfirmPasswordValid && <FormErrorMessage>Las contraseñas no coinciden</FormErrorMessage>}
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              width="full"
              isLoading={status === 'loading'}
              isDisabled={!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !firstName || !lastName || !email || !password || !confirmPassword}
            >
              Registrarme
            </Button>
          </VStack>
        </form>
        <Text align="center">
          ¿Ya tenés cuenta? <Link as={RouterLink} to="/login" color="red.500">Iniciá sesión</Link>
        </Text>
      </VStack>
    </Container>
  );
}

const styles = {
  Input: {
    borderRadius: "24px",
    backgroundColor: "#F2F2F2",
    width: "100%"
  }
};