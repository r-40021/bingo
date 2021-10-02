import React from 'react';
import './App.css';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Box, ChakraProvider, Button, ButtonGroup, Container, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from "@chakra-ui/react";
import { useWindowSize } from 'react-use';
import { MdLoop, MdDelete } from "react-icons/md";
import { MoreTools } from './menu';

const colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"]; //数字表示エリアの枠線色

function App() {
  let toHistory;
  if (localStorage.getItem("bi-data")) {
    toHistory = JSON.parse(localStorage.getItem("bi-data"));
    if (localStorage.getItem("myHistory")) {
      localStorage.removeItem("myHistory");
    }
    if (localStorage.getItem("lastColor")) {
      localStorage.removeItem("lastColor");
    }
    if (localStorage.getItem("max")) {
      localStorage.removeItem("max");
    }
  } else if (localStorage.getItem("myHistory") && JSON.parse(localStorage.getItem("myHistory")).length > 0) {
    toHistory = [];
    let oldMax;
    let oldColor;
    const myHistory = JSON.parse(localStorage.getItem("myHistory"));

    if (localStorage.getItem("lastColor")) {
      oldColor = Number(localStorage.getItem("lastColor"));
    } else {
      oldColor = 0;
    }

    if (localStorage.getItem("max")) {
      oldMax = Number(localStorage.getItem("max"));
    } else {
      oldMax = 75;
    }

    myHistory.map((value) => {
      const data = {
        num: value,
        colorIndex: oldColor,
        max: oldMax
      }
      toHistory.push(data);
      return value;
    });

  } else {
    toHistory = [];
  }

  const [bingoMax, changeMax] = React.useState(75);
  const [bingoHistory, updateHistory] = React.useState(toHistory);
  const [displayNum, changeNum] = React.useState();
  const [circleColor, changeColor] = React.useState(0);
  const [isSpin, changeIsSpin] = React.useState(false);
  let select = [];

  React.useEffect(
    () => localStorage.setItem("bi-data", JSON.stringify(bingoHistory))
    , [bingoHistory]);

  React.useEffect(() => {
    if (bingoHistory.length > 0) {
      const lastHistory = bingoHistory[bingoHistory.length - 1];
      changeMax(lastHistory.max);
      changeNum(lastHistory.num);
      changeColor(lastHistory.colorIndex);
    }
  }, []);

  for (let i = 0; i < bingoMax; i++) {
    const find = bingoHistory.some(elem => elem.num === i + 1);
    if (!find) {
      select.push(i + 1);
    }
  }

  return (
    <ChakraProvider>
      <div className="flex">
        <Body {...{ bingoMax, changeMax, bingoHistory, updateHistory, displayNum, circleColor }} />
        <Container maxW="container.xl" className="footer">
          <div className="btns">
            <Btns {...{ changeNum, bingoMax, changeMax, updateHistory, bingoHistory, select, changeColor, isSpin, changeIsSpin }} />
          </div>
          <div className="settings">
            <div className="range vflex">
              <RangeLabel />
              <MaxNumSet max={bingoMax} {...{ changeMax, isSpin }} />
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
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const bodyWordList = ["聖戦の記録をリセットしてリプレイしますか…そうは思わないか？", "聖痕をリセットしてリプレイし、希望を私たちの光に変えますか…さあ…この力…どう使う……？", "魔力の残滓を抹消してソフトリセットしますか？", "履歴を全てを”無”に還す《オール・リセット》してやり直しますか……クク、本当かよ？"];
  const bodyWord = bodyWordList[Math.floor(Math.random() * (bodyWordList.length - 0) + 0)];



  const spin = () => {
    props.changeIsSpin(true);
    let select = [];
    if (!props.bingoMax && props.bingoMax !== 0) {
      props.changeMax(75);
      for (let i = 0; i < 75; i++) {
        const find = props.bingoHistory.some(elem => elem.num === i + 1);
        if (!find) {
          select.push(i + 1);
        }
      }
    } else {
      select = props.select.slice();
    }
    if (select.length === 0) {
      setIsOpen(true);
      props.changeIsSpin(false);
      return;
    }
    let history;
    let count = 0;
    let colorIndex = 0;
    const time = select.length === 1 ? 5 : getRandomInt(5, 12);
    let shuffle = setInterval(() => {
      const index = getRandomInt(0, select.length);
      const num = select[index];
      props.changeNum(num);
      const colorListIndex = colorIndex % colorList.length;
      props.changeColor(colorListIndex);
      count++;
      if (count >= time) {
        history = [...props.bingoHistory, { num: num, colorIndex: colorListIndex, max: props.bingoMax }];
        select.splice(index, 1);
        props.updateHistory(history);
        props.changeIsSpin(false);
        clearInterval(shuffle);
      }
      colorIndex++;
    }, 275);
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  return (
    <>
      <Box p={4}>
        <ButtonGroup spacing="1">
          <Button leftIcon={<MdLoop />} colorScheme="blue" onClick={spin} disabled={props.isSpin}>Spin</Button>
          <AskReset {...{ props }} />
        </ButtonGroup>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              終了！
            </AlertDialogHeader>

            <AlertDialogBody>
              <p className="nomulish">{bodyWord}</p>
              <p><br />― <a href="https://racing-lagoon.info/nomu/translate.php" target="_blank" rel="noopener noreferrer">ノムリッシュ翻訳</a>より</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button onClick={() => { onClose(); Reset(props); }} colorScheme="blue" ml={3}>
                やり直す
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
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
      {inWidth > 576 ? <Slider flex="1" focusThumbOnChange={false} value={props.max} onChange={handleChange} ml="0.9rem" max={99} min={1} disabled={props.isSpin}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" color={sliderColor} children={props.max} />
      </Slider> : null}
      <Box pr={0}>
        <NumberInput maxW={inWidth > 576 ? "100px" : ""} ml={inWidth > 576 ? "2rem" : "0"} value={props.max} onChange={handleChange} max={99} min={1} disabled={props.isSpin}>
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
  const circleStyle = { borderColor: colorList[props.circleColor] };

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
      <div className="number" {... { ref: numberElem, style: circleStyle }}>
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
            {props.bingoHistory.map((history, index) => {
              return (<div className="historyNum" key={index}>{history.num}</div>);
            })}
          </Box>
        </Box>
      </div>
    </Container>
  );
}


function AskReset(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <>
      <Button
        leftIcon={<MdDelete />}
        bg={useColorModeValue("gray.200", "gray.600")}
        color={useColorModeValue("gray.600", "gray.200")}
        _hover={{ bg: useColorModeValue("#ff4430", "#f56051"), color: "gray.50" }}
        variant="outline"
        onClick={() => setIsOpen(true)}
        disabled={props.props.isSpin}>
        Reset
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              リセットしますか？
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>履歴をリセットして最初からやり直しますか？</p>
              <p>この操作は元に戻せません。</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button onClick={() => { onClose(); Reset(props.props); }} colorScheme="red" ml={3}>
                リセット
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

function Reset(props) {
  props.updateHistory([]);
  props.changeNum(null);
  props.changeColor(0);
}


export default App;