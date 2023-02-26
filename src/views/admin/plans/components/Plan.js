import React from "react";
import Card from "../../../../components/card/Card";
import {Box} from "@chakra-ui/react";

const Plan = (props) => {
    const {
        children,
        isPopular,
    } = props;

    return (<>
            {isPopular ?
                <Card borderWidth="1px" borderStyle="solid" borderColor="green"
                      minH={"750px"} p='20px' position={'relative'}
                      maxW={'420px'}>
                    <Box position={'absolute'} top={-3} right={6} bg={"green"} color={"white"} borderRadius={'xl'}>
                        <Box mx={"8px"}>Best Seller</Box>
                    </Box>
                    {children}
                </Card>
                : <Card minH={"750px"} p='20px'
                        maxW={'420px'}>
                    {children}
                </Card>
            }
        </>
    )
}

export default Plan

