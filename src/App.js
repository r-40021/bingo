import React from 'react';
import './App.css';
import { Box, ChakraProvider, Button, ButtonGroup, Container, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from "@chakra-ui/react";
import { MdLoop, MdDelete } from "react-icons/md";
import { MoreTools } from './menu'



class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
        <div className="flex">
            <Body />
          <div className="footer">
            <div className="btns">
              <Box p={4}>
                <ButtonGroup spacing="1">
                  <Button leftIcon={<MdLoop />} colorScheme="blue">Spin</Button>{/* 【TODO】最大値のテキストボックスに値が入っているかを判定する処理を追加 */}
                  <Button leftIcon={<MdDelete />} colorScheme="pink" variant="outline">Reset</Button>
                </ButtonGroup>
              </Box>
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
  return (
    <Container maxW="container.lg" className="body">
      <div className="number">aaaa</div>
      <div className="history">b</div>
    </Container>
  );
}



export default App;
