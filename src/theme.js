import React from 'react';
import './App.css';
import { MenuItem, AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Box, LinkOverlay, LinkBox, Flex, Center } from "@chakra-ui/react"
import { MdBrightnessHigh, MdBrightness2, MdSync } from "react-icons/md";

export function SelectTheme() {
  let themeIcon = <MdBrightnessHigh />;
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

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
                <LinkOverlay as="button">
                  <Flex>
                    <Center p={1} pe={4}><MdSync /></Center><span flex="1">システムと同期</span>
                  </Flex>
                </LinkOverlay>
              </LinkBox>
              <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                <LinkOverlay as="button">
                  <Flex>
                    <Center p={1} pe={4}><MdBrightnessHigh /></Center><span flex="1">ライトモード</span>
                  </Flex>
                </LinkOverlay>
              </LinkBox>
              <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                <LinkOverlay as="button">
                  <Flex>
                    <Center p={1} pe={4}><MdBrightness2 /></Center><span flex="1">ダークモード</span>
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
