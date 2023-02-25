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


import * as PropTypes from "prop-types";
import Experiment from "./components/experiment";
import axios from "axios";
// function Lorem(props) {
//     return null;
// }
// Lorem.propTypes = {count: PropTypes.number};



export default function Settings() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [experiments, setExperiments] = useState([]);

    const getExperimentsByAccount = (id) => {
        axios.get(`https://core-team-final-assignment.onrender.com/growth/experiment/account/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setExperiments([...experiments, ...response.data]);
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
        getExperimentsByAccount("63b9fddd93e055aa3b92bf69");
    }, []);
  //  variant='darkBrand'
  return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px"}} display={"flex"} justifyContent="center" w={"100%"}>
          <Card w={"75%"} display={"flex"} alignItems={"center"} marginTop={'18px'}>
              <Text  align={"center"} width={"auto"} color='#2B3674' fontSize='24px'  fontWeight='300' >My Experiments</Text>
              <Box w={"90%"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} marginTop={"20px"}>
                  <Flex justifyContent={"space-between"}>
                      <Text display={"flex"} alignSelf={"center"} align={"center"} color='#2B3674' width={"auto"}  fontSize='17px'  fontWeight='700' >Total experiments performed this month (1/2023):  <Text marginLeft={3} color={'#FFB547'}>95</Text></Text>
                      <Button color="#4318FF" bg="#F4F7FE"  placeSelf="center" onClick={onOpen}>+ Add new experiment</Button>
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
