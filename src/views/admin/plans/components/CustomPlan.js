import React from "react";
import {Button, Flex, Text} from "@chakra-ui/react";
import {MdCall} from 'react-icons/md'

const CustomPlan = (props) => {
    const {
        setContactPopUp,
    } = props;

    return (
        <Flex justify="center" mt={"100px"}>
            <Text fontSize='3xl'>Wish to make a custom plan?</Text>
            <Button rightIcon={<MdCall/>} onClick={() => setContactPopUp(true)} size={'lg'} variant='brand' ml={"15px"}>Contact
                Us!</Button>
        </Flex>
    )
}

export default CustomPlan
