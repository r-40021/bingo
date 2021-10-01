import React from 'react';
import './App.css';
import { Box, ChakraProvider, Button, ButtonGroup, Container, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from "@chakra-ui/react";
import { useWindowSize } from 'react-use';
import { MdLoop, MdDelete } from "react-icons/md";
import { MoreTools } from './menu';



function App() {
  return (
    <ChakraProvider>
      <div className="flex">
        <Body />
        <div className="footer">
          <div className="btns">
            <Btns />
          </div>
          <div className="settings">
            <div className="range vflex">
              <RangeLabel />
              <MaxNumSet />
            </div>
            <div className="moreTools">
              <MoreTools />
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

function Btns() {
  return (
  <Box p={4}>
    <ButtonGroup spacing="1">
      <Button leftIcon={<MdLoop />} colorScheme="blue">Spin</Button>{/* 【TODO】最大値のテキストボックスに値が入っているかを判定する処理を追加 */}
      <Button leftIcon={<MdDelete />} bg={useColorModeValue("gray.200", "gray.600")} color={useColorModeValue("gray.600", "gray.200")} _hover={{ bg: useColorModeValue("#ff4430", "#f56051"), color: "gray.50" }} variant="outline">Reset</Button>
    </ButtonGroup>
  </Box>
  );
}

function MaxNumSet() {
  const [value, setValue] = React.useState(75);
  const [inWidth, changeWidth] = React.useState(document.body.clientWidth);
  const handleChange = (value) => {
    setValue(value);
  }
  const sliderColor = useColorModeValue("gray.500", "gray.600");

  window.addEventListener("resize", () => changeWidth(document.body.clientWidth));

  return (
    <Flex>
      {inWidth > 576 ? <Slider flex="1" focusThumbOnChange={false} value={value} onChange={handleChange} ml="0.9rem" max={99} min={1}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" color={sliderColor} children={value} />
      </Slider> : null}
      <Box pr={0}>
        <NumberInput maxW={inWidth > 576 ? "100px" : ""} ml={inWidth > 576 ? "2rem" : "0"} value={value} onChange={handleChange} max={99} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>
  );
}

function RangeLabel() {
  return (
    <Box className="rangeValue" color={useColorModeValue("gray.600", "gray.400")}>最大値</Box>
  );
}

function Body() {
  const numberElem = React.useRef(null);
  const { width, height } = useWindowSize();
  const history = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,75];

  React.useEffect(() => {
    const currentElem = numberElem.current;
    currentElem.style.height = currentElem.offsetWidth + "px";
    currentElem.style.fontSize = currentElem.offsetWidth / 5 * 3 + "px";
    currentElem.style.borderWidth = currentElem.offsetWidth * 0.1 + "px";
  }, [width, height]);

  return (
    <Container maxW="container.lg" className="body">
      <div className="number" {... { ref: numberElem }}>
        <div className="displayNumber">
          75
        </div>
      </div>
      <div className="history">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="historyCard" p="4">
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            履歴</Box>
          <Box mt="3" as="div" color={useColorModeValue("gray.600", "gray.300")} fontSize="30px">
            {history.map((num, index)=>{
              return (<div className="historyNum" key={index}>{num}</div>);
            })}
          </Box>
        </Box>
      </div>
    </Container>
  );
}



export default App;
