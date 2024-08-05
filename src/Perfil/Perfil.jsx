import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useColorModeValue,
  Button,
  VStack,
} from '@chakra-ui/react';
import { CloseIcon, SmallCloseIcon } from '@chakra-ui/icons';
import TopNav from '../Landing/logoTop';
import BlackBox from '../Landing/InfoTopBox';
import BottomNav from '../Landing/BottomNav';
import { NavLink } from 'react-router-dom';
import LogInBtn from './Autenticacion/LogInBtn';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutUser } from '../Redux/Slice';

export default function UserProfile() {
const dispatch = useDispatch();
const {user} = useSelector(state=> state)

const Arrow = (<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.15 6.99952H1C0.716667 6.99952 0.479167 6.90369 0.2875 6.71202C0.0958333 6.52036 0 6.28286 0 5.99952C0 5.71619 0.0958333 5.47869 0.2875 5.28702C0.479167 5.09536 0.716667 4.99952 1 4.99952H12.15L9.3 2.14952C9.1 1.94952 9.00417 1.71619 9.0125 1.44952C9.02083 1.18286 9.11667 0.949523 9.3 0.749523C9.5 0.549523 9.7375 0.445357 10.0125 0.437023C10.2875 0.42869 10.525 0.524523 10.725 0.724523L15.3 5.29952C15.4 5.39952 15.4708 5.50786 15.5125 5.62452C15.5542 5.74119 15.575 5.86619 15.575 5.99952C15.575 6.13286 15.5542 6.25786 15.5125 6.37452C15.4708 6.49119 15.4 6.59952 15.3 6.69952L10.725 11.2745C10.525 11.4745 10.2875 11.5704 10.0125 11.562C9.7375 11.5537 9.5 11.4495 9.3 11.2495C9.11667 11.0495 9.02083 10.8162 9.0125 10.5495C9.00417 10.2829 9.1 10.0495 9.3 9.84952L12.15 6.99952Z" fill="#1C1B1F"/>
  </svg>
  )

const handleLogOut = ()=>{
  dispatch(logoutUser())
}


  return (
    <>
    <TopNav/>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      display={"flex"}
      flexDir={"column"}
      padding={"1rem"}
      justifyContent={"flex-start"}
      gap={"1.5rem"}
      >
    <BlackBox titulo={"Mi Perfil"} info={"Podrás ver el estado de tus pedidos y gestionar tu información personal"}  />
{ !user ?

    <LogInBtn/> :
      <VStack w={"100%"}>

        <Button as={NavLink} to={"/PersonalData"} border={"solid black 2px"} width="100%" display={"flex"} justifyContent={"space-between"} borderRadius={"24px"} height={"70px"}>Datos personales {Arrow}</Button>
        <Button as={NavLink} to={"/Pedidos"} border={"solid black 2px"} width="100%" display={"flex"} justifyContent={"space-between"} borderRadius={"24px"} height={"70px"}>Pedidos {Arrow}</Button>
        <Button onClick={handleLogOut} border={"solid black 2px"} width="100%" display={"flex"} justifyContent={"space-between"} borderRadius={"24px"} height={"70px"}>Log Out <CloseIcon/></Button>
     
      </VStack>
}
    </Flex>
    <BottomNav/>
    </>
  );
}

{/* <Stack
  spacing={4}
  w={'full'}
  maxW={'md'}
  bg={useColorModeValue('white', 'gray.700')}
  rounded={'xl'}
  boxShadow={'lg'}
  p={6}
  my={12}>
  <Center>
    <Avatar size="xl" src="https://bit.ly/sage-adebayo">
      <AvatarBadge
        as={IconButton}
        size="sm"
        rounded="full"
        top="-10px"
        colorScheme="red"
        aria-label="remove Image"
        icon={<SmallCloseIcon />}
      />
    </Avatar>
  </Center>
  <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
    John Doe
  </Heading>
  <Text fontSize="lg" color="gray.600">
    john.doe@example.com
  </Text>
  <Text fontSize="lg" color="gray.600">
    +1234567890
  </Text>
  <Text fontSize="lg" color="gray.600">
    123 Main St, City, Country
  </Text>
</Stack> */}