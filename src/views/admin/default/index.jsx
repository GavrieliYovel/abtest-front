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
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, {useEffect, useState} from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import axios from "axios";
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();
export default function UserReports() {
  // Chakra Color Mode
    const [payments, setPayments] = useState([]);
    const [MRR, setMRR] = useState([]);
    const [ARR, setARR] = useState([]);
    const [DRR, setDRR] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [attribute_distribution, setAttribute_distribution] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    useEffect(() => {
        const getPayments = () => {
            axios.get(`https://core-team-final-assignment.onrender.com/BI/payments/${year}/${month}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                setPayments(response.data);
                console.log("PAY" + payments  )
                console.log("PAYRES", response.data);
            })
        };
        const getMRR = () => {
            axios.get(`https://core-team-final-assignment.onrender.com/BI/MRR/${year}/${month}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                setMRR(response.data);
                console.log("MRR" + response.data )
            })
        };
        const getDRR = () => {
            axios.get(`https://core-team-final-assignment.onrender.com/BI/DRR/${year}/${month}/${day}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                setDRR(response.data);
            })
        };
        const getARR = () => {
            axios.get(`https://core-team-final-assignment.onrender.com/BI/ARR/${year}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                setARR(response.data);
            })
        };

        const getMonthly = () => {
            axios.get(`https://core-team-final-assignment.onrender.com/BI/experiments/${year}/${month}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                setMonthly(response.data.sum);
            })
        };
        const getDevice = () => {
            axios.get(`https://core-team-final-assignment.onrender.com/BI/experiments/attributes`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                setAttribute_distribution(response.data.attribute_distribution);
            })
        };
        getPayments();
        getMRR();
        getDRR();
        getARR();
        getMonthly();
        getDevice();
    }, []);

    return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value='$642.39'
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
