import React, {useState} from "react";

// Chakra imports
import {Box, Text} from "@chakra-ui/react";


export default function Cell(props) {
    const { ...rest } = props;
    return (
        <Box marginY={"10px"} w={"30%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>
            <Text color={"#2B3674"} >{rest.title}</Text>
            <Box w={"70%"} display={'flex'} flexWrap={"wrap"} justifyContent={"center"}>
                {
                    typeof rest.value === "string" ? <Text marginX={"5px"} color={"#A3AED0"}>{rest.value}</Text> : rest.value?.map((value) => (
                        <Text marginX={"5px"} color={"#A3AED0"}>{value}</Text>
                    ))
                }
            </Box>
        </Box>
    );
}