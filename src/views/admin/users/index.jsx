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
    Box,SimpleGrid,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    columnsDataColumnsUser,
} from "views/admin/dataTables/variables/columnsData";
import Cookies from "js-cookie";
import ColumnsTable from "../accounts/components/columnsTable";

export default function Users() {

        const [data, setData] = useState([]);

        useEffect(() => {
            const jwt = Cookies.get("jwt");
            console.log(jwt);
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
        return (
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
        );

}
