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
import styled from 'styled-components';

export default function Inclusive(props) {
    const { toggle, onClickFunction } = props;

    const buttonText = toggle ? 'Switch to exclusive' : 'Switch to inclusive';
    const experimentText = toggle ? 'Inclusive Experiments' : 'Exclusive Experiments';


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

                <Box>
                    <Button
                        bg={toggle ? 'brand.500' : 'white'}
                        color={toggle ? 'white' : 'black'}
                        border={toggle ? 'none' : '1px solid black'}
                        onClick={onClickFunction}>
                        {buttonText}
                    </Button>
                </Box>
            </HStack>
        </Card>
            </Box>

            </HStack>
   </>
    );
}
