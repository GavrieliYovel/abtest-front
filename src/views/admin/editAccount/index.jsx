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
    Box,
    Button,
    FormControl,
    FormLabel, GridItem,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select, SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {parse} from "stylis";

export default function EditAccount() {

    const [data, setData] = useState([]);
    const [seats, setSeats] = useState([]);
    const [features, setFeatures] = useState([]);
    const [daysToSuspend, setDaysToSuspend] = useState([]);
    const [status, setStatus] = useState([]);
    const [credits, setCredits] = useState([]);


    const { id } = useParams();

    useEffect(() => {
            const jwt = Cookies.get("jwt");
            axios.get(`https://abtest-shenkar.onrender.com/accounts/${id}`,
                {   headers: {
                        'authorization': `${jwt}`,
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
    }, []);

    const handleEditAccount = () => {

    };

    return (
        <Box display="flex" justifyContent={"space-evenly"} borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="70%" p={4}
                 borderRadius="30px">
                <Box w="70%">
                    <Text fontSize="20" fontWeight="bold">Description</Text>
                    <FormControl marginY="10px">
                        <FormLabel>Name</FormLabel>
                        <Input type="Text"
                               placeholder={data.name}
                               size="md"
                               borderRadius="10px"
                               readOnly
                        />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Plan</FormLabel>
                    <Input type="Text"
                           placeholder={data.Plan}
                           size="md"
                           borderRadius="10px"
                           readOnly
                    />
                    </FormControl>
                        <SimpleGrid columns={2} columngap={3} rowgap={2} w="full" marginY={"20px"}>
                        <GridItem colSpan={1} w="80%">
                        <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select placeholder={data.Status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Active</option>
                            <option>Suspended</option>
                            <option>Closed</option>
                        </Select>
                        </FormControl>
                    </GridItem>
                        <GridItem colSpan={1} w="80%">
                            <FormControl>
                        <FormLabel>Days to suspend</FormLabel>
                        <NumberInput max={50} min={0} onChange={(valueString) => setDaysToSuspend(parse(valueString))}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                            </FormControl>
                        </GridItem>
                    </SimpleGrid>
                    <Box w="50%">
                        <Text fontSize="20" fontWeight="bold" marginY="20px">Assets</Text>
                        <FormControl marginY="10px">
                            <FormLabel>Features</FormLabel>
                            <Select placeholder={data.Features} onChange={(e) => setFeatures(e.target.value)}>
                                <option>f</option>
                                <option>u</option>
                                <option>c</option>
                                <option>k</option>
                            </Select>
                        </FormControl>
                        <FormLabel padding={"3px"}>Seats</FormLabel>
                        <NumberInput min={data.Seats} onChange={(valueString) => setSeats(parse(valueString))}>
                            <NumberInputField placeholder={data.Seats}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormLabel padding={"3px"}>Credits</FormLabel>
                        <NumberInput min={data.Credits} onChange={(valueString) => setCredits(parse(valueString))}>
                            <NumberInputField placeholder={data.Credits}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="75%" marginY="30px" marginX="30px" onClick={handleEditAccount}>Save changes</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
