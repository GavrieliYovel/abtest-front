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
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";
import {useEffect, useState} from "react";
import axios from "axios";


export default function UserReports() {

    const [attributes, setAttributes] = useState([]);
    const [payments, setPayments] = useState([{
        "Succeeded_payments": 88,
        "Failed_payments": 0
    }]);
    const [devices, setDevices] = useState(['desktop', 'mobile', 'tablet', 'wearable']);
    const [devicesCount, setDevicesCount] = useState([1,2,3,4]);
    const [locations, setLocations] = useState(['CL', 'IL', 'US']);
    const [locationsCount, setLocationsCount] = useState([1, 18, 4]);
    const [month1,setMonth1] = useState(1);
    const [month2,setMonth2] = useState(2);

    useEffect(() => {
        axios.get(`https://core-team-final-assignment.onrender.com/BI/experiments/attributes`,
            {   headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setAttributes(response.data.attribute_distribution);
                const deviceData = response.data.attribute_distribution.devices.map(device => device.device)
                const deviceC = response.data.attribute_distribution.devices.map(device => device["count"])
                const locationData = response.data.attribute_distribution.locations.map(location => location.location)
                const locationCount = response.data.attribute_distribution.locations.map(location => location["count"])
                setDevices(deviceData);
                setDevicesCount(deviceC);
                setLocationsCount(locationCount);
                setLocations(locationData);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get(`https://core-team-final-assignment.onrender.com/BI/payments/2023/1`,
            {   headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                const values  = Object.values(response.data);
                setPayments(values);
            })
            .catch(error => {
                console.error(error);
            });


    }, []);

    console.log(payments);

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
        <>
            <SimpleGrid columns={{ base: 2, md: 1, xl: 3}} gap='20px' mb='20px' marginTop={"5rem"}>
                <PieCard title={"Device distribution"} devices={devices} devicescount={devicesCount}/>
                <DailyTraffic title={"Geographic distribution"} countries={locations} locationCount={locationsCount}/>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
                <TotalSpent title={"a"}/>
                <TotalSpent  title={"b"}/>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='60px' mb='20px'>
                <TotalSpent />
                <TotalSpent />
            </SimpleGrid>
        </>
    );
}
