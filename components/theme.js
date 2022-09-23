import React from 'react';
import { MenuItem, AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Box, LinkOverlay, LinkBox, Flex, Center, useColorMode } from "@chakra-ui/react"
import { MdBrightnessHigh, MdSync } from "react-icons/md";
import { BsMoon } from "react-icons/bs";



export function SelectTheme() {
  const [autoTheme, toggleAutoTheme] = React.useState("auto");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode()
  let themeIcon = colorMode === 'light' ? <MdBrightnessHigh /> : <BsMoon />;
  let isDark = React.useRef(false);
  React.useEffect(() => {
    toggleAutoTheme(!localStorage.getItem("theme") || (localStorage.getItem("theme") === "auto"));
    isDark.current = window.matchMedia("(prefers-color-scheme: dark)");
  }, [])

  const ToggleTheme = () => {
    if (localStorage.getItem("theme") === "auto") {
      if (isDark.current.matches && colorMode === "light") {
        toggleColorMode();
        changeThemeColor("dark");
      } else if (!isDark.current.matches && colorMode === "dark") {
        toggleColorMode();
        changeThemeColor("light");
      }
    } else if (localStorage.getItem("theme") === "dark" && colorMode === "light") {
      toggleColorMode();
      changeThemeColor("dark");
    } else if (localStorage.getItem("theme") === "light" && colorMode === "dark") {
      toggleColorMode();
      changeThemeColor("light");
    }
  }

  const changeThemeColor = type => {
    let color;
    if (type === "dark") {
      color = "#33373d";
    } else {
      color = "#f8f9fa";
    }
    document.getElementById("headThemeColor").setAttribute("content", color);
  }

  const handleChange = () => {
    if (autoTheme) {
      ToggleTheme();
    }
  }

  React.useEffect(() => {
    try {
      isDark.current.removeEventListener("change", handleChange);
    } catch (e) {
      isDark.current.removeListener(handleChange);
    }
  
    try {
      //システムのテーマが変更されたときに発動
      // Chrome & Firefox
      isDark.current.addEventListener("change", handleChange);
    } catch (e1) {
      try {
        // Safari
        isDark.current.addListener(handleChange);
      } catch (e2) {
        console.error(e2);
      }
    }
    ToggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    ToggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTheme]);

  const handleClickAuto = () => {
    const nowAuto = autoTheme;
    localStorage.setItem("theme", "auto");
    toggleAutoTheme(true);
    if (nowAuto) {
      ToggleTheme();
    }
  };

  const handleClickLight = () => {
    const nowAuto = autoTheme;
    localStorage.setItem("theme", "light");
    toggleAutoTheme(false);
    if (colorMode === "dark" && !nowAuto) {
      ToggleTheme();
    }
  };

  const handleClickDark = () => {
    const nowAuto = autoTheme;
    localStorage.setItem("theme", "dark");
    toggleAutoTheme(false);
    if (colorMode === "light" && !nowAuto) {
      ToggleTheme();
    }
  };

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
              <p>デバイスの設定に合わせることもできます。</p>
              <br />
              <Box pb={3}>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={handleClickAuto}>
                    <Flex>
                      <Center p={1} pe={4} className={"syncModeIcon " + (autoTheme ? "active" : "")}><MdSync /></Center><span flex="1">システムと同期</span>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={handleClickLight}>
                    <Flex>
                      <Center p={1} pe={4} className={"lightModeIcon " + (!autoTheme && colorMode === "light" ? "active" : "")}><MdBrightnessHigh /></Center><span flex="1">ライトモード</span>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={handleClickDark}>
                    <Flex>
                      <Center p={1} pe={4} className={"darkModeIcon " + (!autoTheme && colorMode === "dark" ? "active" : "")}><BsMoon /></Center><span flex="1">ダークモード</span>
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
