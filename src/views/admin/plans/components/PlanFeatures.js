import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";
import {FcCheckmark} from 'react-icons/fc'

const PlanFeatures = (props) => {
    const {
        features,
    } = props;

    const renderEachFeature = (item, index) => {
        return (
            <Flex justify="start" direction={'row'} mt={"20px"} >
                <FcCheckmark className={'test'} size={25}/>
                <Text ml={"4%"} key={index}>{item}</Text>
            </Flex>
        )
    };
    return (
        <Box mx={{base:"50px", md: "15px"}}>
        <Flex minH={'24rem'}  direction={'column'} mt={"20px"}>
            {features.map(renderEachFeature)}
        </Flex>
        </Box>
    )
}

export default PlanFeatures
