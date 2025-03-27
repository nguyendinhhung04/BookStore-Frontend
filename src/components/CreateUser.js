// import { ChakraProvider, Box, Text, Input, Button, VStack } from "@chakra-ui/react";
// import { extendTheme } from '@chakra-ui/react'
import React from 'react';
import { Provider } from "./ui/provider"

import { Box, Text, Input, Button, VStack } from "@chakra-ui/react";
import {useState} from "react";

 function CreateUser()
{

    const [userInput, setUserInput] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInput(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInput);
        fetch('http://localhost:8080/create',
            {
                method: "POST", headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    fullname: userInput.fullname,
                    email: userInput.email,
                    password: userInput.password,
                    phone: userInput.phone,
                    address: userInput.address
                })
            }
        )
            .then(response => response.json())
            .then(data => setUserInput(data))
            .catch(error => console.error('Error fetching users:', error));
    }

    return (
        <Provider>
            <Box maxW="500px" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="lg">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text mb={1}>FullName</Text>
                            <Input name = 'fullname'
                                   placeholder="Your FullName"
                                   value={userInput.fullname}
                                   onChange={handleChange} />
                        </Box>

                        <Box>
                            <Text mb={1}>Email</Text>
                            <Input type="email" name = 'email'
                                   placeholder="Enter Email"
                                   value={userInput.email}
                                   onChange={handleChange} />
                        </Box>

                        <Box>
                            <Text mb={1}>Password</Text>
                            <Input type="password"
                                   name = 'password'
                                   value={userInput.password}
                                   onChange={handleChange}
                                   placeholder="Password" />
                        </Box>

                        <Box>
                            <Text mb={1}>Phone Number</Text>
                            <Input
                                type="number"
                                name = 'phone'
                                value={userInput.phone}
                                onChange={handleChange}
                                placeholder="Your Phone number" />
                        </Box>

                        <Box>
                            <Text mb={1}>Address</Text>
                            <Input
                                name = 'address'
                                value={userInput.address}
                                onChange={handleChange}
                                placeholder="1234 Main St" />
                        </Box>

                        <Button type="submit" colorScheme="blue" width="full">Submit</Button>
                    </VStack>
                </form>
            </Box>
        </Provider>
    );
}

export default CreateUser;
