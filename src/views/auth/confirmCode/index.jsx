import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// Chakra imports
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import DefaultAuth from 'layouts/auth/Default';
// Assets
import useApi from 'customHooks/useApi';

function ConfirmCode() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
    const textColorBrand = useColorModeValue('brand.500', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');
    const [api, loading] = useApi();
    return (
        <DefaultAuth>
            <Flex
                display="flex"
                justifyContent="center"
                // maxW={{ base: '100%', md: 'max-content' }}
                // w="100%"
                mx={{ base: 'auto', lg: '0px' }}
                me="auto"
                h="100%"
                alignItems="center"
                textAlign="center"
                px={{ base: '25px', md: '0px' }}
                flexDirection="column"
            >
                <Box position="relative" justifyContent="center">
                    <Heading color={textColor} fontSize="32px" mb="24px">
                        {success ? 'Email with reset instruction was sent!' : 'Enter email to get confirm code'}
                    </Heading>
                </Box>
                <Flex
                    zIndex="2"
                    direction="column"
                    // w={{ base: '100%', md: '420px' }}
                    // maxW="100%"
                    background="transparent"
                    borderRadius="15px"
                    mx={{ base: 'auto', lg: 'unset' }}
                    me="auto"
                    // mb={{ base: '20px', md: 'auto' }}
                >
                    {!success && (
                        <>
                            <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
                                Enter your email to get confirm code!
                            </Text>

                            <FormControl>
                                <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                    Email<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Input
                                    isRequired={true}
                                    variant="auth"
                                    fontSize="sm"
                                    ms={{ base: '0px', md: '0px' }}
                                    type="email"
                                    placeholder="example@gmail.com"
                                    mb="24px"
                                    fontWeight="500"
                                    size="lg"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Box justifyContent="center" display="flex">
                                    <Button
                                        onClick={async () => {
                                            const { data, errors } = await api.sendCode(email);
                                            if (errors) {
                                                setError(errors);
                                                setSuccess(false);
                                            }
                                            if (data) {
                                                setError('');
                                                setSuccess(true);
                                                setEmail('');
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
                                        {loading ? 'Sending reset email' : 'Send Code'}
                                    </Button>
                                </Box>
                            </FormControl>
                        </>
                    )}
                    {error && <Text color="red">{error}</Text>}
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" maxW="100%" mt="0px">
                        <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                            {success ? 'Return to' : 'Remember password?'}
                            <NavLink to="/auth/sign-in">
                                <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                                    Sign in!
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default ConfirmCode;
