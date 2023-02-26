import {Box, Button, Icon, Textarea} from "@chakra-ui/react";
import React from "react";
import {MdCancel} from "react-icons/md";
import httpRequest from '../utils/httpRequest';

const ContactUs = (props) => {
    const {
        setContactPopUp,
        setMessage,
        accountSubDetails,
    } = props;

    const fetchPostContact = async (data) => {
        try {
            const key = await httpRequest('http://localhost:5000/', 'POST', 'contact', {"Content-Type": "application/json"}, data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const textValue = e.target.elements.contactText.value;

        const contactJson = {
            accountId: accountSubDetails.accountId,
            textValue
        };
        console.log(contactJson);

        const result = fetchPostContact(contactJson);
        console.log(result);
    }
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

                <form onSubmit={handleSubmit}>
                    <Box display={"grid"}
                         justifyContent="center"
                         alignContent="center"
                         place-items="center">
                        <Box fontWeight="bold" fontSize="3xl" color={"blue"}>Contact Us!</Box>
                        <Textarea placeholder='Here is a sample placeholder' name={'contactText'}/>
                        <Button type={'submit'} size={'lg'} variant='brand' mt={"20px"}
                        >Contact</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default ContactUs;
