import React from 'react';
import './App.css';
import { MenuItem, AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Box, LinkOverlay, LinkBox, Flex, Center, useColorMode } from "@chakra-ui/react"
import { MdBrightnessHigh, MdSync } from "react-icons/md";
import { BsMoon } from "react-icons/bs";



export function SelectTheme() {
  const [autoTheme, toggleAutoTheme] = React.useState(localStorage.getItem("theme") === "auto");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  let themeIcon = colorMode === 'light' ? <MdBrightnessHigh /> : <BsMoon />;
  const isDark = window.matchMedia("(prefers-color-scheme: dark)");

  const ToggleTheme = () => {
    if (autoTheme) {
      if (isDark.matches && colorMode === "light") {
        toggleColorMode();
      } else if (!isDark.matches && colorMode === "dark") {
        toggleColorMode();
      }
    } else if (localStorage.getItem("theme") === "dark" && colorMode === "light") {
      toggleColorMode();
    } else if (localStorage.getItem("theme") === "light" && colorMode === "dark") {
      toggleColorMode();
    }
  }

  React.useEffect(ToggleTheme,[autoTheme]);  

  window.addEventListener("load", ()=>{
    ToggleTheme();
  });

  try {
    //システムのテーマが変更されたときに発動
    // Chrome & Firefox
    isDark.addEventListener("change", ()=>{
    if(autoTheme) {
      ToggleTheme();
    }
  });
  } catch (e1) {
    try {
      // Safari
      isDark.addListener(()=>{
    if(autoTheme) {
      ToggleTheme();
    }
  });
    } catch (e2) {
      console.error(e2);
    }
  }

  return (
    <>
      <MenuItem icon={themeIcon} onClick={() => setIsOpen(true)}>テーマ切り替え</MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              テーマ選択
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>アプリのテーマを選択することができます。</p>
              <p>定番のライトモードを選ぶか、トレンドのダークモードを選ぶかはあなた次第！</p>
              <br />
              <Box pb={3}>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={() => {
                    const nowAuto = autoTheme;
                    toggleAutoTheme(true);
                    localStorage.setItem("theme", "auto");
                    if(nowAuto){
                      ToggleTheme();
                    }
                  }}>
                    <Flex>
                      <Center p={1} pe={4} className={"syncModeIcon " + (autoTheme ? "active" : "")}><MdSync /></Center><span flex="1">システムと同期</span>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={() => {
                    const nowAuto = autoTheme;
                    localStorage.setItem("theme", "light");
                    toggleAutoTheme(false);
                    if(colorMode === "dark" && !nowAuto) {
                      ToggleTheme();
                    }
                  }}>
                    <Flex>
                      <Center p={1} pe={4} className={"lightModeIcon " + (localStorage.getItem("theme") === "light" && !autoTheme && colorMode === "light" ? "active" : "")}><MdBrightnessHigh /></Center><span flex="1">ライトモード</span>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={() => {
                    const nowAuto = autoTheme;
                    localStorage.setItem("theme", "dark");
                    toggleAutoTheme(false);
                    if(colorMode === "light" && !nowAuto) {
                      ToggleTheme();
                    }
                  }}>
                    <Flex>
                      <Center p={1} pe={4} className={"darkModeIcon " + (localStorage.getItem("theme") === "dark" && !autoTheme && colorMode === "dark" ? "active" : "")}><BsMoon /></Center><span flex="1">ダークモード</span>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
              </Box>
            </AlertDialogBody>

          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
