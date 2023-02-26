import {Box, Button, Textarea} from "@chakra-ui/react";
import React from "react";

const ContactUs = (props) => {
    const {
        redirectFunc,
    } = props;

    return (
        <Box minW={{base: "300px", md: "550px"}}
             minH={{base: "300px", md: "550px"}}
             display={"grid"}
             justifyContent="center"
             alignContent="center"
             place-items="center"
        >
            <Box fontWeight="bold" fontSize="3xl" color={"blue"}>Contact Us!</Box>
            <Textarea placeholder='Here is a sample placeholder'/>
            <Button size={'lg'} variant='brand' mt={"20px"} onClick={redirectFunc}>OK!</Button>
        </Box>
    )
}

export default ContactUs;
