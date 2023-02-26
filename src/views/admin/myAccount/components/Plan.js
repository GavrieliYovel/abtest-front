// Chakra imports
import {
    Box,
    Button, ChakraProvider,
    Flex, FormLabel, GridItem, HStack,
    Icon, IconButton, Input, SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";

import {CheckIcon} from "@chakra-ui/icons";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            500: "#4318FF",
            600: "#01B574",
        },
    },
})


export default function Plan(props) {

    const { plan, feature1 , feature2,  feature3 } = props;

    // Chakra Color Mode

    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );
    return (
        <Card p='30px' direction='column'>
            <Text fontSize="20" fontWeight="bold" align={'center'}>{plan} </Text>
            <Flex marginTop={"30px"} alignItems={"center"}>
            <CheckIcon color={"green"}/>
            <Text fontSize="16" fontWeight="bold" marginLeft={"10px"}>{feature2} </Text>
            </Flex>
            <Flex marginTop={"17px"} alignItems={"center"}>
            <CheckIcon color={"green"}/>
            <Text fontSize="16" fontWeight="bold" marginLeft={"10px"}>{feature1} </Text>
            </Flex>
            <Flex marginTop={"17px"} alignItems={"center"}>
                <CheckIcon color={"green"}/>
                <Text fontSize="16" fontWeight="bold" marginLeft={"10px"}>{feature3} </Text>
            </Flex>
            <Box align={'center'}>
                <Button bg="brand.500" color={"white"} marginTop={"70px"}>Upgrade now!</Button>
            </Box>
        </Card>
    );
}
