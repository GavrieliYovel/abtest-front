
// Chakra imports
import {
    Box, useColorModeValue, Input, Text, List, ListItem, Button, FormControl, FormLabel
} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";

import Cell from "./components/cell";
import Chart from "./components/chart";
import axios from "axios";

import {Link, useLocation} from 'react-router-dom';
import Cookies from "js-cookie";

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const serverOrigin = "https://core-team-final-assignment.onrender.com";
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
    const jwt = Cookies.get("jwt");
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const query = useQuery();
    const id = query.get("id");

    const APIs = [serverOrigin+`/growth/experiment/${id}/requestPerAtt`, serverOrigin+`/growth/experiment/${id}/goal/:gid/variantSuccess`, serverOrigin+`/growth/experiment/${id}/variantExpose`];

    const terminate = ()  =>{
        axios.put(`${serverOrigin}/growth/experiment/${id}/terminate`, {
            headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }


    const [experiment, setExperiment] = useState({});
    const [Terminate, setTerminate] = useState(false);
    const [GoalsOps, setGoalsOps] = useState([]);
    const [Attributes, setAttribute] = useState([])

    const getExperimentById = (id) => {
        axios.get(`${serverOrigin}/growth/experiment/${id}`, {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                }
            }
            )
            .then(async response => {
                if (response.status === 200) {
                    const temp = {...response.data};
                    temp["keys"] = Object.keys(response.data?.customAttributes);
                    if (temp.type === "terminate")
                        setTerminate(true);

                    const goals = temp.goals.map(goal => ({label: goal.name, value: goal._id}));
                    setGoalsOps(goals);
                    setExperiment(temp);

                    const testAttributes= Object.keys(temp.testAttributes).map(key => ({
                        label: key,
                        value: key
                    }));

                    const customAttributes= Object.keys(temp.customAttributes).map(key => ({
                        label: key,
                        value: key
                    }));
                    setAttribute([...testAttributes, ...customAttributes]);
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
                    <Cell key={0} title={"Name"} value={experiment.name}></Cell>
                    <Cell key={1} title={"Type"} value={experiment.type}></Cell>
                    <Cell key={2} title={"Status"} value={experiment.status}></Cell>
                    <Cell key={3} title={"Traffic Control"} value={experiment?.trafficPercentage + "%"}></Cell>
                    <Cell key={4} title={"Start Date"} value={datetimeLocal(experiment.duration?.startTime)}></Cell>
                    <Cell key={5} title={"End Date"} value={datetimeLocal(experiment.duration?.endTime)}></Cell>
                </Box>
                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Test Attributes</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md"
                     boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
                    <Cell key={0} title={"Location"} value={experiment.testAttributes?.location}></Cell>
                    <Cell key={1} title={"Device"} value={experiment.testAttributes?.device}></Cell>
                    <Cell key={3} title={"Browser"} value={experiment.testAttributes?.browser}></Cell>
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
                                <Cell key={0} title={"Variant A"} value={experiment.variantsAB?.A}></Cell>
                                <Cell key={1} title={"Variant B"} value={experiment.variantsAB?.B}></Cell>
                                <Cell key={2} title={"Default"} value={experiment.variantsAB?.C}></Cell>
                            </Box>
                        </Box>
                        :
                            <></>
                }

                <Text color={"#2B3674"} marginY={"10px"} fontSize={"20px"} fontWeight="bold">Goals</Text>
                <Box w="90%" display={'flex'} justifyContent={"center"} flexWrap={"wrap"} borderRadius="md" boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}>
                    {
                        experiment.goals?.map( (goal, index) => (
                            <Cell key={index} id={goal._id} title={goal.name} value={"Goal " + (index + 1)}></Cell>
                        ))
                    }
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} w={"90%"}>
                    <Chart selectOptions={Attributes} name={"Requests per attribute"} path={APIs[0]} ops={"attribute"} type={experiment.type} label={["first","second", "third"]}></Chart>
                    <Chart selectOptions={GoalsOps} name={"Goal reached"} path={APIs[1]} ops={"goal"} type={experiment.type} label={ experiment.type === "a-b" ? ["A", "B", "C"] : ["ON", "OFF"]}></Chart>
                    <Chart name={"Variant expose"} path={APIs[2]} type={experiment.type} label={ experiment.type === "a-b" ? ["A", "B", "C"] : ["ON", "OFF"]}></Chart>
                </Box>
                <Box marginY={"15px"} display={"flex"} justifyContent={"center"} w={"100%"}>
                    <Link to={"/admin/editExperiment?id=" + experiment._id}>
                        <Button variant="brand" margin={"5px"}>Edit Details</Button>
                    </Link>
                    {
                        Terminate ?
                            <Button variant="brand" margin={"5px"} onClick={terminate} disabled={true}>Terminated</Button>
                        :
                            <Button variant="brand" margin={"5px"} onClick={terminate} >Terminate</Button>
                        // experiment.status === "terminate" ?
                        //     <Button variant="brand" margin={"5px"} onClick={terminate} disabled={true}>Terminated</Button>
                        // :
                        //     <Button variant="brand" margin={"5px"} onClick={terminate} >Terminate</Button>
                    }

                </Box>
            </Box>

        </Box>
    );
}

