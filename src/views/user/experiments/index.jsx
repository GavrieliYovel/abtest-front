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
import LineAreaChart from "components/charts/BarChart"
import Card from "components/card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { FcBarChart } from "react-icons/fc";
import { RiBarChart2Line, RiBarChartGroupedFill } from "react-icons/ri";
import { IoBarChart } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";



export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <Card width={"1000px"} height= {"700px"} mx={"auto"} mt={"50px"} spacing={{base: "20px", xl:"20px"}}> 
        <Button variant='darkBrand' color='white' width={"150px"} height={"40px"} spacing={{base: "20px", xl:"20px"}} fontSize='sm' fontWeight='300' ml={"auto"}> Switch to exclusive</Button> 
        <Card
        style={{
          marginTop: '50px',
          marginLeft: '120px',
          width: 700,
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <Typography 
            style={{ fontSize: 14 , display: 'flex', justifyContent: 'center'}}
            color="textSecondary"
            gutterBottom
            
          >
            First AB Experiment
          </Typography>
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Type
          </Typography>
          <Typography color="textSecondary" component="p">
            Status
          </Typography>
          <MdBarChart marginLeft='40%' />
        </CardContent>
        <CardActions>
          <Button color='purple' ml='35%' style={{fontSize: 14 ,justifyContent:'center', alignItems: 'center'}}>See experiments details</Button>
        </CardActions>
      </Card>

      <Card
        style={{
          marginTop: '50px',
          marginLeft: '120px',
          width: 700,
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <Typography 
            style={{ fontSize: 14 , display: 'flex', justifyContent: 'center'}}
            color="textSecondary"
            gutterBottom
            
          >
            First AB Experiment
          </Typography>
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Type
          </Typography>
          <Typography color="textSecondary" component="p">
            Status
          </Typography>
          <MdBarChart marginLeft='40%' />
        </CardContent>
        <CardActions>
          <Button color='purple' ml='35%' style={{fontSize: 14 ,justifyContent:'center', alignItems: 'center'}}>See experiments details</Button>
        </CardActions>
      </Card>

      

      </Card>
    </Box>
  );
}