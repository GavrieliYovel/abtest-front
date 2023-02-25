import React from "react";
import {Flex, Text} from "@chakra-ui/react";
import {FcCheckmark} from 'react-icons/fc'

const PlanFeatures = (props) => {
    const {
        features,
    } = props;

    const renderEachFeature = (item, index) => {
        return (
            <Flex justify="start" direction={'row'} mt={"20px"} ml={"4%"}>
                <FcCheckmark className={'test'} size={25}/>
                <Text ml={"4%"} key={index}>{item}</Text>
            </Flex>
        )
    };
    return (
        <Flex minH={'24rem'} justify="start" direction={'column'} mt={"20px"}>
            {features.map(renderEachFeature)}
        </Flex>
    )
}

export default PlanFeatures
