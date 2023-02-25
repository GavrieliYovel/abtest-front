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

import {
    useLocation
} from "react-router-dom";

import Select from 'react-select';
import {AddIcon, DeleteIcon} from '@chakra-ui/icons'
import React, {useEffect, useState} from "react";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import axios from "axios";

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

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function datetimeLocal(datetime) {
    if (!datetime)
        return "";
    const sz = datetime.length;
    datetime = datetime.replaceAt(sz - 5, '.');
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
}

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Settings() {
    // Chakra Color Mode
    const [selectedTypeOptions, setSelectedTypeOptions] = useState();
    const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
    const [selectedDeviceOptions, setSelectedDeviceOptions] = useState([]);
    const [selectedBrowserOptions, setSelectedBrowserOptions] = useState([]);

    const selectType = (selected) => {setSelectedTypeOptions(selected)};
    const handleLocationChange = (selected) => {setSelectedLocationOptions(selected)};
    //setSelectedLocationOptions([...selectedLocationOptions, ...locationOps]);
    const handleDeviceChange = (selected) => {setSelectedDeviceOptions(selected)};
    const handleBrowserChange = (selected) => {setSelectedBrowserOptions(selected)};

    // Traffic attributes components
    const trafficAttributes = [
        { key:"Location", options: locationOptions, value:selectedLocationOptions, handler:handleLocationChange},
        { key:"Device",options: deviceOptions, value:selectedDeviceOptions, handler:handleDeviceChange},
        { key: "Browser", options: browserOptions, value:selectedBrowserOptions, handler:handleBrowserChange}
    ];

    const customStyles = {
        option: provided => ({
            ...provided,
            color: '#2B3674'
        }),
        singleValue: provided => ({
            ...provided,
            color: '#2B3674'
        }),
        control: (provided) => ({
            ...provided,
            borderRadius: '10px',
            color: "#E0E5F2",
            borderColor: "#E0E5F2"
        }),
        value :(provided) => ({
            ...provided,
            color: '#2B3674',
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

    const query = useQuery();
    const id = query.get("id");


    const [experiment, setExperiment] = useState({});
    const getExperimentById = (id) => {
        axios.get(`https://core-team-final-assignment.onrender.com/growth/experiment/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setExperiment(response.data);
                    const locationOps = locationOptions.filter(location => response.data.test_attributes.location.includes(location.value));
                    const deviceOps = deviceOptions.filter(device => response.data.test_attributes.device.includes(device.value));
                    const browserOps = browserOptions.filter(browser => response.data.test_attributes.browser.includes(browser.value));
                    setSelectedLocationOptions([...selectedLocationOptions, ...locationOps]);
                    setSelectedDeviceOptions([...selectedDeviceOptions, ...deviceOps]);
                    setSelectedBrowserOptions([...selectedBrowserOptions, ...browserOps]);
                }
            })
            .catch(err => {
                    console.log(err);
                }
            )

    }
    useEffect(() => {
        getExperimentById(id);
    }, []);

    // Dates component
    const datesLabel = ["Start Date", "End Date"];
    const VariantsLabel = ["Variant A", "Variant B", "Default"];


    return (
        <Box display="flex" justifyContent="center" borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="85%" p={4}
                 borderRadius="30px">
                <Box w="75%">
                    <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Details {experiment?.type}</Text>
                    <FormInput title={"Name"} type={"text"} value={experiment.name}></FormInput>
                    <FormControl marginY="10px">
                        <FormLabel color="#2B3674">Type</FormLabel>
                        <Select
                            styles={customStyles}
                            options={typeOptions}
                            value={experiment.type === 'a-b' ? typeOptions[0] : typeOptions[1]}
                            onChange={selectType}>
                        </Select>
                    </FormControl>


                    <Box display="flex" justifyContent="space-between">
                        {datesLabel.map((date, index) => (
                            <FormInput key={index} title={date} type={"datetime-local"} size={true} value={index === 0 ? datetimeLocal(experiment.duration?.start_time) : datetimeLocal(experiment.duration?.end_time)}></FormInput>
                        ))}
                    </Box>

                    <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Test Attributes</Text>
                    {trafficAttributes.map((trafficAttribute, index) => (
                                <Box key={index} display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
                                    <FormSelect title={trafficAttribute.key} styles={customStyles} options={trafficAttribute.options} value={trafficAttribute.value} handler={trafficAttribute.handler}></FormSelect>
                                </Box>
                    ))}

                    {dynamicAttributes.map((attribute, index) => (
                        <Box key={index} display="flex" alignItems="flex-end">
                            <FormInput title={attribute} type={"text"} size={false}></FormInput>
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
                        <FormLabel color="#2B3674">Traffic Control </FormLabel>
                        <NumberInput color="#2B3674" max="100" min="5" value={experiment.traffic_percentage}>
                            <NumberInputField/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    {experiment.type === 'a-b' ?
                        <Box>
                            <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Variants</Text>
                            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                                {/*console.log(variants)*/}
                                    <FormInput key={0} title={VariantsLabel[0]} type={"Text"} size={true} value={experiment.variants_ab.A}></FormInput>
                                    <FormInput key={1} title={VariantsLabel[1]} type={"Text"} size={true} value={experiment.variants_ab.B}></FormInput>
                                    <FormInput key={2} title={VariantsLabel[2]} type={"Text"} size={true} value={experiment.variants_ab.C}></FormInput>
                            </Box>

                        </Box> : <></>
                    }

                    <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Goals</Text>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        {Goals.map((goal, index) => (
                            <FormInput key={index} title={"Goal " + (index+1)} type={"Text"} size={true}></FormInput>
                        ))}
                    </Box>
                    <Flex justifyContent="center">
                        <Button color="#4318FF" bg="#F4F7FE" placeSelf="center" onClick={addGoal}>+ Add Goal</Button>
                        <IconButton  colorScheme="brand" borderRadius="10px" aria-label="Remove" margin="10px 0px 10px 10px"
                            icon={<DeleteIcon />} onClick={() => removeGoal()}
                        />
                    </Flex>

                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="70%" marginY="20px">Edit Experiment</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
