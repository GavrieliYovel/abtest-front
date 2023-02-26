import React from "react";
import {Button, Flex, Text} from '@chakra-ui/react'


const PlanButtons = (props) => {
    const {
        accountSubDetails,
        plan,
        setPayment,
        setChosenPlan,
        setType,
    } = props;


    const renderFreeButtons = () => {
        const monthSelected = accountSubDetails.type === 'month';
        const monthSelectedPlan = plan.name === accountSubDetails.planName && monthSelected;
        return (
            <Flex justify={"center"} direction={"column"} mx={"50px"} mt={"50px"}>
                <Button size={'lg'} variant={monthSelectedPlan ? 'gray' : 'brand'}
                        border={monthSelectedPlan ? '2px' : undefined}
                        isDisabled={monthSelectedPlan}>Monthly</Button>
                <Text mt={"10px"} align={"center"} fontSize='xl'>Free</Text>
            </Flex>
        )
    }

    const renderPaidButtons = () => {
        const monthSelected = accountSubDetails.type === 'month';
        const yearSelected = accountSubDetails.type === 'year';
        const monthSelectedPlan = plan.name === accountSubDetails.planName && monthSelected;
        const yearSelectedPlan = plan.name === accountSubDetails.planName && yearSelected;
        return (
            <Flex direction={"row"} justify={"space-between"} mx={{base: "20px", md: "10px"}}>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'}
                            variant={monthSelectedPlan ? 'gray' : 'brand'}
                        //     variant={'brand'}
                        // opacity={yearSelectedPlan ? 0.5 : 1}

                        // colorScheme={monthSelectedPlan ? 'gray' : 'brand'}
                        // bg={monthSelectedPlan ? undefined : 'gray'}
                            border={monthSelectedPlan ? '2px' : undefined}
                            isDisabled={monthSelectedPlan}
                        // _disabled={{
                        //     opacity: monthSelectedPlan ? 1 : 0.5,
                        //     cursor: monthSelectedPlan ? 'not-allowed' : 'pointer',
                        // }}
                            onClick={() => {
                                setPayment(true);
                                setChosenPlan(plan);
                                setType('month');
                            }}>Month</Button>
                    <Text mt={"10px"} ml={"8%"} fontSize='xl'>${plan.prices.month?.amount}/Month</Text>
                </Flex>
                <Flex direction={"column"} justify="center" mt={"50px"}>
                    <Button size={'lg'}
                            variant={yearSelectedPlan ? 'gray' : 'brand'}
                        //     variant={'brand'}
                        // opacity={yearSelectedPlan ? 0.5 : 1}
                        // colorScheme={monthSelectedPlan ? 'gray' : 'brand'}
                        // bg={yearSelectedPlan ? 'gray' : }
                            border={yearSelectedPlan ? '2px' : undefined}
                            isDisabled={yearSelectedPlan}
                        // _disabled={{
                        //     hover: yearSelectedPlan ? 1 : 0.5,
                        //     cursor: yearSelectedPlan ? 'not-allowed' : 'pointer',
                        // }}
                            onClick={() => {
                                setPayment(true);
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
