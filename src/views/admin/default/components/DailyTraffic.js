import React from "react";

// Chakra imports
import {Box, Flex, Icon, Spinner, Text, useColorModeValue} from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";

export default function DailyTraffic(props) {
  const { title, countries , locationCount } = props;
  console.log(countries , locationCount);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
      <Card align='center' direction='column' w='100%'>
        <Flex justify='space-between' align='start' px='10px' pt='5px'>
          <Flex flexDirection='column' align='start' me='20px'>
            <Flex w='100%'>
              <Text
                  me='auto'
                  color='secondaryGray.800'
                  fontSize='lg'
                  fontWeight='500'>
                {title}
              </Text>
            </Flex>
            <Flex align='end'>
            </Flex>
          </Flex>
        </Flex>
        <Box h='240px' mt='auto'>
          { locationCount && countries?
              <BarChart
                  chartData={[{name: "value"  ,data:locationCount}]}
                  chartOptions={barChartOptionsDailyTraffic(countries)}
              />: <Spinner />
          }
        </Box>
      </Card>
  );
}
