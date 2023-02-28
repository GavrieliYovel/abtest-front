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


    const [showDaysInput, setShowDaysInput] = useState(false);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setShowDaysInput(e.target.value === "suspended");
    };
    const [data, setData] = useState([]);
    const [plan, setPlan] = useState([]);
    const [seats, setSeats] = useState(0);
    const [features, setFeatures] = useState();
    const [suspensionTime, setSuspensionTime] = useState(0);
    const [status, setStatus] =useState("");;
    const [credits, setCredits] = useState(0);
    const {id} = useParams();
    const jwt = Cookies.get("jwt");

    useEffect(() => {
        axios.get(`https://abtest-shenkar.onrender.com/accounts/${id}`,
            {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            setData(response.data);
            setPlan(response.data.plan);
        }, []);
    });

    const handleSeatsChange = (value) => setSeats(value);
    const handleCreditsChange = (value) => setCredits(value);
    const handleDaysChange = (value) => setSuspensionTime(value);


    const handleEditAccount = async () => {
        await axios.put(`https://abtest-shenkar.onrender.com/accounts/${id}`, {
            status,
            seats,
            credits,
            features,
            suspensionTime,
        },
            {   headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
        });
        window.location.href="/admin/accounts"
    };

    const getFe = () => {
        axios.get('https://abtest-shenkar.onrender.com/assets/features/list',
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            console.log(response);
        }, []);
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
                        <Select placeholder="Select Status" onChange={handleStatusChange}>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="closed">Closed</option>
                        </Select>
                        </FormControl>
                    </GridItem>
                        <GridItem colSpan={1} w="80%">
                            {showDaysInput && (
                            <FormControl>

                        <FormLabel>Days to suspend</FormLabel>
                        <NumberInput max={50} min={0} onChange={handleDaysChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                            </FormControl>
                            )}
                        </GridItem>
                    </SimpleGrid>
                    <Box w="50%">
                        <Text fontSize="20" fontWeight="bold" marginY="20px">Assets</Text>
                        <FormControl marginY="10px">
                            <FormLabel>Features</FormLabel>
                            <Select placeholder={data.Features} onChange={(e) => setFeatures(e.target.value)}>
                                <option>a-b test</option>
                                <option>flag</option>
                                <option>traffic</option>
                            </Select>
                        </FormControl>
                        <FormLabel padding={"3px"}>Seats</FormLabel>
                        <NumberInput min={0} onChange={handleSeatsChange}>
                            <NumberInputField placeholder={data.Seats}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormLabel padding={"3px"}>Credits</FormLabel>
                        <NumberInput min={0} onChange={handleCreditsChange}>
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
