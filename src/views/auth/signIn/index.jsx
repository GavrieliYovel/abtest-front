import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/auth.png';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import useSignIn from 'customHooks/useLogin';
import useApi from 'customHooks/useApi';
import jwt_decode from 'jwt-decode';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' });
  const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' });
  const [show, setShow] = React.useState(false);
  const { signIn, authError, signInWithGoogle } = useContext(AuthContext);
  const { email, setEmail, password, setPassword } = useSignIn();
  const [api] = useApi();

  // useEffect(() => {
  //
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: '464592808185-trttmc5rbu2i1lurqk2k32qm5rvcctpm.apps.googleusercontent.com',
  //     callback: signInWithGoogle
  //   })
  //
  //   google.accounts.id.renderButton(
  //       document.getElementById('googleLogin'),
  //       {theme: 'outline', size: 'Large', shape:'pill'}
  //   );
  // },[]);


  const handleClick = () => setShow(!show);
  return (
      <DefaultAuth >
        <Flex
            maxW={{ base: '100%', md: 'max-content' }}
            // w="100%"
            mx={{ base: 'auto', lg: '0px' }}
            me="auto"
            h="100%"
            alignItems="start"
            justifyContent="center"
            mb={{ base: '30px', md: '60px' }}
            px={{ base: '25px', md: '0px' }}
            // mt={{ base: '40px', md: '8vh' }}
            flexDirection="column"
        >
          <Box w='100%' textAlign='center'>
            <Heading color={textColor} fontSize="32px" mb="20px">
              Sign In
            </Heading>
          </Box>
          <Flex
              zIndex="2"
              direction="column"
              w={{ base: '100%', md: '420px' }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: 'auto', lg: 'unset' }}
              me="auto"
              mb={{ base: '20px', md: 'auto' }}
          >
            <Button
                fontSize="sm"
                me="0px"
                mb="15px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bg={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
                onClick={async () => {
                  window.location.href = 'https://abtest-shenkar.onrender.com/auth/google';
                }}
            >
              <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
              Sign in with Google
            </Button>
            {/*<flex*/}
            {/*    id='googleLogin'*/}
            {/*    fontSize="sm"*/}
            {/*    me="0px"*/}
            {/*    mb="15px"*/}
            {/*    py="15px"*/}
            {/*    h="50px"*/}
            {/*    borderRadius="16px"*/}
            {/*    bg={googleBg}*/}
            {/*    color={googleText}*/}
            {/*    fontWeight="500"*/}
            {/*    _hover={googleHover}*/}
            {/*    _active={googleActive}*/}
            {/*    _focus={googleActive}>*/}
            {/*</flex>*/}
            <Button
                fontSize="sm"
                me="0px"
                mb="18px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bg={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
                onClick={async () => {
                  window.location.href = 'https://abtest-shenkar.onrender.com/auth/linkedin';
                }}
            >
              <Icon as={FaLinkedin} w="20px" h="20px" me="10px" />
              Sign in with Linkedin
            </Button>
            <Flex align="center" mb="25px">
              <HSeparator />
              <Text color="gray.400" mx="14px">
                or
              </Text>
              <HSeparator />
            </Flex>
              <Box TextAlign='center'>
                <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
                  Enter your email and password to sign in!
                </Text>
              </Box>
            <FormControl>
              <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  ms={{ base: '0px', md: '0px' }}
                  type="email"
                  placeholder="example@gmail.com"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={show ? 'text' : 'password'}
                    variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <NavLink to="/auth/forgot-password">
                  <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
                    Forgot password?
                  </Text>
                </NavLink>
              </Flex>
              {authError && (
                  <Text color="red" marginBottom="0.5rem">
                    {authError}
                  </Text>
              )}
              <Button
                  onClick={() => signIn({ email, password })}
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
              >
                Sign In
              </Button>
            </FormControl>
            <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="0px">
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Not registered yet?
                <NavLink to="/auth/sign-up">
                  <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                    Create an Account
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
  );
}

export default SignIn;
