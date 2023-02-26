// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/accounts/components/columnsTable";
import {
  columnsDataColumnsAccount,
} from "views/admin/dataTables/variables/columnsData";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Account() {

    const [login, setLogin] = useState(false);

    useEffect(() => {
        axios.post("https://abtest-shenkar.onrender.com/auth/login",
            {email:"ofirpeleg2111@gmail.com",password:"Aa123456"},{
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json',
                }})
            .then(response => {
                console.log(response.data)
                Cookies.set("jwt", response.data.jwt);
                Cookies.set("email", response.data.email);
                setLogin(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        const jwt = Cookies.get("jwt");
        axios.get('https://abtest-shenkar.onrender.com/accounts/list',
            {   headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [login]);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                spacing={{ base: "20px", xl: "20px" }}>
                <ColumnsTable
                    columnsData={columnsDataColumnsAccount}
                    tableData={data}
                />
            </SimpleGrid>
        </Box>
    );
}
