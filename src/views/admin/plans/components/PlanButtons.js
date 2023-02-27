import React from "react";
import {Button, Flex, Text} from '@chakra-ui/react'


const PlanButtons = (props) => {
    const {
        accountSubDetails,
        plan,
        setPopUpPayment,
        setChosenPlan,
        setType,
    } = props;

    const renderFreeButtons = () => {
        const monthSelectedPlan = plan.name === accountSubDetails.planName && accountSubDetails.type === 'month';
        return (
            <Flex justify={"center"} direction={"column"} mx={"50px"} mt={"50px"}>
                <Button size={'lg'} color={monthSelectedPlan ? 'black' : 'white'}
                        bg={monthSelectedPlan ? 'gray.300' : 'brand.200'}
                        _hover={monthSelectedPlan ? {bg: "gray.400", color: "black"} : {
                            bg: "brand.600",
                            color: "white"
                        }}
                        isDisabled={monthSelectedPlan}
                        onClick={() => {
                            setPopUpPayment(true);
                            setChosenPlan(plan);
                            setType('month');
                        }}
                >Free</Button>
                {/*<Text mt={"10px"} align={"center"} fontSize='xl'>Free</Text>*/}
            </Flex>
        )
    }

    const renderPaidButtons = () => {
        const monthSelectedPlan = plan.name === accountSubDetails.planName && accountSubDetails.type === 'month';
        const yearSelectedPlan = plan.name === accountSubDetails.planName && accountSubDetails.type === 'year';
        return (
            <Flex direction={"row"} justify={"space-between"} mx={{base: "20px", md: "10px"}}>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'}
                            color={monthSelectedPlan ? 'black' : 'white'}
                            bg={monthSelectedPlan ? 'gray.300' : 'brand.200'}
                            isDisabled={monthSelectedPlan}
                            _hover={monthSelectedPlan ? {bg: "gray.400", color: "black"} : {
                                bg: "brand.600",
                                color: "white"
                            }}
                            onClick={() => {
                                setPopUpPayment(true);
                                setChosenPlan(plan);
                                setType('month');
                            }}>Monthly</Button>
                    <Text mt={"10px"} ml={"8%"} fontSize='xl'>${plan.prices.month?.amount}/Month</Text>
                </Flex>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'}
                            color={yearSelectedPlan ? 'black' : 'white'}
                            bg={yearSelectedPlan ? 'gray.300' : 'brand.200'}
                            isDisabled={yearSelectedPlan}
                            _hover={yearSelectedPlan ? {bg: "gray.400", color: "black"} : {
                                bg: "brand.600",
                                color: "white"
                            }}
                            onClick={() => {
                                setPopUpPayment(true);
                                setChosenPlan(plan);
                                setType('year');
                            }}>Annual</Button>
                    <Text mt={"10px"} ml={"8%"} fontSize='xl'>${plan.prices.year?.amount}/Year</Text>
                </Flex>
            </Flex>
        )
    }
    return plan.name == 'Free' ? renderFreeButtons() : renderPaidButtons();
}

export default PlanButtons
