import {Box, Button} from "@chakra-ui/react";
import React from "react";

const LightBoxMessage = (props) => {
    const {
        message,
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
            <Box fontWeight="bold" fontSize="3xl" color={"green"}>{message}</Box>
            <Button size={'lg'} variant='brand' mt={"20px"} onClick={redirectFunc}>OK!</Button>
        </Box>
    )
}

export default LightBoxMessage;
