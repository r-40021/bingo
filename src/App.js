import React from 'react';
import './App.css';
import { Box, ChakraProvider, Button, IconButton, ButtonGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Menu, MenuButton, MenuItem, MenuList, MenuGroup, MenuDivider } from "@chakra-ui/react"
import { MdLoop, MdDelete, MdKeyboardArrowUp, MdInfoOutline, MdLockOutline, MdLink, MdMoreVert } from "react-icons/md";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaLine } from "react-icons/fa";


function App() {
  return (
    <ChakraProvider>
      <div className="flex">
        <div className="body">body</div>
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
            <Slider defaultValue={75} min={1} max={99} step={1}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </div>
          <div className="moreTools">
            <Box p={4}>
              <Menu boundary="scrollParent">
                  <MenuButton as={IconButton} icon={<MdKeyboardArrowUp />} aria-label="さらにメニューを表示">
                  </MenuButton>
                <MenuList>
                  <MenuGroup title="情報">
                    <MenuItem icon={<MdInfoOutline />}>このアプリについて</MenuItem>
                    <MenuItem icon={<MdLockOutline />}>プライバシーポリシー</MenuItem>
                    <MenuItem icon={<AiFillGithub />}>ソースコード</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="共有">
                    <MenuItem icon={<MdLink />}>URL をコピー</MenuItem>
                    <MenuItem icon={<AiOutlineTwitter />}>ツイート</MenuItem>
                    <MenuItem icon={<FaLine />}>LINE で送る</MenuItem>
                    <MenuItem icon={<MdMoreVert />}>その他の方法</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Box>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}


export default App;
