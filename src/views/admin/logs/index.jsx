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

import React, {useEffect} from "react";



const moment = require('moment');
export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [value, setValue] = React.useState("");
    const [logs, setLogs] = React.useState([]);
    const [clicked, setClicked] = React.useState("")
    const [data, setData] = React.useState([]);


    const getLogs = () => {
        fetch("https://core-team-final-assignment.onrender.com/logger")
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLogs(data);
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getLogs();
    }, [])
    const handleChange = (event) => {
        if (clicked === '') {
            setValue(event.target.value);
            let searchLog = data.filter(data => data.details.includes(event.target.value));
            setLogs(searchLog);
        } else {
            setValue(event.target.value);
            let searchLog = data.filter(data => data.details.includes(event.target.value) && data.level === clicked);
            setLogs(searchLog);
        }

    }

    const handleClick = (level) => {
        if (level === 'reset') {
            setValue('');
            setLogs(data);
            setClicked("");
        } else if (value === '') {
            let searchLog = data.filter(data => data.level === level);
            setClicked(level);
            setLogs(searchLog);
        } else {
            let searchLog = data.filter(data => data.details.includes(value) && data.level === clicked);
            setClicked(level);
            setLogs(searchLog);
        }
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box bg='white' w="25%" p={4} borderRadius="md">
                <Text>Search:</Text>
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter Here"
                    size="sm"
                    borderRadius="10px"
                />
            </Box>
            <Box marginTop='25px' marginBottom='25px'>
                <Button variant="brand" onClick={() => handleClick('info')}>Info</Button>
                <Button marginLeft='10px' variant="brand" onClick={() => handleClick('debug')}>Debug</Button>
                <Button marginLeft='10px' variant="brand" onClick={() => handleClick('error')}>Error</Button>
                <Button marginLeft='10px' variant="brand" onClick={() => handleClick('reset')}>Reset</Button>

            </Box>

            <Text fontWeight='bold'>Number of logs: {logs.length}</Text>
            <Box overflowY={"scroll"} marginTop='25px' bg='#1F2733' p={4} w="75%" h='60vh' borderRadius="md"
                 color={"white"}>

                <List>
                    {logs.length > 0 && logs.map((log) =>
                        <ListItem>{log.level + ': ' + moment(log.date).format('DD-MM-YYYY hh:mm:ss') + ' -> ' + log.details}</ListItem>)}
                </List>
            </Box>

        </Box>
    );
}
