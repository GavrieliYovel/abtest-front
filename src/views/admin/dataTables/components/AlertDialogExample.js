import React, {useState} from "react"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, useDisclosure, Button, IconButton,
} from '@chakra-ui/react'
import {DeleteIcon} from "@chakra-ui/icons";
import axios from "axios";
import Cookies from "js-cookie";

 function AlertDialogExample(props) {
     const [dialogText, setDialogText] = useState("Are you sure? You can't undo this action afterwards.");
     const {id, deleteType} = props
     const {isOpen, onOpen, onClose} = useDisclosure()
     const cancelRef = React.useRef()
     const jwt = Cookies.get("jwt");

     const handleDelete = () => {
         if (deleteType === 'accounts') {
             axios.put(`https://abtest-shenkar.onrender.com/${deleteType}/status/${id}`, {},
                 {
                     headers: {
                         'authorization': `${jwt}`,
                         'Content-Type': 'application/json'
                     },
                 }).then((response) => {

                     if(response.status === 200){
                         onClose();
                     }else {
                         setDialogText("Your session has expired. Please log in again.");
                     }
             }).catch((error) => {

             });
         }else if(deleteType === 'users') {
             axios.delete(`http://localhost:5000/${deleteType}/${id}`,
                 {
                     headers: {
                         'authorization': `${jwt}`,
                         'Content-Type': 'application/json'
                     },
                 }).then((response) => {
                 if(response.status === 200){
                     onClose();
                 }else {
                     setDialogText("Your session has expired. Please log in again.");
                 }
             }).catch((error) => {
                 console.log(error)
             });
         }
     }

    return (
        <>
            <Button onClick={onOpen}>
                <IconButton
                    aria-label='Delete account'
                    color='red.400'
                    icon={<DeleteIcon />}
                />
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {dialogText}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
export default AlertDialogExample
