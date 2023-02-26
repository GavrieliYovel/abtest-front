import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {Payment} from './Payment';
import {Box, Button} from "@chakra-ui/react";

const CheckOutForm = (props) => {
    const {
        setMessage
    } = props;
    const stripe = useStripe();
    const elements = useElements();

    const [errMessage, setErrMessage] = useState(null);
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
            setErrMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("payment succeeded!")
        } else {
            setErrMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    return (
        <Box m={{base: "15px", md: "20px", xl: "25px"}}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element"/>
                <Button type={"submit"} size={'lg'} variant='brand' mt={{base: "15px", md: "20px", xl: "25px"}}
                        pointerEvents={(isProcessing || !stripe || !elements) ? "none" : "auto"}
                        id="submit">{isProcessing ? "Processing ... " : "Pay now"}</Button>
                {errMessage && <div id="payment-message">{errMessage}</div>}
            </form>
        </Box>
    );
}

export default CheckOutForm;
