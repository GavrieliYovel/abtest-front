import React from "react";
import Card from "../../../../components/card/Card";

import  PlanTitle from  "./PlanTitle"

export default function Plan(props) {


    return (
        <Card style={{height:'60%' , width:'20%', backgroundColor: 'green'}}>
            <PlanTitle></PlanTitle>
            {/*<PlanIcon></PlanIcon>*/}
            {/*<PlanFeatures></PlanFeatures>*/}
            {/*<PlanButtons></PlanButtons>*/}
        </Card>
    )
}
