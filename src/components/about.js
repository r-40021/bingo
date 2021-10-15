import React from 'react';
import { Button, Center, MenuItem, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, LinkOverlay, LinkBox, Flex } from "@chakra-ui/react"
import { MdInfoOutline } from "react-icons/md";
import { VscLaw, VscGithubInverted } from "react-icons/vsc";

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
                                <LinkOverlay href="https://github.com/r-40021/bingo" isExternal onClick={onClose}>
                                    <Flex>
                                        <Center p={1} pe={4}><VscGithubInverted /></Center><span flex="1">ソースコード</span>
                                    </Flex>
                                </LinkOverlay>
                            </LinkBox>
                            <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                                <LinkOverlay href="https://github.com/r-40021/bingo/blob/main/LICENSE" isExternal onClick={onClose}>
                                    <Flex>
                                        <Center p={1} pe={4}><VscLaw /></Center><span flex="1">このソフトウェアのライセンス</span>
                                    </Flex>
                                </LinkOverlay>
                            </LinkBox>
                            <LinkBox as="article" maxW="sm" p="3" borderWidth="1px" rounded="md">
                                <LinkOverlay href="https://github.com/r-40021/bingo/blob/main/README_ja.md#%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%82%BD%E3%83%BC%E3%82%B9%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9" isExternal onClick={onClose}>
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