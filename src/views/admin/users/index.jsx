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
    Box, IconButton,
    Table,
    TableCaption, TableContainer, Tbody, Td,
    Th, Thead, Tr
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import { Badge } from '@chakra-ui/react'

export default function Settings() {
    return (
        <Box display="flex" marginTop={"20px"} justifyContent={"space-evenly"} borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="80%" p={4}
                 borderRadius="30px">
                <Box w="100%">
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>users</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>a</Td>
                        <Td>b</Td>
                        <Td>c</Td>
                        <Td><Badge variant='outline' colorScheme='yellow' border-radius={"3px"}>
                            Suspended
                        </Badge></Td>
                        <Td><IconButton
                            color='red'
                            icon={<DeleteIcon />}
                        /></Td>
                    </Tr>
                    <Tr>
                        <Td>d</Td>
                        <Td>e</Td>
                        <Td>f</Td>
                        <Td><Badge variant='outline' colorScheme='green' border-radius={"3px"}>
                            Active
                        </Badge></Td>
                        <Td><IconButton
                            color='red'
                            icon={<DeleteIcon />}
                        /></Td>
                    </Tr>
                    <Tr>
                        <Td>f</Td>
                        <Td>u</Td>
                        <Td>c</Td>
                        <Td><Badge variant='outline' colorScheme='red' border-radius={"3px"}>
                            Closed
                        </Badge></Td>
                        <Td><IconButton
                            color='red'
                            icon={<DeleteIcon />}
                        /></Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
                   </Box>
            </Box>
        </Box>
    );
}
