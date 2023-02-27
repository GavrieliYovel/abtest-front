import React from "react";
import Card from "../../../../components/card/Card";

const Plan = (props) => {
    const {
        children
    } = props;

    return (
        <Card minH={"750px"} p='20px' maxW={'420px'}>
            {children}
        </Card>
    )
}

export default Plan
