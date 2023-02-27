import React, {useState, useEffect} from "react"
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
     const {id, deleteType, refreshFunc} = props
     const {isOpen, onOpen, onClose} = useDisclosure()
     const cancelRef = React.useRef()
     const jwt = Cookies.get("jwt");

     useEffect(() => {

     },[dialogText])

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
                         refreshFunc(id);
                     }else {
                         setDialogText("Your session has expired. Please log in again.");
                     }
             }).catch((error) => {

             });
         }else if(deleteType === 'users') {
             axios.delete(`https://abtest-shenkar.onrender.com/${deleteType}/${id}`,
                 {
                     headers: {
                         'authorization': `${jwt}`,
                         'Content-Type': 'application/json'
                     },
                 }).then((response) => {
                 if(response.status === 200){
                     onClose();
                     refreshFunc(id);
                 }
             }).catch((error) => {
                 console.log({error})
                 setDialogText(error.response.data.message);
             });
         }
     }

     const handleCancel= () => {
         onClose();
         setDialogText("Are you sure? You can't undo this action afterwards.");
     }

    return (
        <>
                <IconButton onClick={onOpen}
                    aria-label='Delete account'
                    color='red.400'
                    icon={<DeleteIcon />}
                />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={()=>{handleCancel()}}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='xl' fontWeight='bold' textAlign='center' color='red' marginY="20px" marginX="20px">
                            WARNING!
                        </AlertDialogHeader>
                        <AlertDialogBody textAlign='center'>
                            {dialogText}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button w="40%" marginY="20px" marginX="20px" ref={cancelRef} onClick={()=>{handleCancel()}}>
                                Cancel
                            </Button>
                            <Button variant="brand" w="40%" marginY="20px" marginX="20px" onClick={()=>{handleDelete()}} ml={3}>
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