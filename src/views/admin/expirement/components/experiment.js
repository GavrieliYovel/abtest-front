import React, {useEffect, useState} from "react";

import Card from "components/card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Box, Button, Flex, IconButton, Link, Progress, Select, Spacer, Stack, Text} from "@chakra-ui/react";

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyIcon, DeleteIcon} from "@chakra-ui/icons";


export default function Experiment(props) {
    const [copy, setCopy] = useState({copied: false});

    // const { ...rest } = props;
    console.log(props);
    const removeCopied = () => {
        setTimeout(() => {
            setCopy({copied: false});
        }, 1200);
    }

    return (
        <Card
            style={{
                marginTop: '20px',
                marginBottom: '25px',
                marginX: 'auto',
                width:'100%',
                align:'center',
                boxShadow: '2px 2px 9px rgba(112, 144, 176, 0.12)',
            }}
        >
            <CardContent>
                <Typography
                    style={{ fontSize: 16 , display: 'flex',fontWeight:700, justifyContent: 'center' ,color:'#2B3674'}}
                    color="#2B3674"
                    gutterBottom
                >
                    {props.details.name}
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
                            <Box marginTop={10} marginBottom={10} display={"flex"}>
                                <Typography style={{fontWeight:700 ,width:"auto"}} color="#2B3674"  component="p">
                                    <Text  color="#2B3674" style={{width:100}}>Type</Text>
                                    <Text style={{ fontSize:"14px",color:"#A3AED0"}} > {props.details.type}</Text>
                                </Typography>
                                <Typography style={{fontWeight:700 }}  color="#2B3674"  component="p">
                                    <Text  color="#2B3674" style={{width:100}}>Status</Text>
                                    <Text style={{ fontSize: "14px", color: props.details.status === "active" ? "#01B574" : props.details.status === "planned" ? "orange": "red" }}>
                                        {props.details.status}
                                    </Text>
                                </Typography>
                            </Box>

                            <Typography style={{width:"auto", display:"flex", alignItems: "center"}} color="#2B3674"  component="p">
                                    <Text style={{fontWeight:400 }} color="#2B3674">ID</Text>
                                <CopyToClipboard text={props.details._id}  onCopy={() => setCopy({copied: true})}>
                                    <Button onClick={removeCopied}>
                                        <Text style={{fontWeight:200 }} color="#4318FF" bg="#F4F7FE" borderRadius="10px" w='100%'>{" "+props.details._id+" "}</Text>
                                        {copy.copied ? <span borderRadius="10px" style={{fontWeight:300, color:"#01B574", marginLeft:'10px',borderRadius:"10px", padding:'0px 10px 0px 10px'}}>  copied  </span> : null}
                                    </Button>
                                </CopyToClipboard>
                            </Typography>
                        </Typography>
                    </Box>
                    <Spacer width={100}/>
                    <Box  marginBottom={3}>
                        <select
                            style={{
                                color: '#2B3674',
                                fontSize: 'sm',
                                variant:'subtle',
                                defaultValue:'Goals1',
                                width:'100%'
                            }}
                        >
                            <option value='Goals' color={'#2B3674'}>Goals1</option>
                            <option value='monthly' color={'#2B3674'}>First AB</option>
                            <option value='yearly' color={'#2B3674'}>First FF</option>
                            <option value='yearly' color={'#2B3674'}>Second AB</option>
                        </select>
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
                                />
                            </Flex>

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
                                />
                            </Flex>
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
                                />
                            </Flex>
                        </Stack>
                    </Box>
                </Flex>
                <Flex w={"100%"} justifyContent={"center"} marginTop={"20px"}>
                    <Link to="/experimentPage">
                        <Button colorScheme="brand">See experiments details</Button>
                    </Link>
                </Flex>
            </CardContent>
        </Card>
    );
}