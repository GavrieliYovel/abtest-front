import React from "react";

// Chakra imports
import {Flex, Progress, Text} from "@chakra-ui/react";


export default function ProgressInfo(props) {
    return (
        <Flex>
            <Text width={10} color={"#2B3674"}>{props.label}</Text>
            <Text width={12} color={"#2B3674"}>{props.percent}%</Text>
            <Progress
                marginTop={"auto"}
                marginBottom={"auto"}
                variant='table'
                colorScheme='brandScheme'
                h='8px'
                w='108px'
                value={props.percent}
            />
        </Flex>
    );
}