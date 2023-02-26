import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import useApi from "customHooks/useApi";

function SignUp() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setsecPassword] = useState("");
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const { authError } = useContext(AuthContext);
  const [api, loading] = useApi();
  const history = useHistory();
  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "8vh" }}
        flexDirection="column"
      >
        <Box position="relative" justifyContent="center">
          <Heading color={textColor} fontSize="32px" mb="24px">
            {!success ? "Sign Up" : "Enter confirmation code"}
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
                      {!success && (
            <>
              <Box me="auto">
                <Text
                  mb="36px"
                  ms="4px"
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="md"
                >
                  Please enter your details to sign up
                </Text>
              </Box>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="mail simmmple"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  onChange={(e) => setName(e.target.value)}
                />
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="mail@simmmple.com"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Retype Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                    onChange={(e) => setsecPassword(e.target.value)}
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
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
                  onClick={async () => {
                    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
                    if (password !== secPassword) {
                      setError("passwords must be identical");
                      return;
                    }
                    if (!passwordRegex.test(password)) {
                      setError(
                        "Password must be at least 8 characters long and contain atleast one capital letter and atleast one number"
                      );
                      return;
                    }
                    const { data, errors } = await api.signUp({
                      name,
                      email,
                      password,
                      secPassword,
                    });
                    if (errors) {
                      setError(errors);
                      setSuccess(false);
                    }
                    if (data) {
                      setError("");
                      setSuccess(true);
                    }
                  }}
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Sign Up
                </Button>
                {/* {loading ? "Sending reset email" : ""} */}
              </FormControl>
            </>
          )}
          {success && (
            <>

              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                In order to complete the registration process,<br></br> a
                confirmation code has been sent to your email address
              </Text>

              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Confirmation Code<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="code"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  onChange={(e) => setCode(e.target.value)}
                />
                <Box justifyContent="center" display="flex">
                  <Button
                    onClick={async () => {
                      const { data, errors } = await api.verifyCode(
                       { name,
                        email,
                        password,
                        code}
                      );
                      if (errors) {
                        console.log({email});
                        setError(errors);
                        setSuccess(false);
                      }

                      if (data) {
                        console.log(data);
                        setError("");
                        setSuccess(true);
                        setEmail("");
                        history.push('/auth/sign-in');
                      }
                    }}
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="60%"
                    h="50"
                    mb="24px"
                    disabled={loading}
                  >
                    {loading ? "Sending reset email" : "Verify Code"}
                  </Button>
                </Box>
              </FormControl>
            </>
          )}

          {error && <Text color="red">{error}</Text>}
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
