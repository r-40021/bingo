import React from 'react';
import './App.css';
import { MenuItem, MenuGroup, useToast } from "@chakra-ui/react";
import { MdLink, MdMoreVert } from "react-icons/md";
import { FaLine, FaTwitter } from "react-icons/fa";

export function ShareMenu() {
    const toast = useToast();
    return (
        <MenuGroup title="共有">
            <MenuItem icon={<MdLink />} onClick={() => {
                CopyURL();
                toast({
                    title: "URL をコピーしました",
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }}>URL をコピー</MenuItem>
            <MenuItem icon={<FaTwitter />} onClick={() => { ShareToSNS("twitter") }}>ツイート</MenuItem>
            <MenuItem icon={<FaLine />} onClick={() => { ShareToSNS("line") }}>LINE で送る</MenuItem>
            {navigator.share ? <MenuItem icon={<MdMoreVert />} onClick={() => { ShareToSNS() }}>その他の方法</MenuItem> : null}
        </MenuGroup>
    );
}

function CopyURL() {
    navigator.clipboard.writeText(window.location.href);
}


function ShareToSNS(media) {
    switch (media) {
        case "twitter":
            window.open(encodeURI(decodeURI(`https://twitter.com/intent/tweet?text=自動保存機能付きビンゴマシーン%0a&url=${window.location.href}&hashtags=やまだBINGO,やまだのアプリ`)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
            break;
        case "line":
            window.open(encodeURI(`https://social-plugins.line.me/lineit/share?url=${window.location.href}`), 'LINE', 'width=650, height=550, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
            break;

        default:
            shareAPI();
            break;
    }
}

async function shareAPI() {
    const shareData = {
        title: "やまだBINGO",
        text: "履歴や設定を自動で保存する機能を搭載した、インストール不要のビンゴマシーン",
        url: window.location.href
    }

    try {
        await navigator.share(shareData)
    } catch (err) {
        console.error("Web Share API:" + err);
    }
}