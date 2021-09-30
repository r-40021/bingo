import React from 'react';
import './App.css';
import { Button, Center, MenuItem, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, LinkOverlay, LinkBox, Flex } from "@chakra-ui/react"
import { MdInfoOutline } from "react-icons/md";
import { VscLaw } from "react-icons/vsc";
import { AiFillGithub } from "react-icons/ai";

export function AboutApp() {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    

    return (
        <>
            <MenuItem icon={<MdInfoOutline />} onClick={() => setIsOpen(true)}>このアプリについて</MenuItem>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            このアプリについて
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <p>ブラウザ上で動くビンゴマシーンです。履歴は自動保存されます。</p>

                            <p>また、このアプリはオープンソースソフトウェアです。</p>
                            <br />
                            <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                                <LinkOverlay href="https://github.com/r-40021/bingo" isExternal>
                                    <Flex>
                                        <Center p={1} pe={4}><AiFillGithub /></Center><span flex="1">ソースコード</span>
                                    </Flex>
                                </LinkOverlay>
                            </LinkBox>
                            <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                                <LinkOverlay href="https://github.com/r-40021/bingo/blob/main/LICENSE" isExternal>
                                    <Flex>
                                        <Center p={1} pe={4}><VscLaw /></Center><span flex="1">このソフトウェアのライセンス</span>
                                    </Flex>
                                </LinkOverlay>
                            </LinkBox>
                            <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                                <LinkOverlay href="https://github.com/r-40021/bingo/blob/main/README_ja.md#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9%E8%A1%A8%E7%A4%BA" isExternal>
                                    <Flex>
                                        <Center p={1} pe={4}><VscLaw /></Center><span flex="1">オープンソースライセンス</span>
                                    </Flex>
                                </LinkOverlay>
                            </LinkBox>

                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} colorScheme="blue" variant="outline">
                                閉じる
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}