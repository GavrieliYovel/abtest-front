/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ |_  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
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
    Box, GridItem, HStack, Icon, IconButton, Input, SimpleGrid, Spacer, Text,
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

export default function Myaccount() {

    const jwt = Cookies.get("jwt");
    const [data, setData] = useState([]);

    const [totalSeats,setTotalSeats] = useState([]);
    const [usedSeats,setUsedSeats] = useState([]);
    const [credits,setCredits] = useState([]);

    useEffect(() => {
        axios.get(`https://abtest-shenkar.onrender.com/accounts/63fb984ccf1ffa6c3fb1700d`,
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
                console.log(response.data.Seats);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const pieChartData = [12,20,30];
    const [email,setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const inviteUser = () => {
        console.log("jwt" + jwt);
        axios.post(`https://abtest-shenkar.onrender.com/accounts/63fb984ccf1ffa6c3fb1700d/link/${email}`, {},
            {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
            console.log(response.data);
        });
    };


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
            <Inclusive></Inclusive>
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