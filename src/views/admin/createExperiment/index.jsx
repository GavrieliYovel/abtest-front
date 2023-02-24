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
    Text
} from "@chakra-ui/react";
import Select from 'react-select';
import {AddIcon} from '@chakra-ui/icons'
import {useEffect, useState} from "react";

const countryCodes = require('country-codes-list');
const myCountryCodesObject = countryCodes.customList('countryCode', '{countryNameEn}');
const locationOptions = Object.entries(myCountryCodesObject).map(([value, label]) => {
    return {value, label};
});

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
    const [selectedDeviceOptions, setSelectedDeviceOptions] = useState([]);
    const [selectedTypeOptions, setSelectedTypeOptions] = useState();
    const [selectedLocationOptions, setSelectedLocationOptions] = useState();
    const [selectedBrowserOptions, setSelectedBrowserOptions] = useState();

    const handleDeviceChange = (selected) => {
        setSelectedDeviceOptions(selected);
    };
    const handleLocationChange = (selected) => {
        setSelectedLocationOptions(selected);
    };
    const handleBrowserChange = (selected) => {
        setSelectedBrowserOptions(selected);
    };
    const selectType = (selected) => {
        setSelectedTypeOptions(selected);
    };

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
                        />
                    </FormControl>

                    <FormControl marginY="10px">
                        <FormLabel>Type</FormLabel>
                        <Select
                            styles={customStyles}
                            options={typeOptions}
                            value={selectedTypeOptions}
                            onChange={selectType}>
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
                        <FormControl w="45%" marginY="10px">
                            <FormLabel>Start Date</FormLabel>
                            <Input type="Date"
                                   placeholder="mm/dd/yyyy"
                                   size="md"
                                   borderRadius="10px"

                            />
                        </FormControl>

                        <FormControl w="45%" marginY="10px">
                            <FormLabel>End Date</FormLabel>
                            <Input type="Date"
                                   placeholder="mm/dd/yyyy"
                                   size="md"
                                   borderRadius="10px"
                            />
                        </FormControl>

                    </Box>
                    <Text fontSize="20" fontWeight="bold" marginY="20px">Test Attributes</Text>
                    <Box display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
                        <FormControl>
                            <FormLabel>Location</FormLabel>
                            <Select
                                styles={customStyles}
                                options={locationOptions}
                                value={selectedLocationOptions}
                                isMulti
                                onChange={handleLocationChange}
                            />
                        </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
                        <FormControl>
                            <FormLabel>Device</FormLabel>
                            <Select
                                styles={customStyles}
                                options={deviceOptions}
                                isMulti
                                value={selectedDeviceOptions}
                                onChange={handleDeviceChange}
                            />
                        </FormControl>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
                        <FormControl>
                            <FormLabel>Browser</FormLabel>
                            <Select
                                styles={customStyles}
                                options={browserOptions}
                                isMulti
                                value={selectedBrowserOptions}
                                onChange={handleBrowserChange}
                            />
                        </FormControl>
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
                    {selectedTypeOptions?.value === 'AB' ?
                        <Box>
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
                        </Box> : <></>
                    }


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
    );


}
