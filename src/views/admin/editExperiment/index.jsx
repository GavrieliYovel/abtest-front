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
import {Form} from "react-bootstrap";
import Cookies from "js-cookie";

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
    const jwt = Cookies.get("jwt");
    const render = 'https://core-team-final-assignment-dev.onrender.com';

    // Chakra Color Mode
    const [selectedTypeOptions, setSelectedTypeOptions] = useState();
    const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
    const [selectedDeviceOptions, setSelectedDeviceOptions] = useState([]);
    const [selectedBrowserOptions, setSelectedBrowserOptions] = useState([]);
    const [details, setDetail] = useState({});

    const selectType = (selected) => {setSelectedTypeOptions(selected)};
    const handleLocationChange = (selected) => { setSelectedLocationOptions(selected)};
    const handleDeviceChange = (selected) => {setSelectedDeviceOptions(selected)};
    const handleBrowserChange = (selected) => {setSelectedBrowserOptions(selected)};

    // Traffic attributes components
    const trafficAttributes = [
        { key:"Location", options: locationOptions, value:selectedLocationOptions, handler:handleLocationChange},
        { key:"Device",options: deviceOptions, value:selectedDeviceOptions, handler:handleDeviceChange},
        { key: "Browser", options: browserOptions, value:selectedBrowserOptions, handler:handleBrowserChange}
    ];

    const getDetails = () => {
        console.log(jwt);
        axios.get(`${render}/growth/account`, {
            headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setDetail(response.data);
                } else
                    console.log("Failed");
            })
            .catch(err => {
                    console.log(err);
                }
            )
    }

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
    const [dynamicAttributes, setDynamicAttributes] = useState([]);
    const  addAttribute = (event) => {
        event.preventDefault();
        onClose();
        const key = event.target[0].value;
        setDynamicAttributes([...dynamicAttributes, {label: key, value: null}]);
    }
    function removeAttribute(index) {
        const newList = [...dynamicAttributes];
        newList.splice(index, 1);
        setDynamicAttributes(newList);
    }

    // Goals component
    const [Goals, setGoals] = useState([""]);
    function addGoal() {
        setGoals([...Goals, ""]);
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
        axios.get(`${render}/growth/experiment/${id}`, {
            headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {

                    setExperiment(response.data);
                    response.data.type === "a-b" ? setSelectedTypeOptions(typeOptions[0]) : setSelectedTypeOptions(typeOptions[1]);
                    const locations = response.data.testAttributes.location.map(item => item.value);
                    const devices = response.data.testAttributes.device.map(item => item.value);
                    const browsers = response.data.testAttributes.browser.map(item => item.value);
                    const locationOps = locationOptions.filter(location => locations.includes(location.value));
                    const deviceOps = deviceOptions.filter(device => devices.includes(device.value));
                    const browserOps = browserOptions.filter(browser => browsers.includes(browser.value));
                    setSelectedLocationOptions([ ...locationOps]);
                    setSelectedDeviceOptions([...deviceOps]);
                    setSelectedBrowserOptions([...browserOps]);

                    const goals = response.data.goals.map(item => item.name);
                    setGoals([...goals]);

                    const dynamicKeys = Object.keys(response.data?.customAttributes);
                    const dynamicAtts = dynamicKeys.map(key => ({label: key, value: response.data?.customAttributes[key][0].value}))

                    setDynamicAttributes([...dynamicAtts]);

                }
            })
            .catch(err => {
                    console.log(err);
                }
            )

    }
    useEffect(() => {
        getExperimentById(id);
        getDetails();
    }, []);


    const edit = (event) => {
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

        experiment["accountId"] = details.accountId;
        experiment["status"] = "active";

        console.log({experiment: experiment, goals: Goals});

        axios.put(`${render}/growth/experiment/${id}`, {experiment: experiment, goals: []}, {
            headers: { 'authorization': `${jwt}`, "Accept": 'application/json', "Content-Type": 'application/json'}
        })
            .then(response => {
                console.log(response);
                window.location.href = `/admin/experimentPage?id=${id}`;
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
        <Form onSubmit={edit}>
            <Box display="flex" justifyContent="center" borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
                <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="85%" p={4}
                     borderRadius="30px">
                    <Box w="75%">
                        <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Details</Text>
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
                                <FormInput key={index} title={date} type={"datetime-local"} size={true} value={index === 0 ? experiment.duration?.startTime : experiment.duration?.endTime}></FormInput>
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
                                <FormInput title={attribute.label} name={"dynamic"} type={"text"}  value={attribute.value} size={false}></FormInput>
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

                        {/*/!*Check how to do placeholder in a number input *!/*/}
                        <FormControl marginY="10px">
                            <FormLabel color="#2B3674">Traffic Control </FormLabel>
                            <NumberInput color="#2B3674" max="100" min="5" value={experiment.trafficPercentage} name={"trafficPercentage"}>
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
                                    <FormInput key={0} title={VariantsLabel[0]} type={"Text"} size={true} value={experiment.variantsAB?.A} name={"variant A"}></FormInput>
                                    <FormInput key={1} title={VariantsLabel[1]} type={"Text"} size={true} value={experiment.variantsAB?.B} name={"variant B"}></FormInput>
                                    <FormInput key={2} title={VariantsLabel[2]} type={"Text"} size={true} value={experiment.variantsAB?.C} name={"variant C"}></FormInput>
                                </Box>

                            </Box> : <></>
                        }

                        <Text color="#2B3674" fontSize="20" fontWeight="bold" marginY="20px">Goals</Text>
                        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                            {Goals.map((goal, index) => (
                                <FormInput key={index} name={"Goal " + (index+1)} title={"Goal " + (index+1)} type={"Text"} value={goal} size={true}></FormInput>
                            ))}
                        </Box>
                        <Flex justifyContent="center">
                            <Button color="#4318FF" bg="#F4F7FE" placeSelf="center" onClick={addGoal}>+ Add Goal</Button>
                            <IconButton  colorScheme="brand" borderRadius="10px" aria-label="Remove" margin="10px 0px 10px 10px"
                                         icon={<DeleteIcon />} onClick={() => removeGoal()}
                            />
                        </Flex>

                        <Box display="flex" justifyContent="center">
                            <Button variant="brand" w="70%" marginY="20px" type={"submit"}>Save Changes</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Form>
    );
}
