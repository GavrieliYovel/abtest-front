import React from "react";

// Chakra imports
import { FormControl, FormLabel, Input} from "@chakra-ui/react";
import Select from "react-select";


export default function FormSelect(props) {
    return (
        <FormControl>
            <FormLabel color="#2B3674">{props.title}</FormLabel>
            <Select
                styles={props.styles}
                options={props.options}
                value={props.value}
                isMulti
                onChange={props.handler}
                required={true}
            />
        </FormControl>
    );
}