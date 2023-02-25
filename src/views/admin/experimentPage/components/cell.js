import React, {useState} from "react";

// Chakra imports
import {Box, Text} from "@chakra-ui/react";


export default function Cell(props) {
    const { ...rest } = props;
    return (
        <Box marginY={"10px"} w={"33%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
            <Text color={"#2B3674"} >{rest.title}</Text>
            <Text color={"#A3AED0"}>{rest.value}</Text>
        </Box>
    );
}