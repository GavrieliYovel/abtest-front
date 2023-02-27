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
    Box, useColorModeValue, Input, Text, List, ListItem, Button, FormControl, FormLabel, useAccordion
} from "@chakra-ui/react";

import React, {useEffect} from "react";



const moment = require('moment');
export default function UserReports() {
    // Chakra Color Mode
    const [value, setValue] = React.useState("");
    const [dateValue, setDateValue] = React.useState("");
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

    const filterLogs = (data, value, clicked, dateValue) => {
        let searchLog = data;
        if (value !== '') {
            // searchLog = searchLog.filter(log => log.details.includes(value));
            searchLog = searchLog.filter(log => new RegExp(value).test(log.details));
        }

        if (clicked !== '') {
            searchLog = searchLog.filter(log => log.level === clicked);
        }

        if (dateValue !== '') {
            searchLog = searchLog.filter(log => moment(log.date).format('DD-MM-YYYY') === moment(dateValue).format('DD-MM-YYYY'));
        }
        setLogs(searchLog);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        filterLogs(data, event.target.value, clicked, dateValue);
    }

    const handleClick = (level) => {
        if (level === 'reset') {
            setValue('');
            setClicked('');
            setDateValue('');
            setLogs(data);
        } else {
            setClicked(level);
            filterLogs(data, value, level, dateValue);
        }
    }

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDateValue(selectedDate);
        filterLogs(data, value, clicked, selectedDate);
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box bg='white' w="25%" p={4} borderRadius="md">
                <FormLabel>Search</FormLabel>
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter Here"
                    size="sm"
                    borderRadius="10px"
                />
                <FormControl w="65%" marginY="10px">
                    <FormLabel>Date</FormLabel>
                    <Input type="Date"
                           placeholder="mm/dd/yyyy"
                           size="md"
                           borderRadius="10px"
                           value={dateValue}
                           onChange={handleDateChange}
                    />
                </FormControl>
                <Box display="flex" justifyContent="end">
                    <Button variant="brand" onClick={() => handleClick('reset')}>Reset</Button>
                </Box>
            </Box>
            <Box marginTop='25px' marginBottom='25px'>
                <Button variant="brand" onClick={() => handleClick('info')}>Info</Button>
                <Button marginLeft='10px' variant="brand" onClick={() => handleClick('debug')}>Debug</Button>
                <Button marginLeft='10px' variant="brand" onClick={() => handleClick('error')}>Error</Button>
            </Box>
            <Text fontWeight='bold'>Number of logs: {logs.length}</Text>
            <Box overflowY={"scroll"} marginTop='25px' bg='#1F2733' p={4} w="75%" h='50vh' borderRadius="md"
                 color={"white"}>

                <List>
                    {logs.length > 0 && logs.map((log) =>
                        <ListItem fontFamily="Courier" fontSize="14px">{log.level + ': ' + moment(log.date).format('DD-MM-YYYY hh:mm:ss') + ' -> ' + log.details}</ListItem>)}
                </List>
            </Box>

        </Box>
    );
}
