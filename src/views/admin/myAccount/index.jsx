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
    Alert, AlertIcon,
    Box, GridItem, HStack, IconButton, Input, SimpleGrid, Spacer, Text,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    columnsDataColumnsUser,
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
import * as plansData from "react-bootstrap/ElementChildren";
const planData = require('./variables/planData.json');

function PlanComponent(PLEN) {
    let feature = planData.find(plan => plan.type === PLEN);
    return feature;
}

export default function Myaccount() {

    const jwt = Cookies.get("jwt");
    const { loggedInUser } = useContext(AuthContext);
    const accountId = loggedInUser.accountId;
    const [data, setData] = useState([]);

    const [totalSeats,setTotalSeats] = useState([]);
    const [usedSeats,setUsedSeats] = useState([]);
    const [credits,setCredits] = useState([]);
    const [features,setFeatures] = useState({"type": "free", "features": ["Up to 1 user", "Up to 2 experiments per month", "Traffic control: 50%"]})
    const pieChartData = [12,12,12];
    const [toggleExperiment, setToggleExperiment] = useState(true);
    const [email,setEmail] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertSata, setalertSata] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    useEffect(() => {
        axios.get(`https://abtest-shenkar.onrender.com/accounts/${accountId}`,
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
                setFeatures(PlanComponent(response.data.Plan));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const inviteUser = () => {
        console.log("jwt" + jwt);
        axios.post(`https://abtest-shenkar.onrender.com/accounts/${accountId}/link/${email}`, {},
            {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                },
            }).then((response ) => { refrshTable(email)
        });
        setEmail("")
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
const refrshTable = (id) => {

    const isDuplicate = data.some(item => item.id === id);
    if (isDuplicate) {
        console.log('Email already exists');
    } else {
        const user = {Name:"stranger", email: email, Status: "pending", Role : "user", Edit:"" }
        setData([...data ,user]);
        setShowAlert(true);
        setalertSata(`${user.email} was invited`);
    }

    }
    const refreshData = (id) => {
        const newData = data.filter(data => data.id !== id);
        setShowAlert(true);
        setData(newData )
        setalertSata(`user deleted!!`)
    }

    return (
        <>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                {showAlert && (
                    <Alert status='success' mb='20px'>
                        <AlertIcon />
                        {alertSata}
                    </Alert>
                )}
                <SimpleGrid
                    mb='20px'
                    spacing={{ base: "20px", xl: "20px" }}>
                    <ColumnsTable
                        columnsData={columnsDataColumnsUser}
                        tableData={data}
                        type={"users"}
                        func={refreshData}
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
            <Inclusive toggle={toggleExperiment} func={inclusive}></Inclusive>
            <Spacer></Spacer>
            <SimpleGrid columns={3} w="full" marginY={"20px"}  mb='20px'>
                <GridItem w="100%">
                    <PieChartAccount title="credits" total={credits} data={[1,1,1]}></PieChartAccount>
                </GridItem>
                <GridItem w="100%">
                    <PieChartAccount title="seats" used={usedSeats} total={totalSeats} data={[1,1,1]}></PieChartAccount>
                </GridItem>
                    <GridItem key={features.type} w="100%">
                        <Plan plan={features.type}
                              feature1={features.features[0]}
                              feature2={features.features[1]}
                              feature3={features.features[2]}
                              buttonTxst={features.buttonTxst}
                                  />
                    </GridItem>
            </SimpleGrid>
        </>
    );
}
