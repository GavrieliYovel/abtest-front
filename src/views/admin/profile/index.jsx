/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
=========================================================
* Horizon UI - v1.1.0
=========================================================
* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)
* Designed and Coded by Simmmple
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// Chakra imports
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Profile() {

    const [profile, setProfile] = useState([]);
    const [login, setLogin] = useState(false);
/*
    useEffect(() => {
        axios.post("https://abtest-shenkar.onrender.com/auth/login",
            {email:"racheliandroni@gmail.com",password:"Aa123456"},{
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json',
                }})
            .then(response => {
                console.log(response.data)
                Cookies.set("jwt", response.data);
                setLogin(true);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

*/
        const [isEditMode, setIsEditMode] = useState(false);

        const handleEdit = () => {
            setIsEditMode(true);
        };

        const handleSave = () => {
            // save logic here
            setIsEditMode(false);
        };
/*
        return (
            <div>
                <button onClick={handleEdit}>Edit</button>
                {isEditMode && <button onClick={handleSave}>Save</button>}
            </div>
        );
*/
    useEffect(() => {
         {
            const jwt = Cookies.get("jwt");
            const email = Cookies.get("email");
            console.log(email);
                axios.get(`https://abtest-shenkar.onrender.com/users/${email}`,
                    {   headers: {
                            'authorization': `${jwt}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                setProfile(response.data);
                console.log(response.data);
            });
        }
    }, []);

    return (
        <Box display="flex" justifyContent={"space-evenly"} borderRadius="lg" pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="50%" p={4}
                 borderRadius="30px">
                <Box w="60%">
                    <Text fontSize="20" fontWeight="bold" marginY="20px">User profile</Text>
                    <FormControl marginY="10px">
                        <FormLabel>Name</FormLabel>
                        <Input type="Text"
                               placeholder={profile.name}
                               size="md"
                               borderRadius="10px"
                               readOnly
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>Email</FormLabel>
                        <Input type="Text"
                               placeholder={profile.email}
                               size="md"
                               borderRadius="10px"
                               readOnly
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>Role</FormLabel>
                        <Input type="Text"
                               placeholder={profile.role}
                               size="md"
                               borderRadius="10px"
                               readOnly
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>Account</FormLabel>
                        <Input type="Text"
                               placeholder={profile.email}
                               size="md"
                               borderRadius="10px"
                               readOnly
                        />
                    </FormControl>
                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="40%" marginY="20px" marginX="20px">Edit</Button>
                        <Button variant="brand" w="40%" marginY="20px">Save</Button>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column" bg='white' w="45%" h={"30%"} p={4}
                 borderRadius="30px">
                <Box w="60%">
                    <Text fontSize="20" fontWeight="bold" marginY="20px">Change Password</Text>
                    <FormControl marginY="10px">
                        <FormLabel>Old password</FormLabel>
                        <Input type="Text"
                               placeholder="*******"
                               size="md"
                               borderRadius="10px"
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>New password</FormLabel>
                        <Input type="Text"
                               placeholder="********"
                               size="md"
                               borderRadius="10px"
                        />
                    </FormControl>
                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="40%" marginY="20px" marginX="20px" onClick={handleEdit}>Edit</Button>
                        {isEditMode && <Button variant="brand" w="40%" marginY="20px" marginX="20px" onClick={handleSave}>Save</Button>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}
