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

export default function Settings() {

    const [profile, setProfile] = useState([]);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        axios.post("https://abtest-shenkar.onrender.com/auth/login",
            {email:"ofirpeleg2111@gmail.com",password:"Aa123456"},{
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json',
                }})
            .then(response => {
                console.log(response.data)
                Cookies.set("jwt", response.data.jwt);
                setLogin(true);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if(login) {
            const jwt = Cookies.get("jwt");
                axios.get(' https://abtest-shenkar.onrender.com/users/ofirpeleg2111@gmail.com',
                    {   headers: {
                            'authorization': `${jwt}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                setProfile(response.data);
                console.log(response.data);
            });
        }
    }, [login]);

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
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>Email</FormLabel>
                        <Input type="Text"
                               placeholder={profile.email}
                               size="md"
                               borderRadius="10px"
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>Role</FormLabel>
                        <Input type="Text"
                               placeholder={profile.role}
                               size="md"
                               borderRadius="10px"
                        />
                    </FormControl>
                    <FormControl marginY="10px">
                        <FormLabel>Account</FormLabel>
                        <Input type="Text"
                               placeholder={profile.email}
                               size="md"
                               borderRadius="10px"
                        />
                    </FormControl>
                    <Box display="flex" justifyContent="center">
                        <Button variant="brand" w="40%" marginY="20px" marginX="20px">Save</Button>
                        <Button variant="brand" w="40%" marginY="20px">Edit</Button>
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
                        <Button variant="brand" w="40%" marginY="20px" marginX="20px">Save</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}
