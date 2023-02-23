import React, {useEffect, useState} from "react";
import httpRequest from './utils/httpRequest';
import {RxRocket} from 'react-icons/rx'
import {IoMdPaperPlane} from 'react-icons/io'
import {SlPlane} from 'react-icons/sl'

// Chakra imports
import {Box, SimpleGrid, useColorModeValue,} from "@chakra-ui/react";

// main components
import IconBox from "../../../components/icons/IconBox"

// Custom components
import Plan from "./components/plan"
import PlanTitle from "./components/PlanTitle";

const Plans = () => {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await httpRequest('http://localhost:5000/', 'GET', 'accounts/63af758d7d6c80ed3dabdd6a/plans');
                // response.plans will be change when we change the Restful API
                setPlans(response.plans);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchPlans();
    }, []);

    const renderEachPlan = (plan, i) => {
        console.log(plan)
        console.log(i)

        let icon;
        switch (plan.name) {
            case 'Free':
                icon = <IoMdPaperPlane size={55}/>;
                break;
            case 'Pro':
                icon = <SlPlane size={55}/>;
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
            </Plan>
        );
    };

    return (
        <Box h="100%" mt={{base: "180px", md: "80px"}}>
            <SimpleGrid columns={4} gap='4%'>
                {!plans ? null : plans.map(renderEachPlan)}
            </SimpleGrid>
        </Box>
    );
}

export default Plans;
