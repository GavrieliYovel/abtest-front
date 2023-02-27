import React, {useState} from "react";

// Chakra imports
import {Box, Text} from "@chakra-ui/react";
import DailyTraffic from "./DailyTraffic";
import {goalReachedOptions} from "../variables/columnsData";

export default function Chart(props) {


    const ops = {...goalReachedOptions};
    ops.xaxis.categories =  props.label

    return (
        <Box display={"flex"} justifyContent="space-between" marginTop={"20px"} w={"30%"} borderRadius="md"
             boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
            <DailyTraffic
                data={props}
                selectOptions={props.selectOptions}
                chartOptions={ops}
            />
        </Box>
    );
}