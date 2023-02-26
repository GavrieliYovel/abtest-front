import React, {useEffect, useState} from "react";
import httpRequest from './utils/httpRequest';
import {RxRocket} from 'react-icons/rx'
import {IoMdPaperPlane} from 'react-icons/io'
import {TbRocket} from "react-icons/tb";

// Chakra imports
import {Box, Grid, useColorModeValue} from "@chakra-ui/react";

// main components
import IconBox from "../../../components/icons/IconBox"

// Custom components
import Plan from "./components/Plan"
import PlanTitle from "./components/PlanTitle";
import PlanFeatures from "./components/PlanFeatures"
import PlanButtons from "./components/PlanButtons";
import Payment from "./components/Payment";
import CustomPlan from "./components/CustomPlan";
import ContactUs from "./components/ContactUs";

const Plans = () => {

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [plans, setPlans] = useState([]);
    const [chosenPlan, setChosenPlan] = useState([]);
    const [accountSubDetails, setAccountSubDetails] = useState({});
    const [payment, setPayment] = useState(false);
    const [type, setType] = useState('');
    const [contact, setContact] = useState(false);
    useEffect(async () => {
        const fetchPlans = async () => {
            try {
                const response = await httpRequest('http://localhost:5000/', 'GET', 'plans');
                setPlans(response);
            } catch (err) {
                console.log(err.message);
            }
        };

        const fetchAccountSubDetails = async () => {
            try {
                const response = await httpRequest('http://localhost:5000/', 'GET', 'subscriptions/63ba81cd789c4503dc2e6cc2');
                const modifyResponse = {
                    accountId: '63c8139650166c0f99f62cbc',
                    ...response
                }
                console.log(modifyResponse);
                setAccountSubDetails(modifyResponse);
                // this will happend when we click on button.
            } catch (err) {
                console.log(err.message);
            }
        };


        await fetchPlans();
        fetchAccountSubDetails();

    }, []);

    const renderEachPlan = (plan) => {
        console.log("plan: ", plan);
        let icon;
        switch (plan.name) {
            case 'Free':
                icon = <IoMdPaperPlane size={55}/>;
                break;
            case 'Pro':
                icon = <TbRocket size={55}/>;
                break;
            case 'Premium':
                icon = <RxRocket size={55}/>;
                break;
            default:
                icon = "4";
                break;
        }
        return (
            <Plan key={plan.name}>
                <PlanTitle>{plan.name}</PlanTitle>
                <IconBox icon={icon} mt={"20px"}/>
                <PlanFeatures features={plan.features}/>
                <PlanButtons plan={plan} accountSubDetails={accountSubDetails} setPayment={setPayment}
                             setChosenPlan={setChosenPlan} setType={setType}/>
            </Plan>
        );
    };

    const paymentPopUp = () => {
        return (
            <Payment account={accountSubDetails} setPayment={setPayment} chosenPlan={chosenPlan} type={type}/>
        )
    };

    return (
        <>
            <Box display="grid" position="relative" filter='auto' mt={{base: "180px", md: "80px"}}
                 justifyContent="center" blur={payment ? "10px" : null} pointerEvents={payment ? "none" : "auto"}
                 alignContent="center" backdropFilter="blur(10px)">
                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)"}} gap={"4%"}
                      justifyContent="center"
                      alignContent="center">

                    {plans ? plans.map(renderEachPlan) : null}
                </Grid>
                <CustomPlan setContact={setContact}/>
                {/*{payment ? paymentPopUp() : null}*/}
            </Box>
            {payment ? paymentPopUp() : null}
            {contact ? <ContactUs/> : null}
        </>
    );
}

export default Plans;
