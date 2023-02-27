/*!
  _   _  _  __  _ ___  _   _   _   _ __
 | | | |/ _ \|  _ \|_ |_  / _ \| \ | | | | | |_ _|
 | || | | | | |) || |  / / | | |  \| | | | | || |
 |  _  | || |  _ < | | / /| || | |\  | | |_| || |
 || ||\__/|| \_\__/_\__/|| \_|  \__/|__|
=========================================================
* Horizon UI - v1.1.0
=========================================================
* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)
* Designed and Coded by Simmmple
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// Chakra imports

import {
    Box, GridItem, HStack, IconButton, Input, SimpleGrid, Spacer, Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    columnsDataColumnsUser,columnsDataColumnsRoleUser
} from "views/admin/dataTables/variables/columnsData";
import Cookies from "js-cookie";
import ColumnsTable from "../accounts/components/columnsTable";
import PieChartAccount from "./components/pieChart"
import Inclusive from "./components/inclusive";
import Plan from "./components/Plan"
import Card from "../../../components/card/Card";
import {AddIcon} from "@chakra-ui/icons";
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import planData from './variables/planData.json';


export default function Myaccount() {

    const jwt = Cookies.get("jwt");
    const { loggedInUser } = useContext(AuthContext);
    const accountId = loggedInUser.accountId;
    console.log(accountId);
    const [data, setData] = useState([]);


    const [totalSeats,setTotalSeats] = useState([]);
    const [usedSeats,setUsedSeats] = useState([]);
    const [credits,setCredits] = useState([]);
    const [plan,setPlan] = useState([]);
    const pieChartData = [12,12,12];
    const [toggleExperiment, setToggleExperiment] = useState(true);

    useEffect(() => {
        axios.get(`https://abtest-shenkar.onrender.com/accounts/63fb987fcf1ffa6c3fb17014`,
            {   headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                const users = Object.values(response.data).filter(obj => obj.hasOwnProperty('Name'))
                setData(users);
                setTotalSeats(response.data.Seats);
                setUsedSeats(response.data.usedSeats);
                setCredits(response.data.Credits);
                setPlan(response.data.Plan);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const [email,setEmail] = useState('');
    const handleChange = (event) => {
        setEmail(event.target.value);
    };


    const inviteUser = () => {
        console.log("jwt" + jwt);
        axios.post(`https://abtest-shenkar.onrender.com/accounts/${accountId}/link/${email}`, {},
            {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
        });
    };

    function inclusive() {
        axios.get(`https://abtest-shenkar.onrender.com/accounts/toggle/${accountId}`, {
            headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response.data);
            setToggleExperiment(response.data.toggle === 'inclusive');
        }).catch(error => {
            console.log(error);
        });
    }

    console.log("plan" + plan);
    const selectedPlan = planData.find(plan => plan.type === plan);
    if (selectedPlan) {
        const planFeatures = selectedPlan.features;
        console.log(planFeatures);
        // Use the plan features in your application as needed
    } else {
        console.log(` Plan type ${plan} not found in plan data.`);
    }

    return (
        <>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <SimpleGrid
                    mb='20px'
                    spacing={{ base: "20px", xl: "20px" }}>
                    <ColumnsTable

                        columnsData={columnsDataColumnsUser}
                        tableData={data}
                    />
                </SimpleGrid>
            </Box>
            <Card p='20px' direction='column' w='40%'>
                <HStack spacing='24px'>
                    <Box w='100px'>
                        <Text fontSize="17" fontWeight="bold">Invite user:</Text>
                    </Box>
                    <Box>
                        <Input placeholder={"Email"}
                               fontWeight='500'
                               fontSize='15'
                               borderRadius={"10px"}
                               _placeholder={{ fontWeight: "400", color: "secondaryGray.600"}}
                               onChange={handleChange}
                               value={email.value}
                        />
                    </Box>
                    <Box >
                        <IconButton
                            align={"right"}
                            aria-label='Add account'
                            color='blue'
                            icon={<AddIcon />}
                            onClick={inviteUser}
                        />
                    </Box>
                </HStack>
            </Card>
            <Inclusive toggle={toggleExperiment} onClickFunction={inclusive}></Inclusive>
            <Spacer></Spacer>
            <SimpleGrid columns={3} w="full" marginY={"20px"}  mb='20px'>
                <GridItem w="100%">
                    <PieChartAccount title="credits" total={credits} data={pieChartData}></PieChartAccount>
                </GridItem>
                <GridItem w="100%">
                    <PieChartAccount title="seats" used={usedSeats} total={totalSeats} data={pieChartData}></PieChartAccount>
                </GridItem>
                <GridItem w="100%">
                    <Plan plan={"Free"} feature1={"up to 3 users"} feature2={"up to 20% traffic"} feature3={"up to 3 experiments per month"}></Plan>
                </GridItem>
            </SimpleGrid>
        </>
    );
}
