import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {Payment} from './Payment';
import {Box, Button} from "@chakra-ui/react";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/completion`,
            },
            redirect: "if_required"
        });

        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("payment succeeded!")
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    return (
        <Box m={{base: "15px", md: "20px", xl: "25px"}}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element"/>
                <Button size={'lg'} variant='brand' mt={{base: "15px", md: "20px", xl: "25px"}}
                        disabled={isProcessing || !stripe || !elements}
                        id="submit">Pay now</Button>
                {/*<button disabled={isProcessing || !stripe || !elements} id="submit">*/}
                {/*    <span id="button-text">*/}
                {/*      {isProcessing ? "Processing ... " : "Pay now"}*/}
                {/*    </span>*/}
                {/*</button>*/}
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </Box>
    );
}

export default CheckOutForm;
