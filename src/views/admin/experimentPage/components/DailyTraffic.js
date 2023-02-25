import React, {useState} from "react";

// Chakra imports
import {Box, Flex, FormControl, FormLabel, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import Select from "react-select";

const goalsOptions = [
    {label: 'goal1', value: 'goal1'},
    {label: 'goal2', value: 'goal2'}
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        color: "#2B3674",
        borderColor: "#E0E5F2"
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.menuIsOpen ? "#2B3674" : "#2B3674",
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'blue' : "#2B3674",
    }),
};
export default function DailyTraffic(props) {
    const { ...rest } = props;

    const [selectedGoalOptions, setSelectedGoalOptions] = useState();

    const handleGoalChange = (selected) => {
        setSelectedGoalOptions(selected);
    };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
        <Flex textAlign="center" justifyContent="center" alignItems="center" w="100%">
            <Text
                color='secondaryGray.600'
                fontSize='lg'
                fontWeight='500'>
                {rest.name}
            </Text>
        </Flex>
        <Box display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
            <FormControl>
                <Select
                    styles={customStyles}
                    options={goalsOptions}
                    // value={selectedGoalOptions}
                    defaultValue={goalsOptions[0]}
                    onChange={handleGoalChange}
                />
            </FormControl>
        </Box>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={ rest.chartData }
          chartOptions={ rest.chartOptions }
        />
      </Box>
    </Card>
  );
}
