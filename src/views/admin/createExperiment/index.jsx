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
    FormLabel,
    IconButton,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text
} from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'
import React from "react";

export default function Settings() {
    // Chakra Color Mode
    return (
        <Box display="flex" justifyContent="center" borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="85%" p={4}
                 borderRadius="30px">

                <Box w="75%">
                    <Text fontSize="20" fontWeight="bold" marginY="20px">Details</Text>
                    <FormControl marginY="10px">
                        <FormLabel>Name</FormLabel>
                        <Input type="Text"
                               placeholder="Experiment Name"
                               size="md"
                               borderRadius="10px"
                               color="#A3AED0"
                        />
                    </FormControl>

                    <FormControl marginY="10px">
                        <FormLabel>Type</FormLabel>
                        <Select placeholder="Select Experiment Type.."
                                size="md"
                                borderRadius="10px"
                                color="#A3AED0">
                            <option>Type</option>
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
                        <FormControl w="45%" marginY="10px">
                            <FormLabel>Start Date</FormLabel>
                            <Input type="Date"
                                   placeholder="Start Date"
                                   size="md"
                                   borderRadius="10px"
                                   color="#A3AED0"
                            />
                            {/*<IconButton*/}
                            {/*    variant="outline"*/}
                            {/*    colorScheme="brand"*/}
                            {/*    borderRadius="10px"*/}
                            {/*    aria-label="Call Fred"*/}
                            {/*    fontSize="20px"*/}
                            {/*    icon={<CalendarIcon/>}/>*/}
                        </FormControl>

                        <FormControl w="45%" marginY="10px">
                            <FormLabel>End Date</FormLabel>
                            <Input type="Date"
                                   placeholder="End Date"
                                   size="md"
                                   borderRadius="10px"
                                   color="#A3AED0"
                            />
                        </FormControl>

                    </Box>
                    <Text fontSize="20" fontWeight="bold" marginY="20px">Test Attributes</Text>
                    <Box display="flex" justifyContent="space-between" alignItems="end" gap="20px">
                        <FormControl>
                            <FormLabel>Location</FormLabel>
                            <Select placeholder="Location"
                                    size="md"
                                    borderRadius="10px"
                                    color="#A3AED0">
                                <option>Location</option>
                            </Select>
                        </FormControl>
                        <IconButton
                            borderRadius="12px"
                            color="#4318FF"
                            bg="#F4F7FE"
                            aria-label="Plus"
                            fontSize="15px"
                            icon={<AddIcon/>}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="end" gap="20px">
                        <FormControl>
                            <FormLabel>Device</FormLabel>
                            <Select placeholder="Device"
                                    size="md"
                                    borderRadius="10px"
                                    color="#A3AED0">
                                <option>Device</option>
                            </Select>
                        </FormControl>
                        <IconButton
                            borderRadius="12px"
                            color="#4318FF"
                            bg="#F4F7FE"
                            aria-label="Plus"
                            fontSize="15px"
                            icon={<AddIcon/>}
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="end" gap="20px">
                        <FormControl>
                            <FormLabel>Browser</FormLabel>
                            <Select placeholder="Browser"
                                    size="md"
                                    borderRadius="10px"
                                    color="#A3AED0">
                                <option>Browser</option>
                            </Select>
                        </FormControl>
                        <IconButton
                            borderRadius="12px"
                            color="#4318FF"
                            bg="#F4F7FE"
                            aria-label="Plus"
                            fontSize="15px"
                            icon={<AddIcon/>}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" marginY="10px">
                        <Button color="#4318FF" bg="#F4F7FE" w="50%" placeSelf="center">+ Add Attributes</Button>
                    </Box>

                    {/*Check how to do placeholder in a number input */}
                    <FormControl marginY="10px">
                        <FormLabel>Traffic Control By %</FormLabel>
                        <NumberInput max="100" min="5" defaultValue="50">
                            <NumberInputField/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>


                    <Text fontSize="20" fontWeight="bold" marginY="20px">Variants</Text>
                    <Box display="flex" justifyContent="space-between">
                        <FormControl w="45%" marginY="10px">
                            <FormLabel>Variant A</FormLabel>
                            <Input type="Text"
                                   placeholder="Variant A"
                                   size="md"
                                   borderRadius="10px"
                                   color="#A3AED0"
                            />
                        </FormControl>

                        <FormControl w="45%" marginY="10px">
                            <FormLabel>Variant B</FormLabel>
                            <Input type="Text"
                                   placeholder="Variant B"
                                   size="md"
                                   borderRadius="10px"
                                   color="#A3AED0"
                            />
                        </FormControl>

                    </Box>

                    <FormControl w="45%" marginY="10px">
                        <FormLabel>Default</FormLabel>
                        <Input type="Text"
                               placeholder="Default"
                               size="md"
                               borderRadius="10px"
                               color="#A3AED0"
                        />
                    </FormControl>

                    <Text fontSize="20" fontWeight="bold" marginY="20px">Goals</Text>
                    <Box display="flex" alignItems="end" gap="20px" marginY="10px">
                        <FormControl w="45%">
                            <FormLabel>Goal 1</FormLabel>
                            <Input type="Text"
                                   placeholder="Goal 1"
                                   size="md"
                                   borderRadius="10px"
                                   color="#A3AED0"
                            />
                        </FormControl>
                        <IconButton
                            borderRadius="12px"
                            color="#4318FF"
                            bg="#F4F7FE"
                            aria-label="Plus"
                            fontSize="15px"
                            icon={<AddIcon/>}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="70%" marginY="20px">Create Experiment</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )

}
