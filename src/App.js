import React from 'react';
import './App.css';
import { Box, ChakraProvider, Button, IconButton, ButtonGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Menu, MenuButton, MenuItem, MenuList, MenuGroup, MenuDivider, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, } from "@chakra-ui/react";
import { MdLoop, MdDelete, MdKeyboardArrowUp, MdLockOutline } from "react-icons/md";
import { SelectTheme } from './theme';
import { AboutApp } from './about'
import { ShareMenu } from './share';


class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
        <div className="flex">
          <div className="body">ここに数字や履歴の表示エリアを作る</div>
          <div className="footer">
            <div className="btns">
              <Box p={4}>
                <ButtonGroup spacing="1">
                  <Button leftIcon={<MdLoop />} colorScheme="blue">Spin</Button>
                  <Button leftIcon={<MdDelete />} colorScheme="pink" variant="outline">Reset</Button>
                </ButtonGroup>
              </Box>
            </div>
            <div className="range">
              <MaxNumSet />
            </div>
            <div className="moreTools">
              <Box p={4}>
                <Menu boundary="scrollParent" placement="top" autoSelect={false}>
                  <MenuButton as={IconButton} icon={<MdKeyboardArrowUp />} aria-label="さらにメニューを表示">
                  </MenuButton>
                  <MenuList>
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
  const handleChange = (value) => setValue(value);

  return (
    <Flex>
      <Slider flex="1" focusThumbOnChange={false} value={value} onChange={handleChange} ml="1.2rem" max={99} min={1}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="36px" children={value} />
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

export default App;
