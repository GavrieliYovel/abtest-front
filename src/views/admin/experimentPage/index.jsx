
// Chakra imports
import {
    Box, useColorModeValue, Input, Text, List, ListItem, Button, FormControl, FormLabel
} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";

import Cell from "./components/cell";
import Chart from "./components/chart";
import axios from "axios";

import {Link, useLocation} from 'react-router-dom';

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

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const query = useQuery();
    const id = query.get("id");

    const [experiment, setExperiment] = useState({});

    const getExperimentById = (id) => {
        axios.get(`https://core-team-final-assignment.onrender.com/growth/experiment/${id}`)
            .then(async response => {
                if (response.status === 200) {
                    const temp = {...response.data};
                    temp["keys"] = Object.keys(response.data?.customAttributes);
                    setExperiment(temp);
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
                    <Cell title={"Traffic Control"} value={experiment?.trafficPercentage + "%"}></Cell>
                    <Cell title={"Start Date"} value={datetimeLocal(experiment.duration?.startTime)}></Cell>
                    <Cell title={"End Date"} value={datetimeLocal(experiment.duration?.endTime)}></Cell>
                </Box>
                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Test Attributes</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                     boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                    <Cell title={"Location"} value={experiment.testAttributes?.location}></Cell>
                    <Cell title={"Device"} value={experiment.testAttributes?.device}></Cell>
                    <Cell title={"Browser"} value={experiment.testAttributes?.browser}></Cell>
                </Box>

                {
                    experiment?.customAttributes ?
                        <Box w={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Custom Attributes</Text>
                            <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                                 boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                                {
                                    experiment.keys?.map((attributeKey, index) => (
                                        <Cell key={index} title={attributeKey} value={experiment?.customAttributes[attributeKey]} />
                                    ))
                                }
                            </Box>
                        </Box>
                        : <></>
                }

                {
                    experiment.type === "a-b" ?
                        <Box w={"100%"} display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                            <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Variants</Text>
                            <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                                 boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                                <Cell title={"Variant A"} value={experiment.variantsAB?.A}></Cell>
                                <Cell title={"Variant B"} value={experiment.variantsAB?.B}></Cell>
                                <Cell title={"Default"} value={experiment.variantsAB?.C}></Cell>
                            </Box>
                        </Box>
                        :
                            <></>
                }

                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Goals</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md" boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}>
                    {
                        experiment.goals?.map( (goal, index) => (
                            <Cell key={index} id={goal._id} title={"Goal " + (index + 1)} value={goal.name}></Cell>
                        ))
                    }
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

