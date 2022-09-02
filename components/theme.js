import React from 'react';
import { MenuItem, AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Box, LinkOverlay, LinkBox, Flex, Center, useColorMode } from "@chakra-ui/react"
import { MdBrightnessHigh, MdSync } from "react-icons/md";
import { BsMoon } from "react-icons/bs";



export function SelectTheme() {
  const [autoTheme, toggleAutoTheme] = React.useState(!localStorage.getItem("theme") || (localStorage.getItem("theme") === "auto"));
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode()
  let themeIcon = colorMode === 'light' ? <MdBrightnessHigh /> : <BsMoon />;
  const isDark = window.matchMedia("(prefers-color-scheme: dark)");


  const ToggleTheme = () => {
    if (localStorage.getItem("theme") === "auto") {
      if (isDark.matches && colorMode === "light") {
        toggleColorMode();
        changeThemeColor("dark");
      } else if (!isDark.matches && colorMode === "dark") {
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
    ToggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTheme]);

  try {
    isDark.removeEventListener("change", handleChange);
  } catch (e) {
    isDark.removeListener(handleChange);
  }

  try {
    //システムのテーマが変更されたときに発動
    // Chrome & Firefox
    isDark.addEventListener("change", handleChange);
  } catch (e1) {
    try {
      // Safari
      isDark.addListener(handleChange);
    } catch (e2) {
      console.error(e2);
    }
  }


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

  window.addEventListener("load", () => {
    ToggleTheme();
  });

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
                      <Center p={1} pe={4} className={"lightModeIcon " + (localStorage.getItem("theme") === "light" && !autoTheme && colorMode === "light" ? "active" : "")}><MdBrightnessHigh /></Center><span flex="1">ライトモード</span>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
                <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                  <LinkOverlay as="button" onClick={handleClickDark}>
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
