// Chakra imports
import {Box, Flex} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function AuthIllustration(props) {
    const { children } = props;
    // Chakra color mode
    return (
        <Flex position="relative" h="max-content">
            <Flex
                h={{
                    sm: 'initial',
                    md: 'unset',
                    lg: '100vh',
                    xl: '97vh'
                }}
                mx="auto"
                pt={{ sm: '50px', md: '0px' }}
                px={{ lg: '30px', xl: '0px' }}
                ps={{ xl: '70px' }}
                justifyContent="start"
                w='36%'
                direction="column"
            >
                <Box
                    mt={{ base: "40px", md: "14vh" }}
                    display="flex"
                    alignItems="center"
                    justifyContent='center'
                    flexDirection="column"
                    bg='white'
                    w="100%"
                    borderRadius='20px'
                    border='0px'
                    boxShadow='0px 0px 13px 1px rgba(0,0,0,0.25)'
                    p={4}
                >
                {children}
                </Box>
            </Flex>
        </Flex>
    );
}
// PROPS

AuthIllustration.propTypes = {
    illustrationBackground: PropTypes.string,
    image: PropTypes.any
};

export default AuthIllustration;
