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
    Alert, AlertIcon,
    Box, SimpleGrid,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    columnsDataColumnsUser,
} from "views/admin/dataTables/variables/columnsData";
import Cookies from "js-cookie";
import ColumnsTable from "../accounts/components/columnsTable";
//  import { useContext } from 'react';
//  import { AuthContext } from 'contexts/AuthContext';
export default function Users() {

    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSata, setalertSata] = useState('');

        useEffect(() => {
            const jwt = Cookies.get("jwt");
            axios.get('https://abtest-shenkar.onrender.com/users/list',
                {   headers: {
                        'authorization': `${jwt}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    setData(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }, []);

    const refreshData = (id) => {
        let newData = data.filter(data => data.id !== id);
        let user = data.filter(data => data.id === id);
        setShowAlert(true);
        if(user[0].Type === 'user' || user[0].Type === 'admin' ){
            setalertSata(`${user[0].Name} was Deleted!!`)
            setData(newData)
        }else {
            user[0].Status = "close"
            setData([...newData ,...user])
            setalertSata(`${user[0].Name} was closed!!`)
        }
    }

        return (
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
        );

}
