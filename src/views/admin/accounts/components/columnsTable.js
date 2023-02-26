import {
    Badge,
    Flex,
    IconButton,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {NavLink} from "react-router-dom";
import AlertDialogExample from "../../dataTables/components/AlertDialogExample";
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';



export default function ColumnsTable(props) {
    const { columnsData, tableData, type, func } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const { loggedInUser } = useContext(AuthContext);
    const role = loggedInUser.role;

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
     initialState.pageSize =100;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                </Text>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "NAME") {
                                        data = (
                                            <Flex align='center'>
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "PLAN") {
                                        data = (
                                            <Flex align='center'>
                                                <Text
                                                    me='10px'
                                                    color={textColor}
                                                    fontSize='sm'
                                                    fontWeight='700'>
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "CREDITS") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "SEATS") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "STATUS") {
                                            let color = '';
                                            if (cell.value === 'active') {
                                                color = 'green';
                                            } else if (cell.value === 'pending' || cell.value === 'suspended') {
                                                color = 'orange';
                                            } else {
                                                color = 'red';
                                            }
                                            data = (
                                                <Badge variant='outline' colorScheme={color} border-radius={"3px"} >
                                                    {cell.value}
                                                </Badge>
                                            );
                                        }
                                        else if (cell.column.Header === "DELETE" && role !== "user" ) {
                                        const id = row.original.id;
                                        data = (
                                            <AlertDialogExample
                                                id={id}
                                                deleteType={type}
                                                refreshFunc={func}
                                            />
                                        );
                                    }
                                    else if (cell.column.Header === "EDIT") {
                                        const id = row.original.id;
                                        console.log(id);
                                        data = (
                                            <NavLink to={`/admin/edit-account/${id}`}>
                                            <IconButton
                                                aria-label='Edit account'
                                                color='gray.400'
                                                icon={<EditIcon />}
                                            />
                                            </NavLink>
                                        );
                                    }
                                   else if(cell.column.Header === "ID") {
                                        data = (
                                            <Flex align='center'>
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                   else if (cell.column.Header === "ROLE") {
                                    data = (
                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                            {cell.value}
                                    </Text>
                                    );
                                }
                                    else if (cell.column.Header === "EMAIL") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}
