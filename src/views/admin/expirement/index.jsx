import {
    Box,
    Button,
    Text,
    Heading,
    Spacer,
    Grid,
    Center,
    SimpleGrid,
    Stack,
    Flex,
    Progress,
    Select
} from "@chakra-ui/react";
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
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { FcBarChart } from "react-icons/fc";
import { RiBarChart2Line, RiBarChartGroupedFill } from "react-icons/ri";
import { IoBarChart } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import TotalSpent from "../default/components/TotalSpent";
import WeeklyRevenue from "../default/components/WeeklyRevenue";
import DropDown from "views/admin/expirement/components/DropDown"

export default function Settings() {
  // Chakra Color Mode
  return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

          <Card width={"75%"} marginTop={'18px'} height= {"auto"} mx={"auto"} mt={"50px"} marginBottom={'50px'} spacing={{base: "20px", xl:"20px"}}>
              <Text  align={"center"} width={"auto"} color='#2B3674' fontSize='24px'  fontWeight='300' >My Experiments</Text>
              <Flex  marginTop={'18px'} >
                  <Box >
                      <Text display={"flex"} align={"center"} color='#2B3674' width={"auto"}  fontSize='18px'  fontWeight='700' >Total experiments performed this month (1/2023):  <Text marginLeft={3} color={'#FFB547'}>95</Text></Text>
                  </Box>
                  <Spacer/>
                  <Box>
                      <Button variant='darkBrand' color='white' width={"auto"} height={"40px"} spacing={{base: "20px", xl:"20px"}} fontSize='sm' fontWeight='300' ml={"auto"}> Switch to exclusive</Button>
                  </Box>
              </Flex>

              <Card
                  style={{
                      marginTop: '50px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width:'75%',
                      align:'center',
                      boxShadow: '1px 2px 9px rgba(112, 144, 176, 0.12)',
                  }}
              >

                  <CardContent >
                      <Typography
                          style={{ fontSize: 16 , display: 'flex',fontWeight:700, justifyContent: 'center' ,color:'#2B3674'}}
                          color="#2B3674"
                          gutterBottom

                      >
                          <Box>
                              First AB Experiment
                              {/*<Select*/}
                              {/*    fontSize='sm'*/}
                              {/*    variant='subtle'*/}
                              {/*    defaultValue='Goals'*/}
                              {/*    width='unset'*/}
                              {/*    fontWeight='700'*/}
                              {/*    marginTop={2}  >*/}
                              {/*    <option value='Goals'>Goals</option>*/}
                              {/*    <option value='monthly'>First AB</option>*/}
                              {/*    <option value='yearly'>First FF</option>*/}
                              {/*    <option value='yearly'>Second AB</option>*/}
                              {/*</Select>*/}
                          </Box>
                      </Typography>
                      <Flex>
                          <Box>
                          <Typography
                              style={{
                                  fontWeight:700,
                                  alignItems:"center",
                              }}
                              color="#2B3674"
                          >
                              <Box marginTop={10} marginBottom={10}>
                                  <Typography style={{fontWeight:700 ,display:"flex",width:"auto"}} color="#2B3674"  component="p">
                                      <Text style={{width:100}}>Type</Text> <Text style={{ fontSize:"14px",color:"#A3AED0"}} >AB-Test</Text>
                                  </Typography>
                                  <Typography style={{fontWeight:700 ,display:"flex"}} color="#2B3674"  component="p">
                                  <Text style={{width:100}}>Status</Text>  <Text style={{fontSize:"14px",color:"#01B574"}} >Active</Text>
                                  </Typography>
                              </Box>
                              <Spacer/>
                          </Typography>
                              </Box>
                              <Spacer width={100}/>
                              <Box  marginBottom={3}>
                                  <Select
                                      color={'#2B3674'}
                                      fontSize='sm'
                                      variant='subtle'
                                      defaultValue='Goals1'
                                      width='unset'
                                      fontWeight='700'
                                    >
                                      <option value='Goals' color={'#2B3674'}>Goals1</option>
                                      <option value='monthly' color={'#2B3674'}>First AB</option>
                                      <option value='yearly' color={'#2B3674'}>First FF</option>
                                      <option value='yearly' color={'#2B3674'}>Second AB</option>
                                  </Select>
                                  <Stack spacing={3}>
                                      <Flex>
                                          <Text width={10} color={"#2B3674"}>A</Text>
                                          <Text width={12} color={"#2B3674"}> 25%</Text>
                                          <Progress
                                          marginTop={"auto"}
                                          marginBottom={"auto"}
                                          variant='table'
                                          colorScheme='brandScheme'
                                          h='8px'
                                          w='108px'
                                          value={40}
                                      /></Flex>

                                      <Flex>
                                          <Text width={10} color={"#2B3674"}>B</Text>
                                          <Text width={12} color={"#2B3674"}> 35.4%</Text>
                                          <Progress
                                              marginTop={"auto"}
                                              marginBottom={"auto"}
                                              variant='table'
                                              colorScheme='brandScheme'
                                              h='8px'
                                              w='108px'
                                              value={35.4}
                                          /></Flex>
                                      <Flex>
                                          <Text width={10} color={"#2B3674"}>C</Text>
                                          <Text width={12} color={"#2B3674"}>75.5%</Text>
                                          <Progress
                                              marginTop={"auto"}
                                              marginBottom={"auto"}
                                              variant='table'
                                              colorScheme='brandScheme'
                                              h='8px'
                                              w='108px'
                                              value={75.5}
                                          /></Flex>
                                  </Stack>
                              </Box>
                      </Flex>
                  </CardContent>
                  <CardActions>
                      <Button color='#2B3674' ml='35%' style={{fontSize: 14 ,justifyContent:'center', alignItems: 'center'}}>See experiments details</Button>
                  </CardActions>
              </Card>

              <Card
                  style={{
                      marginTop: '50px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width:'75%',
                      boxShadow: '1px 2px 9px rgba(112, 144, 176, 0.12)',


                  }}
              ><CardContent>
                  <Typography
                      style={{ fontSize: 16 , display: 'flex',fontWeight:700, justifyContent: 'center' ,color:'#2B3674'}}
                      color="#2B3674"
                      gutterBottom

                  >
                      <Box>
                          First AB Experiment
                      </Box>
                  </Typography>
                  <Flex>
                      <Box>
                          <Typography
                              style={{
                                  fontWeight:700,
                                  alignItems:"center",
                              }}
                              color="#2B3674"
                          >
                              <Box marginTop={10} marginBottom={10} >
                                  <Typography style={{fontWeight:700 ,display:"flex",width:"auto"}} color="#2B3674"  component="p">
                                      <Text style={{width:100}}>Type</Text> <Text style={{ fontSize:"14px",color:"#A3AED0"}} >Feature Flag</Text>
                                  </Typography>
                                  <Typography style={{fontWeight:700 ,display:"flex"}} color="#2B3674"  component="p">
                                      <Text style={{width:100}}>Status</Text>  <Text style={{fontSize:"14px",color:"#01B574"}} >Active</Text>
                                  </Typography>
                              </Box>
                              <Spacer/>
                          </Typography>
                      </Box>
                      <Spacer width={100}/>
                      <Box>
                          <Select
                              color='#2B3674'
                              fontSize='sm'
                              variant='subtle'
                              defaultValue='Goals1'
                              width='unset'
                              fontWeight='700'
                          >
                              <option value='Goals' color='#2B3674'>Goals1</option>
                              <option value='monthly' color='#2B3674'>First AB</option>
                              <option value='yearly' color='#2B3674'>First FF</option>
                              <option value='yearly' color='#2B3674'>Second AB</option>
                          </Select>
                          <Stack spacing={3}>
                              <Flex>
                                  <Text width={10} color={"#2B3674"}>ON</Text>
                                  <Text width={12} color={"#2B3674"}> 25%</Text>
                                  <Progress
                                      marginTop={"auto"}
                                      marginBottom={"auto"}
                                      variant='table'
                                      colorScheme='brandScheme'
                                      h='8px'
                                      w='108px'
                                      value={40}
                                  /></Flex>

                              <Flex>
                                  <Text width={10}>OFF</Text>
                                  <Text width={12}> 35.4%</Text>
                                  <Progress
                                      marginTop={"auto"}
                                      marginBottom={"auto"}
                                      variant='table'
                                      colorScheme='brandScheme'
                                      h='8px'
                                      w='108px'
                                      value={35.4}
                                  /></Flex>
                          </Stack>
                      </Box>
                  </Flex>
              </CardContent>
                  <CardActions>
                      <Button color='#2B3674' ml='35%' style={{fontSize: 14 ,justifyContent:'center', alignItems: 'center'}}>See experiments details</Button>
                  </CardActions>
              </Card>
              <Card
                  style={{
                      marginTop: '10px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width:'75%',
                  }}
                  >
                  <CardActions>
                      <Button color='#fff' backgroundColor={"#4318FF"} ml='35%' style={{fontSize: 14 ,justifyContent:'center', alignItems: 'center'}}>See experiments details</Button>
                  </CardActions>

          </Card>
          </Card>
      </Box>
  );
}
