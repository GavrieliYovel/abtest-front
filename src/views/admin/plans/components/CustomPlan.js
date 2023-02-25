import React from "react";
import {Button, Flex, Text} from "@chakra-ui/react";

const CustomPlan = () => {
    return (
        <Flex justify="center" mt={"30px"}>
            <Text fontSize='3xl'>Wish to make a custom plan?</Text>
            <Button size={'lg'} variant='brand' ml={"15px"}>Contact Us!</Button>
        </Flex>
    )
}

export default CustomPlan
