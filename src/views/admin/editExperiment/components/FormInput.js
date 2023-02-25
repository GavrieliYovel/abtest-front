import React from "react";

// Chakra imports
import { FormControl, FormLabel, Input} from "@chakra-ui/react";


export default function FormInput(props) {
    return (
        <FormControl marginY="10px" w={ props.size ? "48%" : "100%" }>
            <FormLabel color="#2B3674">{props.title}</FormLabel>
            <Input
                color= "#2B3674"
                type={props.type}
                placeholder={props.title}
                size="md"
                borderRadius="10px"
                value={props.value}
            />
        </FormControl>
    );
}