import React from "react";
import {Button, Flex, Text} from '@chakra-ui/react'


const PlanButtons = (props) => {
    const {
        plan,
    } = props;


    const renderFreeButtons = () => {
        return (
            <Flex justify={"center"} direction={"column"} mx={'50px'} mt={"50px"}>
                <Button size={'lg'} variant='brand'>Monthly</Button>
                <Text mt={"10px"} align={"center"} fontSize='xl'>Free</Text>
            </Flex>
        )
    }

    const renderPaidButtons = () => {
        return (
            <Flex direction={"row"} justify={"space-between"} mx={'15px'}>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'} variant='brand'>Monthly</Button>
                    <Text mt={"10px"} ml={"8%"} fontSize='xl'>${plan.prices.month?.amount}/Month</Text>
                </Flex>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'} variant='brand'>Annual</Button>
                    <Text mt={"10px"} ml={"8%"} fontSize='xl'>${plan.prices.year?.amount}/Year</Text>
                </Flex>
            </Flex>
        )
    }
    return plan.name == 'Free' ? renderFreeButtons() : renderPaidButtons();
}

export default PlanButtons
