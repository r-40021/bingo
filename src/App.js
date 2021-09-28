import React from 'react';
import './App.css';
import { ChakraProvider, Button } from "@chakra-ui/react"
import { MdLoop } from "react-icons/md";



function App() {
  return (
    <ChakraProvider>
      <div className="flex">
        <div className="body">body</div>
        <div className="footer">
        <Button leftIcon={<MdLoop />} colorScheme="blue">Button</Button>
        </div>
      </div>
    </ChakraProvider>
  );
}


export default App;
