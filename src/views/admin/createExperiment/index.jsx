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
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Flex
} from "@chakra-ui/react";


import Select from 'react-select';
import {AddIcon, DeleteIcon} from '@chakra-ui/icons'
import React, {useEffect, useState} from "react";

const countryCodes = require('country-codes-list');
const myCountryCodesObject = countryCodes.customList('countryCode', '{countryNameEn}');
const locationOptions = Object.entries(myCountryCodesObject).map(([value, label]) => {
    return {value, label};
});


// mock data
const typeOptions = [
    {label: 'AB Test', value: 'AB'},
    {label: 'FF', value: 'Feature Flag'},
];
const deviceOptions = [
    {label: 'Desktop', value: 'desktop'},
    {label: 'Console', value: 'console'},
    {label: 'Mobile', value: 'mobile'},
    {label: 'Tablet', value: 'tablet'},
    {label: 'Smart Tv', value: 'smarttv'},
    {label: 'Wearable', value: 'wearable'},
    {label: 'Embedded', value: 'embedded'},
];
const browserOptions = [
    {label: 'Android Browser', value: 'Android Browser'},
    {label: 'Brave', value: 'Brave'},
    {label: 'Chrome', value: 'Chrome'},
    {label: 'Chrome WebView', value: 'Chrome WebView'},
    {label: 'Edge', value: 'Edge'},
    {label: 'Mozilla', value: 'Mozilla'},
    {label: 'Mobile Safari', value: 'Mobile Safari'},
    {label: 'Opera', value: 'Opera [Mini/Mobi/Tablet]'},
    {label: 'Samsung Browser', value: 'Samsung Browser'},
    {label: 'Safari', value: 'Safari'},
    {label: 'Tizen Browser', value: 'Tizen Browser'},

];


