import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  ChakraProvider,
  Button,
  ButtonGroup,
  Container,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { useWindowSize } from "react-use";
import { MdLoop, MdDelete } from "react-icons/md";
import { MoreTools } from "../components/menu";
import { Undo } from "../components/undo";
import theme from "../components/style";

const colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"]; //数字表示エリアの枠線色

function Home() {
  let select = [];
  const [bingoMax, changeMax] = useState(75);
  const [bingoHistory, updateHistory] = useState();
  const [displayNum, changeNum] = useState();
  const [circleColor, changeColor] = useState(0);
  const [isSpin, changeIsSpin] = useState(false);
  const [nowIndex, changeIndex] = useState();
  const [flexStyle, changeFlexStyle] = useState({ height: "100vh" });
  const { width, height } = useWindowSize();

  useLayoutEffect(() => {
    let toHistory = [];
    if (localStorage.getItem("bi-data")) {
      try {
        toHistory = JSON.parse(localStorage.getItem("bi-data"));
      } catch (error) {
        toHistory = [];
      }
      if (localStorage.getItem("myHistory")) {
        localStorage.removeItem("myHistory");
      }
      if (localStorage.getItem("lastColor")) {
        localStorage.removeItem("lastColor");
      }
      if (localStorage.getItem("max")) {
        localStorage.removeItem("max");
      }
    } else if (
      localStorage.getItem("myHistory") &&
      JSON.parse(localStorage.getItem("myHistory")).length > 0
    ) {
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

      toHistory = myHistory.map((value) => {
        return {
          num: value,
          colorIndex: oldColor,
          max: oldMax,
        };
      });
    } else {
      toHistory = [];
    }
    updateHistory(toHistory);

    // 画面初期化処理
    const initialIndex = localStorage.getItem("bi-index") &&
      Number(localStorage.getItem("bi-index")) >= -1
      ? Number(localStorage.getItem("bi-index"))
      : toHistory.length - 1;

    if (toHistory.length > 0) {
      if (initialIndex > -1) {
        const currentHistory = toHistory[initialIndex];
        changeMax(currentHistory.max);
        changeNum(currentHistory.num);
        changeColor(currentHistory.colorIndex);
      } else if (initialIndex === -1) {
        changeMax(toHistory[0].max);
        changeNum("");
        changeColor(0);
      }
    }

    changeIndex(initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bingoHistory) {
      localStorage.setItem("bi-data", JSON.stringify(bingoHistory));
    }
  }, [bingoHistory]);

  useEffect(() => {
    if (nowIndex || nowIndex === 0) {
      localStorage.setItem("bi-index", nowIndex);
    }
  }, [nowIndex]);

  useEffect(() => {
    const newStyle = { height: height + "px" };
    changeFlexStyle(newStyle);
  }, [width, height]);

  if (bingoHistory) {
    for (let i = 0; i < bingoMax; i++) {
      const find = bingoHistory
        .slice(0, nowIndex + 1)
        .some((elem) => elem.num === i + 1);
      if (!find) {
        select.push(i + 1);
      }
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="flex" style={flexStyle}>
        <Body
          {...{
            bingoMax,
            changeMax,
            bingoHistory,
            updateHistory,
            displayNum,
            circleColor,
            nowIndex,
          }}
        />
        <Container maxW="container.xl" className="footer">
          <div className="btns">
            <Btns
              {...{
                changeNum,
                bingoMax,
                changeMax,
                updateHistory,
                bingoHistory,
                select,
                changeColor,
                isSpin,
                changeIsSpin,
                nowIndex,
                changeIndex,
              }}
            />
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
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const bodyWordList = [
    "聖戦の記録をリセットしてリプレイしますか…そうは思わないか？",
    "聖痕をリセットしてリプレイし、希望を私たちの光に変えますか…さあ…この力…どう使う……？",
    "魔力の残滓を抹消してリセットしますか？",
    "履歴を全てを”無”に還す《オール・リセット》してやり直しますか……クク、本当かよ？",
    "仮想化思念体に伝説の大崩壊を発生させてやり直しますか？",
    "仮想化思念体（遺伝子組み換えでない）を Ｒｅｓｅｔ してリセットします…頼んだよ、未来の英雄達…か？",
    "『シン』が消えてから、2年の月日が流れた―――データをダ＝カーポしてリセマラ続行…なんて…＂いつもの＂俺らしくねぇよな…か？",
    "履歴を消してやり直しますか、本当にそれが貴公の望みなのか…？",
    "履歴を消して最初、つまり光と闇の両側の世界からリセマラ続行しても運命に抗うというのか……か？",
    "聖戦の記録を粉砕して零式からスキルリセットしますか！？逆行列か！",
    "セーブデータをすべての記憶　すべての存在　すべての次元から消して最初からやり直しますか…？預言書には無かった出来事だ…",
  ];

  const bodyWord = useRef(bodyWordList[Date.now() % bodyWordList.length]);

  const spin = () => {
    props.changeIsSpin(true);
    let select = [];
    if (!props.bingoMax && props.bingoMax !== 0) {
      props.changeMax(75);
      for (let i = 0; i < 75; i++) {
        const find = props.bingoHistory
          .slice(0, props.nowIndex + 1)
          .some((elem) => elem.num === i + 1);
        if (!find) {
          select.push(i + 1);
        }
      }
    } else {
      select = props.select.slice();
    }
    if (select.length === 0) {
      bodyWord.current = bodyWordList[Date.now() % bodyWordList.length];
      setIsOpen(true);
      props.changeIsSpin(false);
      return;
    }
    let history;
    let count = 0;
    let colorIndex = 0;
    const time = select.length === 1 ? 2 : getRandomInt(5, 11);
    let shuffle = setInterval(() => {
      const index = getRandomInt(0, select.length);
      const num = select[index];
      props.changeNum(num);
      const colorListIndex = colorIndex % colorList.length;
      props.changeColor(colorListIndex);
      count++;
      if (count >= time) {
        history = [
          ...props.bingoHistory.slice(0, props.nowIndex + 1),
          { num: num, colorIndex: colorListIndex, max: props.bingoMax },
        ];
        select.splice(index, 1);
        props.updateHistory(history);
        props.changeIsSpin(false);
        props.changeIndex(history.length - 1);
        clearInterval(shuffle);
      }
      colorIndex++;
    }, 275);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  return (
    <>
      <Box py={2} px={4} className="spinResetBtn">
        <ButtonGroup spacing="1">
          <Button
            leftIcon={<MdLoop />}
            colorScheme="blue"
            onClick={spin}
            isDisabled={props.isSpin}
          >
            Spin
          </Button>
          <AskReset {...{ props, bodyWordList }} />
        </ButtonGroup>
      </Box>
      <Box py={2} px={4} className="undoRedo">
        <Undo {...{ props }} />
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
              <p className="nomulish">{bodyWord.current}</p>
              <p>
                <br />―{" "}
                <a
                  href="https://racing-lagoon.info/nomu/translate.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkWithLine"
                >
                  ノムリッシュ翻訳
                </a>
                より
              </p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  Reset(props);
                }}
                colorScheme="blue"
                ml={3}
              >
                リセット
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function MaxNumSet(props) {
  const [inWidth, changeWidth] = useState();
  const handleChange = (value) => {
    props.changeMax(value);
  };
  const sliderColor = useColorModeValue("gray.500", "gray.600");

  useEffect(() => {
    changeWidth(document.body.clientWidth);
    window.addEventListener("resize", () =>
      changeWidth(document.body.clientWidth)
    );
  }, []);

  return (
    <Flex>
      {inWidth > 576 ? (
        <Slider
          flex="1"
          focusThumbOnChange={false}
          value={props.max}
          onChange={handleChange}
          ml="0.9rem"
          max={99}
          min={1}
          isDisabled={props.isSpin}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            fontSize="sm"
            boxSize="32px"
            color={sliderColor}
            children={props.max}
          />
        </Slider>
      ) : null}
      <Box pr={0}>
        <NumberInput
          maxW={inWidth > 576 ? "100px" : ""}
          ml={inWidth > 576 ? "2rem" : "0"}
          value={props.max}
          onChange={handleChange}
          max={99}
          min={1}
          isDisabled={props.isSpin}
        >
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
    <Box
      className="rangeValue"
      color={useColorModeValue("gray.600", "gray.400")}
      mb={2}
    >
      最大値
    </Box>
  );
}

function Body(props) {
  const numberElem = useRef(null);
  const historyElem = useRef(null);
  const { width, height } = useWindowSize();
  const circleStyle = { borderColor: colorList[props.circleColor] };
  const currentHistory = props.bingoHistory ? props.bingoHistory.slice(0, props.nowIndex + 1) : [];
  const [isLoaded, changeIsLoaded] = useState(false);

  useEffect(() => changeIsLoaded(true), []); // プログレスバー非表示

  useEffect(() => {
    historyElem.current.scrollTop = historyElem.current.scrollHeight; // 最下部にスクロール
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bingoHistory, props.nowIndex]);

  useLayoutEffect(() => {
    let nowWidth;
    let nowHeight;
    const isResizing = setInterval(() => {
      if (
        document.body.clientWidth !== nowWidth &&
        document.body.clientHeight !== nowHeight
      ) {
        nowWidth = document.body.clientWidth;
        nowHeight = document.body.clientHeight;
      } else {
        const numberCurrentElem = numberElem.current;
        numberCurrentElem.style.width = "";
        numberCurrentElem.style.height = "";
        if (
          numberCurrentElem.offsetWidth <=
          numberCurrentElem.offsetHeight * 1
        ) {
          numberCurrentElem.style.height = numberCurrentElem.offsetWidth + "px";
        } else {
          numberCurrentElem.style.width = numberCurrentElem.offsetHeight + "px";
        }
        numberCurrentElem.style.fontSize =
          (numberCurrentElem.offsetWidth / 5) * 3 + "px";
        numberCurrentElem.style.borderWidth =
          numberCurrentElem.offsetWidth * 0.1 + "px";

        const historyCurrentElem = historyElem.current;
        if (width < 576) {
          historyCurrentElem.style.fontSize =
            Math.min(((historyCurrentElem.clientWidth * 0.12) / 3) * 2, 30) +
            "px";
        } else {
          historyCurrentElem.style.fontSize =
            Math.min(((historyCurrentElem.clientWidth * 0.11) / 3) * 2, 30) +
            "px";
        }
        clearInterval(isResizing);
      }
    }, 200);
  }, [width, height]);

  return (
    <Container maxW="container.xl" className="body">
      <div className="numberWrapper">
        <div className="number" {...{ ref: numberElem, style: circleStyle }}>
          <div className="displayNumber">{props.displayNum}</div>
        </div>
      </div>
      <div className="history">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          className="historyCard"
        >
          <Box
            fontWeight="semibold"
            lineHeight="tight"
            px="6"
            pt="4"
            pd="3"
            color={useColorModeValue("gray.600", "gray.300")}
            ref={historyElem}
          >
            履歴 ({currentHistory.length})
          </Box>
          <Box
            mt="3"
            as="div"
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize="30px"
            className="historyCardBody"
            ref={historyElem}
          >
            {!isLoaded && <Progress size='xs' width='100%' isIndeterminate/>}
            {currentHistory.map((history, index) => {
              return (
                <div className="historyNum" key={index}>
                  {history.num}
                </div>
              );
            })}
          </Box>
        </Box>
      </div>
    </Container>
  );
}

function AskReset(props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const bodyWord = useRef(
    props.bodyWordList[Date.now() % props.bodyWordList.length]
  );

  useEffect(() => {
    if (isOpen) return;
    bodyWord.current =
      props.bodyWordList[Date.now() % props.bodyWordList.length];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <Button
        leftIcon={<MdDelete />}
        bg={useColorModeValue("gray.200", "gray.600")}
        color={useColorModeValue("gray.600", "gray.200")}
        _hover={{
          bg: useColorModeValue("#ff4430", "#f56051"),
          color: "gray.50",
        }}
        variant="outline"
        onClick={() => setIsOpen(true)}
        isDisabled={props.props.isSpin}
      >
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
              <p className="nomulish">{bodyWord.current}</p>
              <p>
                <br />―{" "}
                <a
                  href="https://racing-lagoon.info/nomu/translate.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkWithLine"
                >
                  ノムリッシュ翻訳
                </a>
                より
              </p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  Reset(props.props);
                }}
                colorScheme="red"
                ml={3}
              >
                リセット
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function Reset(props) {
  props.updateHistory([]);
  props.changeNum(null);
  props.changeColor(0);
  props.changeIndex(0);
}

export default Home;
