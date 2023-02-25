import {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import httpRequest from '../utils/httpRequest';
import CheckOutForm from './CheckOutForm';

const Payment = (props) => {
    const {
        account
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
            <h1>Hello</h1>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={clientSecret}>
                    <CheckOutForm/>
                </Elements>
            )}
        </>

    )
};


export default Payment;
