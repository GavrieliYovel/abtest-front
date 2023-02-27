import React from "react";
import Card from "../../../../components/card/Card";
import PaintBorederPlan from "./PaintBorederPlan";

const Plan = (props) => {
    const {
        children,
        isPopular,
        isRecommended,
    } = props;

    return (<>
            {isPopular || isRecommended ?
                <PaintBorederPlan color={isPopular ? "green" : "orange"}
                                  text={isPopular ? "Best Seller" : "Recommended"} children={children}/>
                : <Card minH={"750px"} p='20px'
                        maxW={'420px'}>
                    {children}
                </Card>
            }
        </>
    )
}

export default Plan

