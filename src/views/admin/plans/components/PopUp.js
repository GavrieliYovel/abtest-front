import {Box} from "@chakra-ui/react";
import React, {useState} from "react";
import Payment from "./Payment";
import PopUpMessage from "./PopUpMessage";
import ContactUs from "./ContactUs";
import {IAM_URL} from "../utils/constants";


const PopUp = (props) => {
    const {
        accountSubDetails,
        setPayment,
        setPopUpPayment,
        setContactPopUp,
        chosenPlan,
        contact,
        setContact,
        type,
        jwt,
        payment,
    } = props;
    const redirectFunc = () => {
        window.location.href = IAM_URL;
    }

    const [message, setMessage] = useState('');

    return (
        <Box position="absolute"
             top="50%"
             left="50%"
             transform="translate(-50%, -50%)"
             borderRadius="xl" boxShadow="xl"
             minW={{base: "300px", md: "550px"}}
             minH={{base: "450px"}}
             blur={null}
             background="white"
        >
            {payment ?
                <Payment jwt={jwt} account={accountSubDetails} setPopUpPayment={setPopUpPayment}
                         setMessage={setMessage}
                         setPayment={setPayment}
                         chosenPlan={chosenPlan} type={type}/>
                : null}
            {message ? <PopUpMessage message={message} redirectFunc={redirectFunc}/> : null}
            {contact ? <ContactUs setContact={setContact} setMessage={setMessage} accountSubDetails={accountSubDetails}
                                  setContactPopUp={setContactPopUp}
                                  redirectFunc={redirectFunc}/> : null}
        </Box>
    )
}

export default PopUp;
