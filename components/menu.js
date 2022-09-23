import React from 'react';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { MdKeyboardArrowUp, MdLockOutline } from "react-icons/md";

import { SelectTheme } from './theme';
import { AboutApp } from './about'
import { ShareMenu } from './share';

export function MoreTools() {
    const [inWidth, changeWidth] = React.useState();
    React.useEffect(() => {
        changeWidth(document.body.clientWidth)
        window.addEventListener("resize", () => changeWidth(document.body.clientWidth));
    }, []);

    return (
        <Box p={4} pr={inWidth > 400 ? 4 : 0} pl={inWidth > 400 ? 1.5 : 0}>
            <Menu boundary="scrollParent" placement="top" autoSelect={false}>
                <MenuButton as={IconButton} className="moreSettings" icon={<MdKeyboardArrowUp />} aria-label="さらにメニューを表示">
                </MenuButton>
                <MenuList boxShadow="lg" lineHeight="1.6em" maxH="80vh" overflowY="auto">
                    <MenuGroup title="情報">
                        <AboutApp />
                        <MenuItem icon={<MdLockOutline />} onClick={() => { window.open('https://frogapp.net/privacy'); }}>プライバシーポリシー</MenuItem>
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
    );
}
