/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
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
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {pieChartData, pieChartOptions} from "variables/charts";
import React, {useEffect, useState} from "react";
import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
} from "react-icons/md";

import ComplexTable from "views/admin/default/components/ComplexTable";
import PieCard from "views/admin/default/components/PieCard";
import {
    columnsDataCheck,
    columnsDataComplex,
} from "views/admin/default/variables/columnsData";

import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import axios from "axios";
import Cookies from "js-cookie";
import {useContext} from 'react';
import {AuthContext} from "../../../contexts/AuthContext";

export default function UserReports() {
    const jwt = Cookies.get("jwt");
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [details, setDetail] = useState({});
    const [experiments, setExperiments] = useState([]);
    const [partOfExperiments, setPartOfExperiments] = useState([]);
    const {loggedInUser} = useContext(AuthContext);
    console.log(loggedInUser);
    const getExperimentsByAccount = (id) => {
        console.log(jwt);
        axios.get(`https://core-team-final-assignment.onrender.com/account/${id}`, {headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }})
            .then(response => {
                if (response.status === 200) {
                    setExperiments([response.data]);
                }
                else
                    console.log("Failed");
            })
            .catch(err => {
                    console.log(err);
                }
            )
    }
    const getDetails = () => {
        console.log(jwt);
        axios.get(`https://core-team-final-assignment.onrender.com/account`, {
            headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setDetail(response.data);
                } else
                    console.log("Failed");
            })
            .catch(err => {
                    console.log(err);
                }
            )
    }
    useEffect(() => {
        getDetails();
        getExperimentsByAccount();
        // const sortedData = experiments.sort((a, b) => new Date(b.duration.startDate) - new Date(a.duration.startDate));
        // const slicedData = sortedData.slice(0, 3);
        console.log("experiments" + experiments);

        const newExperiments = experiments.map(({ experiment }) => ({
            name: experiment.name,
            status: experiment.status,
            date: experiment.duration.startTime,
            number: experiment.callCount
        }));

        console.log("newExperiment" + newExperiments);
    }, [])
    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                columns={{base: 1, md: 2, lg: 3, "2xl": 6}}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor}/>
                            }
                        />
                    }
                    name='Plan'
                    value={details.plan}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                            }
                        />
                    }
                    name='Credits'
                    value={details.credit}
                />
                {/*<MiniStatistics growth='+23%' name='Sales' value='$574.34' />*/}
                {/*<MiniStatistics*/}
                {/*  endContent={*/}
                {/*    <Flex me='-16px' mt='10px'>*/}
                {/*      <FormLabel htmlFor='balance'>*/}
                {/*        <Avatar src={Usa} />*/}
                {/*      </FormLabel>*/}
                {/*      <Select*/}
                {/*        id='balance'*/}
                {/*        variant='mini'*/}
                {/*        mt='5px'*/}
                {/*        me='0px'*/}
                {/*        defaultValue='usd'>*/}
                {/*        <option value='usd'>USD</option>*/}
                {/*        <option value='eur'>EUR</option>*/}
                {/*        <option value='gba'>GBA</option>*/}
                {/*      </Select>*/}
                {/*    </Flex>*/}
                {/*  }*/}
                {/*  name='Your balance'*/}
                {/*  value='$1,000'*/}
                {/*/>*/}
                {/*<MiniStatistics*/}
                {/*  startContent={*/}
                {/*    <IconBox*/}
                {/*      w='56px'*/}
                {/*      h='56px'*/}
                {/*      bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'*/}
                {/*      icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}*/}
                {/*    />*/}
                {/*  }*/}
                {/*  name='New Tasks'*/}
                {/*  value='154'*/}
                {/*/>*/}
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor}/>
                            }
                        />
                    }
                    name='Experiments'
                    value={experiments.length}
                />
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <ComplexTable
                    label={'On Going Experiments'}
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}
                />
                {/*<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>*/}
                {/*  <Tasks />*/}
                {/*  <MiniCalendar h='100%' minW='100%' selectRange={false} />*/}
                {/*</SimpleGrid>*/}
            </SimpleGrid>
            {/*<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>*/}
            {/*  <TotalSpent />*/}
            {/*  <WeeklyRevenue />*/}
            {/*</SimpleGrid>*/}
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                {/*<CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />*/}
                <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px'>
                    {/*<DailyTraffic />*/}
                    <PieCard
                        chartData={pieChartData}
                        chartOptions={pieChartOptions}
                    />
                </SimpleGrid>
            </SimpleGrid>

        </Box>
    );
}
