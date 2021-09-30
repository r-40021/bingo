import React from 'react';
import './App.css';
import { Box, ChakraProvider, Button, IconButton, ButtonGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Menu, MenuButton, MenuItem, MenuList, MenuGroup, MenuDivider, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from "@chakra-ui/react";
import { MdLoop, MdDelete, MdKeyboardArrowUp, MdLockOutline } from "react-icons/md";
import { SelectTheme } from './theme';
import { AboutApp } from './about'
import { ShareMenu } from './share';


class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
        <div className="flex">
          <div className="body">
            <Body />
          </div>
          <div className="footer">
            <div className="btns">
              <Box p={4}>
                <ButtonGroup spacing="1">
                  <Button leftIcon={<MdLoop />} colorScheme="blue">Spin</Button>{/* 【TODO】最大値のテキストボックスに値が入っているかを判定する処理を追加 */}
                  <Button leftIcon={<MdDelete />} colorScheme="pink" variant="outline">Reset</Button>
                </ButtonGroup>
              </Box>
            </div>
            <div className="range vflex">
              <RangeLabel />
              <MaxNumSet />
            </div>
            <div className="moreTools">
              <Box p={4}>
                <Menu boundary="scrollParent" placement="top" autoSelect={false}>
                  <MenuButton as={IconButton} icon={<MdKeyboardArrowUp />} aria-label="さらにメニューを表示">
                  </MenuButton>
                  <MenuList boxShadow="lg">
                    <MenuGroup title="情報">
                      <AboutApp />
                      <MenuItem icon={<MdLockOutline />} onClick={() => { window.open("https://r-40021.github.io/privacy.html") }}>プライバシーポリシー</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="設定">
                      <SelectTheme />
                    </MenuGroup>
                    <MenuDivider />
                    <ShareMenu />
                  </MenuList>
                </Menu>
              </Box>
            </div>
          </div>
        </div>
      </ChakraProvider>
    );
  }
}

function MaxNumSet() {
  const [value, setValue] = React.useState(75);
  const handleChange = (value) => {
    setValue(value);
  }

  return (
    <Flex>
      <Slider flex="1" focusThumbOnChange={false} value={value} onChange={handleChange} ml="0.9rem" max={99} min={1}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" color={useColorModeValue("gray.500", "gray.600")} children={value} />
      </Slider>
      <NumberInput maxW="100px" ml="2rem" value={value} onChange={handleChange} max={99} min={1}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
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
    <Flex>
      <span w="100px">ここに数字を表示したり、いろいろと。</span>
      <span flex={1}>ここに履歴！</span>
    </Flex>
  );
}

export default App;
