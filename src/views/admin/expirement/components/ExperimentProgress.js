import React, {useEffect, useState} from "react";

// Chakra imports
import {Stack} from "@chakra-ui/react";
import ProgressInfo from "./progressInfo";
import axios from "axios";




export default function ExperimentProgress(props) {

    const [progress, setProgress] = useState({});
    const getProgressByGoalID = async (goalID, experimentID) => {
        try {
            const response = await axios.get(`https://core-team-final-assignment.onrender.com/growth/experiment/${experimentID}/goal/${goalID}/variantSuccess`);
            console.log(response.data)
            setProgress(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getProgressByGoalID(props.goalID, props.experimentID);
    }, [props.goalID]);
    
    return (
        <>
            {
                props.type === "a-b" ?
                    <Stack spacing={3}>
                        <ProgressInfo percent={progress.tests?.A?.toFixed(1)} label={"A"}></ProgressInfo>
                        <ProgressInfo percent={progress.tests?.B?.toFixed(1)} label={"B"}></ProgressInfo>
                        <ProgressInfo percent={progress.tests?.C?.toFixed(1)} label={"C"}></ProgressInfo>
                    </Stack>
                    :
                    <Stack spacing={3}>
                        <ProgressInfo percent={progress.tests?.ON?.toFixed(1)} label={"ON"}></ProgressInfo>
                        <ProgressInfo percent={progress.tests?.OFF?.toFixed(1)} label={"OFF"}></ProgressInfo>
                    </Stack>

            }
        </>

    );
}