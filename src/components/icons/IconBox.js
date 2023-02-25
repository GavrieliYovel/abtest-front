import React from "react";
import { Flex } from "@chakra-ui/react";

export default function IconBox(props) {
  const { icon, ...rest } = props;

  return (
    <Flex className={'test'}
      alignItems={"center"}
      justify={"center"}
      borderRadius={"50%"}
      {...rest}>
      {icon}
    </Flex>
  );
}
