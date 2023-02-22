import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
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

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <Card width={"1000px"} height= {"700px"} mx={"auto"} mt={"50px"} spacing={{base: "20px", xl:"20px"}}> 
        <Button variant='darkBrand' color='white' width={"150px"} height={"40px"} spacing={{base: "20px", xl:"20px"}} fontSize='sm' fontWeight='300' ml={"auto"}> Switch to exclusive</Button> 
        
        {/* <Card variant="outlined" width={"800px"} height={"100px"} spacing={{base: "20px", xl:"20px"}} color='black'/> */}


      </Card>
    </Box>
  );
}