import React from "react";
import {Flex, Text} from "@chakra-ui/react";
import {FcCheckmark} from 'react-icons/fc'

const PlanFeatures = (props) => {
    const {
        features,
    } = props;

    const renderEachFeature = (item, index) => {
        return (
            <Flex justify="start" direction={'row'} mt={"3%"} ml={"4%"}>
                <FcCheckmark size={25}/>
                <Text ml={"4%"} key={index}>{item}</Text>
            </Flex>
        )
    };
    return (
        <Flex justify="center" direction={'column'} mt={"12%"}>
            {features.map(renderEachFeature)}
        </Flex>
    )
}

export default PlanFeatures
