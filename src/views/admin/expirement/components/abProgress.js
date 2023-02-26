import React from "react";

// Chakra imports
import {Stack} from "@chakra-ui/react";
import ProgressInfo from "./progressInfo";


export default function ABProgress(props) {
    return (
        <Stack spacing={3}>
            <ProgressInfo percent={17} label={"ON"}></ProgressInfo>
            <ProgressInfo percent={32} label={"OFF"}></ProgressInfo>
        </Stack>
    );
}