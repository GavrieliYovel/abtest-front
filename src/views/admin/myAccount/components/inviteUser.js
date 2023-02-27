// Chakra imports
import {
    Box,
    Button,
    Flex, FormLabel, GridItem, HStack,
    Icon, IconButton, Input, SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
} from "variables/charts";
import {AddIcon} from "@chakra-ui/icons";

export default function InviteUser() {
    // Chakra Color Mode

    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );
    return (
        <Card p='20px' direction='column' w='40%'>
            <HStack spacing='24px'>
                <Box w='100px'>
            <Text fontSize="17" fontWeight="bold">Invite user:</Text>
                </Box>
                <Box>
                <Input placeholder={"Email"}
                    fontWeight='500'
                    fontSize='15'
                    borderRadius={"10px"}
                    _placeholder={{ fontWeight: "400", color: "secondaryGray.600"}}
                />
                </Box>
                <Box >
                    <IconButton
                        align={"right"}
                        aria-label='Add account'
                        color='blue'
                        icon={<AddIcon />}
                    />
                </Box>
            </HStack>
        </Card>
    );
}
