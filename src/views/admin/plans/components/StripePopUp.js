import {Box, Button, Icon} from "@chakra-ui/react";
import {MdCancel} from "react-icons/md";
import {Elements} from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import React from "react";

const StripePopUp = (props) => {
    const {
        setPayment,
        setMessage,
        stripePromise,
        clientSecret,
    } = props;
    return (
        <Box position={"relative"} display={"grid"}>
            <Box width={"100%"} height={"30px"}>
                <Box text={"20px"} position={"absolute"} top={"15px"} right={"15px"}>
                    <Button onClick={() => setPayment(false)}>
                        <Icon as={MdCancel} w='24px' h='24px'/>
                    </Button>
                </Box>
            </Box>
            <Box
                align="center">
                {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={clientSecret}>
                        <CheckOutForm setMessage={setMessage}/>
                    </Elements>
                )}
            </Box>
        </Box>
    )
}

export default StripePopUp;
