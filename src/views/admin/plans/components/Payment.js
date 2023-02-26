import React, {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import httpRequest from '../utils/httpRequest';
import {Box} from "@chakra-ui/react";
import LightBoxMessage from "./LightBoxMessage";
import StripePopUp from "./StripePopUp";


const Payment = (props) => {
    const {
        account,
        setPayment,
        chosenPlan,
        type,
    } = props;

    const [stripePromise, setStripePromise] = useState();
    const [clientSecret, setClientSecret] = useState();
    const [message, setMessage] = useState('');

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
                        name: chosenPlan.name,
                        interval: type,
                        quantity: 1,
                        accountId: account.accountId
                    });
                setClientSecret(paymentIntent);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchPublishKey();
        createPaymentIntent();
    }, []);

    const redirectFunc = () => {
        window.location.href = "https://ynet.co.il";
    }
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
                {!message ? <StripePopUp setMessage={setMessage} setPayment={setPayment} stripePromise={stripePromise}
                                         clientSecret={clientSecret}
                    />
                    :
                    <LightBoxMessage message={message} redirectFunc={redirectFunc}/>
                }
            </Box>
        </>
    )
};


export default Payment;
