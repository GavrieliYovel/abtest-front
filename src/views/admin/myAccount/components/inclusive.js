// Chakra imports
import {
    Box,
    Button, extendTheme,
    Flex, FormLabel, GridItem, HStack,
    Icon, IconButton, Input, SimpleGrid,
    Text,
    useColorModeValue, useDisclosure,
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
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
export default function Inclusive(props) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const { toggle, onClickFunction, func } = props;
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

    const handleToggle = () => {
        func();
        onClose()
    }

    return (
        <>
        <HStack spacing='24px'>
            <Box>
        <Card p='20px' direction='column' w='100%' marginY={"20px"}>
            <HStack spacing='24px'>

                <Box>
                    <Button onClick={onOpen}
                            bg={toggle ? 'brand.500' : 'white'}
                            color={toggle ? 'white' : 'black'}
                            border={toggle ? 'none' : '1px solid black'}>
                        {buttonText}
                    </Button>

                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader textAlign='center' fontSize='lg' fontWeight='bold'>
                                    Exclusive/Inclusive
                                </AlertDialogHeader>

                                <AlertDialogBody textAlign='center'>
                                    Are you sure ?  pressing on the OK button will {buttonText}
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button w="40%" marginY="20px" marginX="20px" ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="brand" w="40%" marginY="20px" marginX="20px" onClick={()=>{handleToggle()}} ml={3}>
                                        Ok
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Box>
            </HStack>
        </Card>

            </Box>

            </HStack>
   </>
    );
}
