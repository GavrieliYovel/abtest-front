import React, {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import httpRequest from '../utils/httpRequest';
import StripePopUp from "./StripePopUp";
import {SERVER_URL} from '../utils/constants';

const Payment = (props) => {
    const {
        account,
        setPayment,
        setPopUpPayment,
        chosenPlan,
        type,
        setMessage,
        jwt,
    } = props;

    const [stripePromise, setStripePromise] = useState();
    const [clientSecret, setClientSecret] = useState();

    const popUpMessage = (message) => {
        setMessage(message);
        setPayment(false);
    }

    useEffect(() => {
        const fetchPublishKey = async () => {
            try {
                const key = await httpRequest(SERVER_URL, 'GET', 'stripe/config');
                setStripePromise(loadStripe(key.publishableKey));
            } catch (err) {
                console.log(err.message);
            }
        };

        const createPaymentIntent = async () => {
            try {
                const paymentIntent = await httpRequest(
                    SERVER_URL,
                    'POST',
                    'stripe/create-payment-intent',
                    {
                        "Content-Type": "application/json",
                        'authorization': `${jwt}`,
                    },
                    {
                        name: chosenPlan.name,
                        interval: type,
                        quantity: 1,
                        accountId: account.accountId,
                        email: account.email
                    });

                if (!paymentIntent.clientSecret) {
                    setMessage(paymentIntent.msg);
                    setPayment(false);
                } else {
                    setClientSecret(paymentIntent);
                }

            } catch (err) {
                console.log(err.message);
            }
        };

        fetchPublishKey();
        createPaymentIntent();
    }, []);

    return (
        <>
            <StripePopUp setMessage={popUpMessage} setPopUpPayment={setPopUpPayment} setPayment={setPayment}
                         stripePromise={stripePromise}
                         clientSecret={clientSecret}/>
        </>
    )
};


export default Payment;
