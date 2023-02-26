import React, {useEffect, useState} from "react";

import Card from "components/card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Box, Button, Flex, IconButton, Progress, Select, Spacer, Stack, Text} from "@chakra-ui/react";

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyIcon, DeleteIcon} from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import ProgressInfo from "./progressInfo";
import ABProgress from "./ExperimentProgress";
import ExperimentProgress from "./ExperimentProgress";


export default function Experiment(props) {
    const [copy, setCopy] = useState({copied: false});

    const removeCopied = () => {
        setTimeout(() => {
            setCopy({copied: false});
        }, 1200);
    }


    const goals = props.details.goals.map(goal => ({id: goal._id, label: goal.name}));

    const [selected, setSelected] = useState(goals[0].id);

    const changeProgress = (selected) => {
        setSelected(selected.target.value);
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
                            onChange={changeProgress}
                        >
                            {
                                goals.map( (goal, index) => (
                                    <option key={index} value={goal.id} color={'#2B3674'}>{goal.label}</option>
                                ))
                            }
                        </select>
                        <Stack spacing={3}>
                            <ExperimentProgress type={props.details.type === "a-b" ? "a-b" : "f-f"} experimentID={props.details._id} goalID={selected}></ExperimentProgress>
                        </Stack>
                    </Box>
                </Flex>
                <Flex w={"100%"} justifyContent={"center"} marginTop={"20px"}>
                    <Link to={"/admin/experimentPage?id=" + props.details._id}>
                        <Button colorScheme="brand">See experiments details</Button>
                    </Link>
                </Flex>
            </CardContent>
        </Card>
    );
}