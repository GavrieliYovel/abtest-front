import {Box, Button, Icon, Textarea} from "@chakra-ui/react";
import React from "react";
import {MdCancel} from "react-icons/md";

const ContactUs = (props) => {
    const {
        redirectFunc,
        setContactPopUp,
    } = props;

    return (<>
            <Box position={"relative"} display={"grid"}>
                <Box width={"100%"} height={"30px"}>
                    <Box text={"20px"} position={"absolute"} top={"15px"} right={"15px"}>
                        <Button onClick={() => setContactPopUp(false)}>
                            <Icon as={MdCancel} w='24px' h='24px'/>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box minW={{base: "300px", md: "550px"}}
                 minH={{base: "450px"}}
                 display={"grid"}
                 justifyContent="center"
                 alignContent="center"
                 place-items="center"
            >
                <Box fontWeight="bold" fontSize="3xl" color={"blue"}>Contact Us!</Box>
                <Textarea placeholder='Here is a sample placeholder'/>
                <Button size={'lg'} variant='brand' mt={"20px"} onClick={redirectFunc}>OK!</Button>
            </Box>
        </>
    )
}

export default ContactUs;
