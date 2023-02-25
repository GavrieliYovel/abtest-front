/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
    Box, useColorModeValue, Input, Text, List, ListItem, Button
} from "@chakra-ui/react";

import {useEffect, useState} from "react";
import Card from "../../../components/card/Card";
import {lighten} from "@chakra-ui/theme-tools";
import BarChart from "../../../components/charts/BarChart";
import {
    goalReached,
    goalReachedOptions,
    requestAttribute,
    requestAttributeOptions,
    variantExpose,
    variantExposeOptions
} from "./variables/columnsData";
import DailyTraffic from "./components/DailyTraffic";



const moment = require('moment');
export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


    return (
        <Box display={'flex'} justifyContent={"center"} pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} bg='white' w="85%" p={4} borderRadius="md">
                <Text marginY={"10px"} fontSize={"20px"}  fontWeight="bold" color={"#2B3674"} >Description</Text>
                <Box  w="85%" display={'flex'}  justifyContent={"center"} flexWrap={"wrap"}  borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Name</Text>
                        <Text color={"#A3AED0"}> AB Experiment</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Type</Text>
                        <Text color={"#A3AED0"}>AB-Test</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Status</Text>
                        <Text color={"#A3AED0"}>Active</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Traffic Control</Text>
                        <Text color={"#A3AED0"}>25%</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Start Date</Text>
                        <Text color={"#A3AED0"}>1-30-2023</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >End Date</Text>
                        <Text color={"#A3AED0"}>1-30-2024</Text>
                    </Box>
                </Box>
                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"}  fontWeight="bold">Test Attributes</Text>
                <Box  w="85%" display={'flex'}  justifyContent={"center"} flexWrap={"wrap"}  borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Location</Text>
                        <Text color={"#A3AED0"}> IL</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Device</Text>
                        <Text color={"#A3AED0"}>Mobile</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Browser</Text>
                        <Text color={"#A3AED0"}>Chrome</Text>
                    </Box>
                </Box>
                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"}  fontWeight="bold">Variants</Text>
                <Box  w="85%" display={'flex'}  justifyContent={"center"} flexWrap={"wrap"}  borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Variant A</Text>
                        <Text color={"#A3AED0"}>Blue</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Variant B</Text>
                        <Text color={"#A3AED0"}>Red</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Default</Text>
                        <Text color={"#A3AED0"}>Black</Text>
                    </Box>
                </Box>
                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"}  fontWeight="bold">Goals</Text>
                <Box  w="85%" display={'flex'}  justifyContent={"center"} flexWrap={"wrap"}  borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Goal 1</Text>
                        <Text color={"#A3AED0"}>Item Bought</Text>
                    </Box>
                    <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
                        <Text color={"#2B3674"} >Goal 2</Text>
                        <Text color={"#A3AED0"}>Clicked</Text>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-evenly"} w={"100%"}>
                    <Box marginTop={"20px"} marginRight={"10px"} w={"30%"} borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                        <DailyTraffic
                            name={"Request per attribute"}
                            chartData={ requestAttribute }
                            chartOptions={ requestAttributeOptions }
                        />
                    </Box>
                    <Box marginTop={"20px"} marginRight={"10px"} w={"30%"} borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                        <DailyTraffic
                            name={"Goal reached %"}
                            chartData={ goalReached }
                            chartOptions={ goalReachedOptions }
                        />
                    </Box>
                    <Box marginTop={"20px"} marginRight={"10px"} w={"30%"} borderRadius="md" boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'} >
                        <DailyTraffic
                            name={"Variant expose %"}
                            chartData={ variantExpose }
                            chartOptions={ variantExposeOptions }
                        />
                    </Box>
                </Box>
                <Box marginY={"15px"} display={"flex"} justifyContent={"space-evenly"} w={"100%"} >
                    <Button variant="brand">Edit Details</Button>
                    <Button variant="brand">Terminate</Button>
                </Box>
            </Box>
        </Box>
    );
}
