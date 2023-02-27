import React, {useState} from "react";

// Chakra imports
import {Box, Button, Text} from "@chakra-ui/react";
import {CopyToClipboard} from "react-copy-to-clipboard";



export default function Cell(props) {
    const { ...rest } = props;

    const [copy, setCopy] = useState({copied: false});

    const removeCopied = () => {
        setTimeout(() => {
            setCopy({copied: false});
        }, 1200);
    }

    return (
        <Box marginY={"10px"} w={"30%"} display={'flex'} flexDirection={"column"} alignItems={"center"}>

            <Text color={"#2B3674"} >{rest.title}</Text>
            <Box w={"70%"} display={'flex'} flexWrap={"wrap"} justifyContent={"center"}>
                {
                    rest.id  ?

                        <CopyToClipboard justifyContent="center" text={rest.id}  onCopy={() => setCopy({copied: true})}>
                            <Button onClick={removeCopied}>
                                <Text style={{fontWeight:200 , fontSize:12}} color="#4318FF" bg="#F4F7FE" borderRadius="10px" w='100%'>Goal ID</Text>
                                {copy.copied ? <span borderRadius="10px" style={{fontWeight:300, color:"#01B574", marginLeft:'10px',borderRadius:"10px", padding:'0px 10px 0px 10px'}}>  copied  </span> : null}
                            </Button>
                        </CopyToClipboard>
                    :
                        typeof rest.value === "string" ? <Text marginX={"5px"} color={"#A3AED0"}>{rest.value}</Text> : rest.value?.map((value) => (
                            <Text marginX={"5px"} color={"#A3AED0"}>{value.value}</Text>
                        ))
                }
            </Box>
        </Box>
    );
}