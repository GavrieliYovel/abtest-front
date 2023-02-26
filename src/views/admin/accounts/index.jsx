// Chakra imports
import {Box, SimpleGrid} from "@chakra-ui/react";
import ColumnsTable from "views/admin/accounts/components/columnsTable";
import {columnsDataColumnsAccount,} from "views/admin/dataTables/variables/columnsData";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Account() {

    const [data, setData] = useState([]);

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

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb='20px'
                spacing={{base: "20px", xl: "20px"}}>
                <ColumnsTable
                    columnsData={columnsDataColumnsAccount}
                    tableData={data}
                    type={"accounts"}
                />
            </SimpleGrid>
        </Box>
    );
}
