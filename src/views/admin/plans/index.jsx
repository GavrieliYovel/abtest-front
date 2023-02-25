import React, {useEffect, useState} from "react";
import httpRequest from './utils/httpRequest';
import {RxRocket} from 'react-icons/rx'
import {IoMdPaperPlane} from 'react-icons/io'
import {TbRocket} from "react-icons/tb";

// Chakra imports
import {Box, SimpleGrid, useColorModeValue} from "@chakra-ui/react";

// main components
import IconBox from "../../../components/icons/IconBox"

// Custom components
import Plan from "./components/Plan"
import PlanTitle from "./components/PlanTitle";
import PlanFeatures from "./components/PlanFeatures"
import PlanButtons from "./components/PlanButtons";
import Payment from "./components/Payment";
import CustomPlan from "./components/CustomPlan";

const Plans = () => {

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [plans, setPlans] = useState([]);
    const [accountSubDetails, setAccountSubDetails] = useState({});
    const [payment, setPayment] = useState(false);
    const [blur, setBlur] = useState('0px');

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
                const response = await httpRequest('http://localhost:5000/', 'GET', 'subscriptions/63b9727c238a2058c3fe4fb2');
                const modifyResponse = {
                    accountId: '63b9727c238a2058c3fe4fb2',
                    ...response
                }
                console.log(modifyResponse);
                setAccountSubDetails(modifyResponse);
                // this will happend when we click on button.
                setPayment(true);
            } catch (err) {
                console.log(err.message);
            }
        };


        await fetchPlans();
        fetchAccountSubDetails();

    }, []);

    const renderEachPlan = (plan, i) => {
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
                <IconBox icon={icon} mt={"100px"}/>
                <PlanFeatures features={plan.features}/>
                <PlanButtons plan={plan}/>
            </Plan>
        );
    };

    const paymentPopUp = () => {
        return (
            <Payment account={accountSubDetails}/>
        )

    };

    return (
        <Box filter='auto' blur={blur} mt={{base: "180px", md: "80px"}}>
            <SimpleGrid columns={3} gap='4%'>
                {plans ? plans.map(renderEachPlan) : null}
            </SimpleGrid>
            <CustomPlan/>
            {payment ? paymentPopUp() : null}
        </Box>
    );
}

export default Plans;
