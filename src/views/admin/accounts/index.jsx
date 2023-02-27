// Chakra imports
import {Alert, AlertIcon, Box, SimpleGrid} from "@chakra-ui/react";
import ColumnsTable from "views/admin/accounts/components/columnsTable";
import {columnsDataColumnsAccount,} from "views/admin/dataTables/variables/columnsData";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Account() {

    const [data, setData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertSata, setalertSata] = useState('');

    useEffect(() => {
        const jwt = Cookies.get("jwt");
        axios.get('https://abtest-shenkar.onrender.com/accounts/list',
            {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const refreshData = (id) => {
        let newData = data.filter(data => data.id !== id);
        let user = data.filter(data => data.id === id);
        setShowAlert(true);
            user[0].Status = "close"
            setData([...newData ,...user])
            setalertSata(`${user[0].Name} was closed!!`)
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            {showAlert && (
                <Alert status='success' mb='20px'>
                    <AlertIcon />
                    {alertSata}
                </Alert>
            )}
            <SimpleGrid
                mb='20px'
                spacing={{base: "20px", xl: "20px"}}>
                <ColumnsTable
                    columnsData={columnsDataColumnsAccount}
                    tableData={data}
                    type={"accounts"}
                    func={refreshData}
                />
            </SimpleGrid>
        </Box>
    );
}
