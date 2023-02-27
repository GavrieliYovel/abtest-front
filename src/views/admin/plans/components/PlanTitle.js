import React from "react";
import {Flex, Text} from "@chakra-ui/react";


const PlanTitle = (props) => {
    const {
        children,
    } = props;

    return (
        <Flex justify="center">
            <Text fontSize='4xl'>{children}</Text>
        </Flex>
    )
}

export default PlanTitle
