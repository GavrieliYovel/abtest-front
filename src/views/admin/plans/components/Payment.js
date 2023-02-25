import React, {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import httpRequest from '../utils/httpRequest';
import CheckOutForm from './CheckOutForm';
import {Box, Button, Icon} from "@chakra-ui/react";
import {MdCancel} from "react-icons/md";


const Payment = (props) => {
    const {
        account,
        setPayment,
    } = props;

    const [stripePromise, setStripePromise] = useState();
    const [clientSecret, setClientSecret] = useState();

    useEffect(() => {
        const fetchPublishKey = async () => {
            try {
                const key = await httpRequest('http://localhost:5000/', 'GET', 'stripe/config');
                setStripePromise(loadStripe(key.publishableKey));
            } catch (err) {
                console.log(err.message);
            }
        };

        const createPaymentIntent = async () => {
            try {
                const paymentIntent = await httpRequest(
                    'http://localhost:5000/',
                    'POST',
                    'stripe/create-payment-intent',
                    {
                        "Content-Type": "application/json"
                    },
                    {
                        name: account.name,
                        interval: account.type,
                        quantity: 1,
                        accountId: account.accountId
                    });
                setClientSecret(paymentIntent);
            } catch (err) {
                console.log(err.message);
            }
        };

        createPaymentIntent();
        fetchPublishKey();
    }, []);

    return (
        <>
            <Box position="absolute"
                 top="50%"
                 left="50%"
                 transform="translate(-50%, -50%)"
                 border="1px solid" borderColor="black" borderRadius="md"
                 minW={{base: "300px", md: "550px"}}
                 blur={null}
                 background="white"
            >
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
                                <CheckOutForm/>
                            </Elements>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
};


export default Payment;
