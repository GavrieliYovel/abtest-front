// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    useDisclosure
} from "@chakra-ui/react";


import Select from 'react-select';
import {DeleteIcon} from '@chakra-ui/icons'
import React, {useState} from "react";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import {Form} from "react-bootstrap";
import axios from "axios";

const countryCodes = require('country-codes-list');
const myCountryCodesObject = countryCodes.customList('countryCode', '{countryNameEn}');
const locationOptions = Object.entries(myCountryCodesObject).map(([value, label]) => {
    return {value, label};
});

// mock data
const typeOptions = [
    {label: 'AB Test', value: 'a-b'},
    {label: 'Feature Flag', value: 'f-f'},
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
    const [selectedTypeOptions, setSelectedTypeOptions] = useState({...typeOptions[1]});
    const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
    const [selectedDeviceOptions, setSelectedDeviceOptions] = useState([]);
    const [selectedBrowserOptions, setSelectedBrowserOptions] = useState([]);

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
        setFormControls([...dynamicAttributes, key]);
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

    const create = (event) => {
        event.preventDefault();
        const form = event.target;
        const experiment = {};
        experiment["name"] = form[0].value;
        experiment["type"] = selectedTypeOptions.value;

        experiment["duration"] = {
            startTime: form[2].value,
            endTime: form[3].value
        };

        experiment["testAttributes"] = {
            location: selectedLocationOptions.map( location => ({value: location.value})),
            device: selectedDeviceOptions.map(device => ({value: device.value})),
            browser: selectedBrowserOptions.map(browser => ({value: browser.value}))
        }
        const dynamics = document.querySelectorAll('input[name="dynamic"]');
        const customAttributes = {};
        dynamics.forEach((input) => {
            const attributeName = input.getAttribute("title");
            const attributeValue = input.value;
            customAttributes[attributeName] = [{value: attributeValue}];
        });
        experiment["customAttributes"] = customAttributes;

        experiment["trafficPercentage"] =  Number(document.querySelectorAll('input[name="trafficPercentage"]')[0].value);

        if(selectedTypeOptions.value === 'a-b') {
            const variants = document.querySelectorAll('input[name^="variant"]');
            experiment["variantsAB"] = {
                A: variants[0].value,
                B: variants[1].value,
                C: variants[2].value
            }
        } else {
            experiment["variantsFF"] = {
                ON: true,
                OFF: false
            }
        }

        const goals = document.querySelectorAll('input[name^="Goal"]');
        const Goals = [];
        goals.forEach( input => {
            Goals.push({name: input.value});
        });

        experiment["accountId"] = "63b9ff3f28ce812bf358d0b5";
        experiment["status"] = "active";

        console.log({experiment: experiment, goals: Goals});

        axios.post("https://core-team-final-assignment.onrender.com/growth/experiment/new", {experiment: experiment, goals: Goals}, {headers: { "Accept": 'application/json', "Content-Type": 'application/json'}})
            .then(response => {
                console.log(response);
                window.location.href = '/admin/experiments';
            })
            .catch(err => {
                alert(err.response.data.message);
                console.log(err);
            })

    }

    // Dates component
    const datesLabel = ["Start Date", "End Date"];
    const VariantsLabel = ["Variant A", "Variant B", "Default"];

    return (
        <Form onSubmit={create}>
            <Box display="flex" justifyContent="center" borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
                <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="85%" p={4}
                     borderRadius="30px">
                    <Box w="75%">
                        <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Details</Text>
                        <FormInput title={"Name"} type={"text"}></FormInput>
                        <FormControl marginY="10px">
                            <FormLabel color="#2B3674">Type</FormLabel>
                            <Select
                                styles={customStyles}
                                options={typeOptions}
                                value={selectedTypeOptions}
                                defaultValue={typeOptions[1]}
                                onChange={selectType}>
                            </Select>
                        </FormControl>

                        <Box display="flex" justifyContent="space-between">
                            {datesLabel.map((date, index) => (
                                <FormInput title={date} name={date} type={"datetime-local"} size={true}></FormInput>
                            ))}
                        </Box>

                        <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Test Attributes</Text>
                        {trafficAttributes.map((trafficAttribute, index) => (
                            <Box key={index} display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
                                <FormSelect title={trafficAttribute.key}  styles={customStyles} options={trafficAttribute.options} value={trafficAttribute.value} handler={trafficAttribute.handler}></FormSelect>
                            </Box>
                        ))}

                        {dynamicAttributes.map((attribute, index) => (
                            <Box key={index} display="flex" alignItems="flex-end">
                                <FormInput title={attribute} name={"dynamic"} type={"text"} size={false}></FormInput>
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

                            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
                                <ModalOverlay />
                                <ModalContent style={{ alignSelf: 'center' }}>
                                    <ModalHeader>Add Attribute</ModalHeader>
                                    <ModalCloseButton />
                                    <form onSubmit={addAttribute}>
                                        <ModalBody>
                                            <FormControl>
                                                <FormLabel color="#2B3674">New Attribute Key</FormLabel>
                                                <Input type="text" pattern="\w+"/>
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
                            <NumberInput max="100" min="5" defaultValue="20" name={"trafficPercentage"}>
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        {selectedTypeOptions?.value === 'a-b' ?
                            <Box>
                                <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Variants</Text>
                                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                                    {
                                        VariantsLabel.map((variant, index) => (
                                            <FormInput key={index} name={"variant " + variant} title={variant} type={"Text"} size={true}></FormInput>
                                        ))
                                    }
                                </Box>

                            </Box> : <></>
                        }

                        <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Goals</Text>
                        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                            {Goals.map((goal, index) => (
                                <FormInput key={index} name={"Goal " + (index+1)} title={"Goal " + (index+1)} type={"Text"} size={true}></FormInput>
                            ))}
                        </Box>
                        <Flex justifyContent="center">
                            <Button color="#4318FF" bg="#F4F7FE" placeSelf="center" onClick={addGoal}>+ Add Goal</Button>
                            <IconButton  colorScheme="brand" borderRadius="10px" aria-label="Remove" margin="10px 0px 10px 10px"
                                         icon={<DeleteIcon />} onClick={() => removeGoal()}
                            />
                        </Flex>

                        <Box display="flex" justifyContent="center">
                            <Button variant="brand" w="70%" marginY="20px" type={"submit"}>Create Experiment</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Form>
    );
}
