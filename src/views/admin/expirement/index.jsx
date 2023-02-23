import {Box, Button, Text,Heading,Spacer ,Center, SimpleGrid, Flex} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import Card from "components/card/Card";
import TotalSpent from "../default/components/TotalSpent";
import WeeklyRevenue from "../default/components/WeeklyRevenue";

export default function Settings() {
  // Chakra Color Mode
  return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

        <Card width={"1000px"} height= {"700px"} mx={"auto"} mt={"50px"} spacing={{base: "20px", xl:"20px"}}>
          <Text  align={"center"} width={"auto"} color='#2B3674' fontSize='24px'  fontWeight='300' >My Experiments</Text>
            <Flex marginTop={'18px'}>
                <Box >
                    <Text align={"center"} color='#2B3674' width={"auto"}  fontSize='16px'  fontWeight='200' >Total experiments performed this month (1/2023):  95</Text>
                </Box>
                <Spacer/>
                <Box>
                    <Button variant='darkBrand' color='white' width={"150px"} height={"40px"} spacing={{base: "20px", xl:"20px"}} fontSize='sm' fontWeight='300' ml={"auto"}> Switch to exclusive</Button>
                </Box>
            </Flex>
            <Text  align={"center"} color='#2B3674' fontSize='15px'  fontWeight='300' >First AB Experiment</Text>
                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>

                    <ComplexTable
                        columnsData={columnsDataComplex}
                        tableData={tableDataComplex}
                    />
                </SimpleGrid>
        </Card>
      </Box>
  );
}
