
// Chakra imports
import {
    Box, useColorModeValue, Input, Text, List, ListItem, Button, FormControl, FormLabel
} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";
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

import Cell from "./components/cell";
import Chart from "./components/chart";
import axios from "axios";

import { Link } from 'react-router-dom';

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function datetimeLocal(datetime) {
    if (!datetime)
        return "";
    const sz = datetime.length;
    datetime = datetime.replaceAt(sz-5, '.');
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toLocaleString('en-GB', { timeZone: 'UTC' });
}

export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [experiment, setExperiment] = useState({});
    const id = "63b9f9a3e95872dcba3442b6";
    const getExperimentById = (id) => {
        axios.get(`https://core-team-final-assignment.onrender.com/growth/experiment/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setExperiment(response.data);
                }
            })
            .catch(err => {
                    console.log(err);
                }
            )
    }
    useEffect(() => {
        getExperimentById(id)
    }, []);

    return (
        <Box display={'flex'} justifyContent={"center"} pt={{base: "130px", md: "80px", xl: "80px"}}>

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} bg='white' w="85%" p={4} borderRadius="md">
                <Text marginY={"10px"} fontSize={"20px"} fontWeight="bold" color={"#2B3674"}>Description</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                     boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                    <Cell title={"Name"} value={experiment.name}></Cell>
                    <Cell title={"Type"} value={experiment.type}></Cell>
                    <Cell title={"Status"} value={experiment.status}></Cell>
                    <Cell title={"Traffic Control"} value={experiment?.traffic_percentage + "%"}></Cell>
                    <Cell title={"Start Date"} value={datetimeLocal(experiment.duration?.start_time)}></Cell>
                    <Cell title={"End Date"} value={datetimeLocal(experiment.duration?.end_time)}></Cell>
                </Box>
                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Test Attributes</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                     boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                    <Cell title={"Location"} value={experiment.test_attributes?.location}></Cell>
                    <Cell title={"Device"} value={experiment.test_attributes?.device}></Cell>
                    <Cell title={"Browser"} value={experiment.test_attributes?.browser}></Cell>
                </Box>

                {
                    experiment.type === "a-b" ?
                        <Box w={"100%"} display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                            <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Variants</Text>
                            <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                                 boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                                <Cell title={"Variant A"} value={experiment.variants_ab?.A}></Cell>
                                <Cell title={"Variant B"} value={experiment.variants_ab?.B}></Cell>
                                <Cell title={"Default"} value={experiment.variants_ab?.C}></Cell>
                            </Box>
                        </Box>
                        :
                            <></>
                }

                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Goals</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                     boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                    <Cell title={"Goal 1"} value={"Item Bought"}></Cell>
                    <Cell title={"Goal 2"} value={"Clicked"}></Cell>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} w={"90%"}>
                    <Chart></Chart>
                    <Chart></Chart>
                    <Chart></Chart>
                </Box>
                <Box marginY={"15px"} display={"flex"} justifyContent={"center"} w={"100%"}>
                    <Link to={"/admin/editExperiment?id=" + experiment._id}>
                        <Button variant="brand" margin={"5px"}>Edit Details</Button>
                    </Link>
                    <Button variant="brand" margin={"5px"}>Terminate</Button>
                </Box>
            </Box>

        </Box>
    );
}
