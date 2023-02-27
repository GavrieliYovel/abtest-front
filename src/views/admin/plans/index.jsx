import React, {useContext, useEffect, useState} from "react";
import httpRequest from './utils/httpRequest';
import {RxRocket} from 'react-icons/rx'
import {IoMdPaperPlane} from 'react-icons/io'
import {TbRocket} from "react-icons/tb";
import Cookies from "js-cookie";

// Chakra imports
import {Box, Grid} from "@chakra-ui/react";

// main components
import IconBox from "../../../components/icons/IconBox"

// Custom components
import Plan from "./components/Plan"
import PlanTitle from "./components/PlanTitle";
import PlanFeatures from "./components/PlanFeatures"
import PlanButtons from "./components/PlanButtons";
import CustomPlan from "./components/CustomPlan";
import PopUp from "./components/PopUp";

import {AuthContext} from 'contexts/AuthContext';
import {SERVER_URL} from './utils/constants';

const Plans = () => {
    const jwt = Cookies.get("jwt");
    const {loggedInUser} = useContext(AuthContext);
    // Chakra Color Mode
    const [plans, setPlans] = useState([]);
    const [chosenPlan, setChosenPlan] = useState([]);
    const [accountSubDetails, setAccountSubDetails] = useState({});
    const [payment, setPayment] = useState(false);
    const [type, setType] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [contact, setContact] = useState(false);

    const setPopUpPayment = (mode) => {
        setPayment(mode);
        setPopUp(mode);
    }

    const setContactPopUp = (mode) => {
        setContact(mode);
        setPopUp(mode);
    }

    useEffect(async () => {
        const fetchPlans = async () => {
            try {
                const response = await httpRequest(`${SERVER_URL}`, 'GET', 'plans');
                setPlans(response);
            } catch (err) {
                console.log(err.message);
            }
        };

        const fetchAccountSubDetails = async () => {
            try {
                const response = await httpRequest(`${SERVER_URL}`, 'GET', `subscriptions/${loggedInUser.accountId}`);
                const modifyResponse = {
                    accountId: loggedInUser.accountId,
                    email: loggedInUser.email,
                    ...response
                }
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
                <PlanButtons plan={plan} accountSubDetails={accountSubDetails} setPopUpPayment={setPopUpPayment}
                             setChosenPlan={setChosenPlan} setType={setType}/>
            </Plan>
        );
    };

    return (
        <>
            <Box display="grid" position="relative" filter='auto' mt={{base: "180px", md: "80px"}}
                 justifyContent="center" blur={popUp ? "10px" : null} pointerEvents={popUp ? "none" : "auto"}
                 alignContent="center" backdropFilter="blur(10px)">
                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)"}} gap={"4%"}
                      justifyContent="center"
                      alignContent="center">
                    {plans ? plans.map(renderEachPlan) : null}
                </Grid>
                <CustomPlan setContactPopUp={setContactPopUp}/>
            </Box>
            {popUp ? <PopUp payment={payment} jwt={jwt} accountSubDetails={accountSubDetails} setPayment={setPayment}
                            setContact={setContact} setPopUpPayment={setPopUpPayment} contact={contact}
                            setContactPopUp={setContactPopUp}
                            chosenPlan={chosenPlan} type={type}/> : null}
        </>
    );
}

export default Plans;
