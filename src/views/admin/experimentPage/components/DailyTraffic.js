import React, {useEffect, useState} from "react";

// Chakra imports
import {Box, Flex, FormControl, FormLabel, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import Chart from "react-apexcharts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import Select from "react-select";
import axios from "axios";
import ColumnChart from "components/charts/BarChart";


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

async function fetchOnce(path) {
    try {
        console.log(path);
        return await axios.get(path);
    } catch (err) {
        console.log(err);
    }

}

export default function DailyTraffic(props) {

    const [chartData, setCharData] = useState([{data: [1,2,3]}]);
    const [chartOptions, setChartOptions] = useState(props.chartOptions);
    let goalReached = [
        {
            data: [20, 40, 55],
        },
    ];

    let result;

    console.log(chartOptions);

    const handleChange = (selected) => {
    //     const value = selected.value;
    //     if (props.data.ops === "goal") {
    //         const api = props.data?.path.replace(":gid", value);
    //         axios.get(api)
    //             .then(response => {
    //                 if (response.status === 200) {
    //                     if (props.data.type === "a-b") {
    //                         console.log([{data: [response.data?.tests.A, response.data?.tests.B, response.data?.tests.C]}])
    //                         setCharData([{data: [response.data?.tests.A, response.data?.tests.B, response.data?.tests.C]}]);
    //                         props.chartOptions.xaxis.categories = ["A", "B", "C"];
    //                         setChartOptions(props.chartOptions);
    //                     }
    //                 }
    //                 else
    //                     console.log("Failed");
    //             })
    //             .catch(err => {
    //                     console.log(err);
    //                 }
    //             )
    //     }
        setCharData([{data: [1,5,3]}]);
        console.log(chartOptions);
    };

    useEffect(  () => {
            //     if (props.data.ops !== "goal") {
            //         result = await fetchOnce(props.data?.path);
            //         if (props.data.ops === "attribute") {
            //             console.log(result);
            //         }
            //         else {
            //             console.log(result);
            //         }
            //     }
        }
    , []);




  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card direction='column' w='100%'>
        <Flex textAlign="center" justifyContent="center" alignItems="center" w="100%">
            <Text
                color='secondaryGray.600'
                fontSize='lg'
                fontWeight='500'
            >
                {props.data.name}
            </Text>
        </Flex>
        <Box display="flex" justifyContent="space-between" alignItems="end" marginY="10px">
            {
                props.selectOptions ?
                    <FormControl>
                        <Select
                            styles={customStyles}
                            options={props.selectOptions}
                            onChange={handleChange}
                        />
                    </FormControl>
                :
                    <></>
            }
        </Box>
      <Box h='240px' mt='auto'>
          <ColumnChart chartOptions={chartOptions} chartData={chartData}></ColumnChart>
      </Box>
    </Card>
  );
}
