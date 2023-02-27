// Chakra imports
import {Box, Flex, Text, Select, useColorModeValue, Spinner} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React from "react";

export default function Conversion(props) {
  const { title , devices , devicescount} = props;
  console.log(devicescount , devices);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
      "0px 18px 40px rgba(112, 144, 176, 0.12)",
      "unset"
  );

  return (
      <Card p='20px' align='center' direction='column' w='100%'>
        <Flex
            px={{ base: "0px", "2xl": "10px" }}
            justifyContent='space-between'
            alignItems='center'
            w='100%'
            mb='8px'>
          <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
            {title}
          </Text>
          <Select
              fontSize='sm'
              variant='subtle'
              defaultValue='monthly'
              width='unset'
              fontWeight='700'>
            <option value='daily'>Daily</option>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
          </Select>
        </Flex>
        {devices && devicescount ?
            <PieChart
                h='100%'
                w='100%'
                chartData={devicescount}
                chartOptions={pieChartOptions(devices)}
            /> : <Spinner />
        }
        <Card
            bg={cardColor}
            flexDirection='row'
            boxShadow={cardShadow}
            w='100%'
            p='15px'
            px='20px'
            mt='15px'
            mx='auto'>
        </Card>
      </Card>
  );
}
