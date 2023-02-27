import {Box} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import React from "react";

const PaintBorederPlan = (props) => {
    const {
        color,
        children,
        text,
    } = props;

    return (
        <Card borderWidth="1px" borderStyle="solid" borderColor={color}
              minH={"750px"} p='20px' position={'relative'}
              maxW={'420px'}>
            <Box position={'absolute'} top={-3} right={6} bg={color} color={"white"} borderRadius={'xl'}>
                <Box mx={"8px"}>{text}</Box>
            </Box>
            {children}
        </Card>
    )
}

export default PaintBorederPlan;
