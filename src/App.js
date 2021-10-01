import React from 'react';
import './App.css';
import { Box, ChakraProvider, Button, ButtonGroup, Container, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from "@chakra-ui/react";
import { useWindowSize } from 'react-use';
import { MdLoop, MdDelete } from "react-icons/md";
import { MoreTools } from './menu';



function App() {
  const [bingoMax, changeMax] = React.useState(75);
  const [bingoHistory, updateHistory] = React.useState([]);
  const [displayNum, changeNum] = React.useState();
  return (
    <ChakraProvider>
      <div className="flex">
        <Body {...{bingoMax, changeMax, bingoHistory, updateHistory, displayNum}} />
        <Container maxW="container.xl" className="footer">
          <div className="btns">
            <Btns {...{changeNum, bingoMax}}/>
          </div>
          <div className="settings">
            <div className="range vflex">
              <RangeLabel />
              <MaxNumSet max={bingoMax} changeMax={changeMax}/>
            </div>
            <div className="moreTools">
              <MoreTools />
            </div>
          </div>
        </Container>
      </div>
    </ChakraProvider>
  );
}

function Btns(props) {
  const spin = () => {
    let count = 0;
    const time = getRandomInt(5,12);
    let shuffle = setInterval(() => {
      props.changeNum(getRandomInt(1,Number(props.bingoMax)+1));
      count ++;
      if(count >= time) {
        clearInterval(shuffle);
      }
    }, 300);
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  return (
    <Box p={4}>
      <ButtonGroup spacing="1">
        <Button leftIcon={<MdLoop />} colorScheme="blue" onClick={spin}>Spin</Button>{/* 【TODO】最大値のテキストボックスに値が入っているかを判定する処理を追加 */}
        <Button leftIcon={<MdDelete />} bg={useColorModeValue("gray.200", "gray.600")} color={useColorModeValue("gray.600", "gray.200")} _hover={{ bg: useColorModeValue("#ff4430", "#f56051"), color: "gray.50" }} variant="outline">Reset</Button>
      </ButtonGroup>
    </Box>
  );
}

function MaxNumSet(props) {
  const [inWidth, changeWidth] = React.useState(document.body.clientWidth);
  const handleChange = (value) => {
    props.changeMax(value);
  }
  const sliderColor = useColorModeValue("gray.500", "gray.600");

  window.addEventListener("resize", () => changeWidth(document.body.clientWidth));

  return (
    <Flex>
      {inWidth > 576 ? <Slider flex="1" focusThumbOnChange={false} value={props.max} onChange={handleChange} ml="0.9rem" max={99} min={1}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" color={sliderColor} children={props.max} />
      </Slider> : null}
      <Box pr={0}>
        <NumberInput maxW={inWidth > 576 ? "100px" : ""} ml={inWidth > 576 ? "2rem" : "0"} value={props.max} onChange={handleChange} max={99} min={1}>
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

function Body(props) {
  const numberElem = React.useRef(null);
  const historyElem = React.useRef(null);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const numberCurrentElem = numberElem.current;
    numberCurrentElem.style.width = "";
    numberCurrentElem.style.height = "";
    if (numberCurrentElem.offsetWidth <= numberCurrentElem.offsetHeight * 1) {
      numberCurrentElem.style.height = numberCurrentElem.offsetWidth + "px";
    } else {
      numberCurrentElem.style.width = numberCurrentElem.offsetHeight + "px";
    }
    numberCurrentElem.style.fontSize = numberCurrentElem.offsetWidth / 5 * 3 + "px";
    numberCurrentElem.style.borderWidth = numberCurrentElem.offsetWidth * 0.1 + "px";

    const historyCurrentElem = historyElem.current;
    if (width < 576) {
      historyCurrentElem.style.fontSize =
        Math.min(((historyCurrentElem.clientWidth * 0.12) / 3) * 2, 30) + "px";
    } else {
      historyCurrentElem.style.fontSize =
        Math.min(((historyCurrentElem.clientWidth * 0.11) / 3) * 2, 30) + "px";
    }
  
  }, [width, height]);

  return (
    <Container maxW="container.lg" className="body">
      <div className="number" {... { ref: numberElem }}>
        <div className="displayNumber">
          {props.displayNum}
        </div>
      </div>
      <div className="history">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="historyCard" p="4">
          <Box
            fontWeight="semibold"
            lineHeight="tight"
            isTruncated
          >
            履歴 ({props.bingoHistory.length})</Box>
          <Box mt="3" as="div" color={useColorModeValue("gray.600", "gray.300")} fontSize="30px" className="historyCardBody" ref={historyElem}>
            {props.bingoHistory.map((num, index) => {
              return (<div className="historyNum" key={index}>{num}</div>);
            })}
          </Box>
        </Box>
      </div>
    </Container>
  );
}



export default App;
