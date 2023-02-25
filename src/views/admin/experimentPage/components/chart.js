import React, {useState} from "react";

// Chakra imports
import {Box, Text} from "@chakra-ui/react";
import DailyTraffic from "./DailyTraffic";
import {goalReached, goalReachedOptions} from "../variables/columnsData";

export default function Chart(props) {
    const { ...rest } = props;
    return (
        <Box marginTop={"20px"} marginRight={"10px"} w={"30%"} borderRadius="md"
             boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}>
            <DailyTraffic
                name={"Goal reached %"}
                chartData={goalReached}
                chartOptions={goalReachedOptions}
            />
        </Box>
    );
}