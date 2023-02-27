import {
    Box,
    Button,
    Text,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure,
} from "@chakra-ui/react"

import React, {useEffect, useState} from "react";
import Card from "components/card/Card";
import { Link } from 'react-router-dom';


import * as PropTypes from "prop-types";
import Experiment from "./components/experiment";
import axios from "axios";
import Cookies from "js-cookie";
// function Lorem(props) {
//     return null;
// }
// Lorem.propTypes = {count: PropTypes.number};



export default function Settings() {
    const jwt = Cookies.get("jwt");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [experiments, setExperiments] = useState([]);
    const [calls, setCalls] = useState([]);

    const getExperimentsByAccount = (id) => {
        console.log(jwt);
        axios.get(`http://localhost:3030/growth/experiment/account/${id}`, {headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }})
            .then(response => {
                if (response.status === 200) {
                    setExperiments([...response.data]);
                }
                else
                    console.log("Failed");
            })
            .catch(err => {
                    console.log(err);
                }
            )
    }
    const getCalls = (id) => {
        axios.get(`http://localhost:3030/growth/experiment/account/${id}/experimentCalls`, {headers: {
                'authorization': `${jwt}`,
                'Content-Type': 'application/json'
            }})
            .then(response => {
                if (response.status === 200) {
                    setCalls(response.data.calls);
                }
                else
                    console.log("Failed");
            })
            .catch(err => {
                    console.log(err);
                }
            )
    }
    useEffect(() => {
        getExperimentsByAccount("63b9ff3f28ce812bf358d0b5");
        getCalls("63b9ff3f28ce812bf358d0b5");
    }, []);

  //  variant='darkBrand'
  return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px"}} display={"flex"} justifyContent="center" w={"100%"}>
          <Card w={"75%"} display={"flex"} alignItems={"center"} marginTop={'18px'}>
              <Text  align={"center"} width={"auto"} color='#2B3674' fontSize='24px'  fontWeight='300' >My Experiments</Text>
              <Box w={"90%"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} marginTop={"20px"}>
                  <Flex justifyContent={"space-between"}>
                      <Text display={"flex"} alignSelf={"center"} align={"center"} color='#2B3674' width={"auto"}  fontSize='17px'  fontWeight='700' >Total experiments performed this month (1/2023):  <Text marginLeft={3} color={'#FFB547'}>{calls}</Text></Text>
                      <Link to={"/admin/createExperiment"}>
                          <Button color="#4318FF" bg="#F4F7FE"  placeSelf="center" onClick={onOpen}>+ Add new experiment</Button>
                      </Link>
                  </Flex>
                  {
                      experiments.map( (experiment, index) => (
                          <Experiment key={index} details={experiment}></Experiment>
                      ))
                  }
              </Box>

          </Card>
          {/*POPUP*/}
          <Modal  blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent style={{ alignSelf: 'center' }}>
                  <ModalHeader align={"center"}>WARNING!</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody align={"center"}>
                      <Text fontWeight="bold" mb="1rem">
                          All experiments should be terminated
                          before switching to exclusive mode.
                      </Text>
                      {/*<Lorem count={2} />*/}
                  </ModalBody>
                  <ModalFooter  justifyContent={"center"}>
                      <Button width={"120px"} colorScheme="brand" mr={3} onClick={onClose}>OK</Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
      </Box>
  );
}