export default function Settings() {
    // Chakra Color Mode
    const [selectedTypeOptions, setSelectedTypeOptions] = useState();
    const [selectedLocationOptions, setSelectedLocationOptions] = useState();
    const [selectedDeviceOptions, setSelectedDeviceOptions] = useState();
    const [selectedBrowserOptions, setSelectedBrowserOptions] = useState();

    const selectType = (selected) => {setSelectedTypeOptions(selected)};
    const handleLocationChange = (selected) => {setSelectedLocationOptions(selected)};
    const handleDeviceChange = (selected) => {setSelectedDeviceOptions(selected)};
    const handleBrowserChange = (selected) => {setSelectedBrowserOptions(selected)};

    // Traffic attributes components
    const trafficAttributes = [
        { key:"Location", options: locationOptions, value:selectedLocationOptions, handler:handleLocationChange},
        { key:"Device",options: deviceOptions, value:selectedDeviceOptions, handler:handleDeviceChange},
        { key: "Browser", options: browserOptions, value:selectedBrowserOptions, handler:handleBrowserChange}
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '10px',
            color: "#E0E5F2",
            borderColor: "#E0E5F2"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#A3AED0',
        }),
        multiValue: (styles, {data}) => {
            return {
                ...styles,
                backgroundColor: '#F4F7FE',
                borderRadius: '10px',
            };
        },
        multiValueLabel: (styles, {data}) => ({
            ...styles,
            color: '#4318FF',
        }),
    };

    const { isOpen, onOpen, onClose } = useDisclosure();


    // Attributes component
    const [dynamicAttributes, setFormControls] = useState([]);
    const  addAttribute = (event) => {
        event.preventDefault();
        onClose();
        const key = event.target[0].value;
        const newFormControl = (
            <FormControl marginBottom="10px">
                <FormLabel color="#2B3674">{key}</FormLabel>
                <Input
                    color="#2B3674"
                    type="text"
                    placeholder="value"
                    size="md"
                    borderRadius="10px"
                />
            </FormControl>
        );
        setFormControls([...dynamicAttributes, newFormControl]);
    }
    function removeAttribute(index) {
        const newList = [...dynamicAttributes];
        newList.splice(index, 1);
        setFormControls(newList);
    }


    // Goals component
    const [Goals, setGoals] = useState([0]);
    function addGoal() {
        setGoals([...Goals, 0]);
    }
    function removeGoal() {
        const newList = [...Goals];
        if ( newList.length > 1)
            newList.pop();
        setGoals(newList);
    }


    // Dates component
    const datesLabel = ["Start Date", "End Date"];
    const VariantsLabel = ["Variant A", "Variant B", "Default"];

    return (
        <Box display="flex" justifyContent="center" borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="85%" p={4}
                 borderRadius="30px">
                <Box w="75%">
                    <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Details</Text>
                    <FormControl marginY="10px">
                        <FormLabel color="#2B3674">Name</FormLabel>
                        <Input
                            color= "#2B3674"
                            type="Text"
                            placeholder="Experiment Name"
                            size="md"
                            borderRadius="10px"
                        />
                    </FormControl>

                    <FormControl marginY="10px">
                        <FormLabel color="#2B3674">Type</FormLabel>
                        <Select
                            styles={customStyles}
                            options={typeOptions}
                            value={selectedTypeOptions}
                            onChange={selectType}>
                        </Select>
                    </FormControl>

                    <Box display="flex" justifyContent="space-between">
                        {datesLabel.map((date, index) => (
                            <FormControl w="48%" marginY="10px">
                                <FormLabel color="#2B3674">{date}</FormLabel>
                                <Input type="Date"
                                       placeholder="mm/dd/yyyy"
                                       size="md"
                                       borderRadius="10px"
                                />
                            </FormControl>
                        ))}
                    </Box>

                    <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Test Attributes</Text>
                    {trafficAttributes.map((trafficAttribute, index) => (
                                <Box display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
                                    <FormControl>
                                        <FormLabel color="#2B3674">{trafficAttribute.key}</FormLabel>
                                        <Select
                                            styles={customStyles}
                                            options={trafficAttribute.options}
                                            value={trafficAttribute.value}
                                            isMulti
                                            onChange={trafficAttribute.handler}
                                        />
                                    </FormControl>
                                </Box>
                            ))}

                    {dynamicAttributes.map((attribute, index) => (
                        <Box key={index} display="flex" alignItems="flex-end">
                            {attribute}
                            <IconButton
                                onClick={() => removeAttribute(index)}
                                colorScheme="brand"
                                borderRadius="10px"
                                aria-label="Remove"
                                margin="10px 0px 10px 10px"
                                icon={<DeleteIcon />}
                            />
                        </Box>

                        ))}
                    {/*POPUPPPP*/}
                    <Box display="flex" justifyContent="center" marginY="10px">
                        <Button color="#4318FF" bg="#F4F7FE"  placeSelf="center" onClick={onOpen}>+ Add Attributes</Button>

                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add Attribute</ModalHeader>
                                <ModalCloseButton />
                                <form onSubmit={addAttribute}>
                                    <ModalBody>
                                        <FormControl>
                                            <FormLabel color="#2B3674">New Attribute Key</FormLabel>
                                            <Input type="text" pattern="[\w\s]+"/>
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="brand" mr={3} type="submit">
                                            Add
                                        </Button>
                                        <Button variant="ghost" onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </Modal>
                    </Box>

                    {/*Check how to do placeholder in a number input */}
                    <FormControl marginY="10px">
                        <FormLabel color="#2B3674">Traffic Control By %</FormLabel>
                        <NumberInput max="100" min="5" defaultValue="50">
                            <NumberInputField/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    {selectedTypeOptions?.value === 'AB' ?
                        <Box>
                            <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Variants</Text>
                            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                                {
                                    VariantsLabel.map((variant, index) => (
                                        <FormControl w="48%" marginY="10px">
                                            <FormLabel color="#2B3674">{variant}</FormLabel>
                                            <Input type="Text"
                                                   placeholder={variant}
                                                   size="md"
                                                   borderRadius="10px"
                                                   color="#A3AED0"
                                            />
                                        </FormControl>
                                    ))
                                }
                            </Box>

                        </Box> : <></>
                    }

                    <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Goals</Text>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        {Goals.map((goal, index) => (
                            <FormControl key={index} marginBottom="10px" w="48%">
                                <FormLabel color="#2B3674">Goal {index+1}</FormLabel>
                                <Input
                                    color="#2B3674"
                                    type="text"
                                    placeholder="value"
                                    size="md"
                                    borderRadius="10px"
                                />
                            </FormControl>
                        ))}
                    </Box>
                    <Flex justifyContent="center">
                        <Button color="#4318FF" bg="#F4F7FE" placeSelf="center" onClick={addGoal}>+ Add Goal</Button>
                        <IconButton  colorScheme="brand" borderRadius="10px" aria-label="Remove" margin="10px 0px 10px 10px"
                            icon={<DeleteIcon />} onClick={() => removeGoal()}
                        />
                    </Flex>

                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="70%" marginY="20px">Create Experiment</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
