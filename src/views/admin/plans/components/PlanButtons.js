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
        const monthSelected = accountSubDetails.type === 'month';
        const monthSelectedPlan = plan.name === accountSubDetails.name && monthSelected;
        return (
            <Flex justify={"center"} direction={"column"} mx={"50px"} mt={"50px"}>
                <Button size={'lg'} bg={monthSelectedPlan ? 'gray.200' : 'brand'}
                        sx={{"&:hover": {cursor: (monthSelectedPlan ? "not-allowed" : "allowed"), bg: "gray.200"}}}
                >Monthly</Button>
                <Text mt={"10px"} align={"center"} fontSize='xl'>Free</Text>
            </Flex>
        )
    }

    const renderPaidButtons = () => {
        const monthSelected = accountSubDetails.type === 'month';
        const yearSelected = accountSubDetails.type === 'year';
        const monthSelectedPlan = plan.name === accountSubDetails.name && monthSelected;
        console.log('monthSelectedPlan: ', monthSelectedPlan);
        const yearSelectedPlan = plan.name === accountSubDetails.name && yearSelected;
        return (
            <Flex direction={"row"} justify={"space-between"} mx={{base: "20px", md: "10px"}}>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'}
                            bg={monthSelectedPlan ? 'gray.200' : 'brand.500'}
                            sx={{
                                "&:hover": {
                                    cursor: (monthSelectedPlan ? "not-allowed" : "allowed"),
                                    // bg: (!monthSelectedPlan ? "gray.200" : "brand")
                                }
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
                            variant={yearSelectedPlan ? 'gray' : 'brand'}
                            border={yearSelectedPlan ? '2px' : undefined}
                            isDisabled={yearSelectedPlan}
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
