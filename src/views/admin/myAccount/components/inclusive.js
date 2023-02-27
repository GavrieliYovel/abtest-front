// Chakra imports
import {
    Box,
    Button, extendTheme,
    Flex, FormLabel, GridItem, HStack,
    Icon, IconButton, Input, SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
} from "variables/charts";
import {AddIcon} from "@chakra-ui/icons";


export default function Inclusive(props) {
    const { toggle, onClickFunction } = props;

    let buttonText, experimentText;

    if (toggle) {
        buttonText = 'Switch to exclusive';
        experimentText = 'Inclusive Experiments';
    } else {
        buttonText = 'Switch to inclusive';
        experimentText = 'Exclusive Experiments';
    }


    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );

    const theme = extendTheme({
        colors: {
            brand: {
                500: "#4318FF",
            },
        },
    })

    return (
        <>
        <HStack spacing='24px'>
            <Box>
        <Card p='20px' direction='column' w='100%' marginY={"20px"}>
            <HStack spacing='24px'>
                <Box w='full'>
                    <Text fontSize="16" fontWeight="bold" color={"blue"}>{experimentText}</Text>
                </Box>
                <Box>
                    <Button bg='brand.500' color={'white'} onClick={onClickFunction}>{buttonText}</Button>
                </Box>
            </HStack>
        </Card>
            </Box>
            <Box>
    <Text color={"red"}>All experiments should be terminated</Text>
            </Box>
            </HStack>
   </>
    );
}
