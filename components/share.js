import React from 'react';
import { MenuItem, MenuGroup, useToast } from "@chakra-ui/react";
import { MdLink, MdMoreVert } from "react-icons/md";
import { FaLine } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri"

export function ShareMenu() {
    const toast = useToast();
    const [navigatorShare, setnavigatorShare] = React.useState(false);
    React.useEffect(() => {
        setnavigatorShare(Boolean(navigator.share));
    }, []);
    return (
        <MenuGroup title="共有">
            <MenuItem icon={<MdLink />} onClick={() => {
                CopyURL();
                toast({
                    title: "URLをコピーしました",
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }}>URLをコピー</MenuItem>
            <MenuItem icon={<RiTwitterXFill />} onClick={() => { ShareToSNS("twitter") }}>ポスト</MenuItem>
            <MenuItem icon={<FaLine />} onClick={() => { ShareToSNS("line") }}>LINEで送る</MenuItem>
            {navigatorShare ? <MenuItem icon={<MdMoreVert />} onClick={() => { ShareToSNS() }}>その他の方法</MenuItem> : null}
        </MenuGroup>
    );
}

function CopyURL() {
    navigator.clipboard.writeText(window.location.href);
}


function ShareToSNS(media) {
    switch (media) {
        case "twitter":
            window.open(encodeURI(decodeURI(`https://x.com/intent/tweet?text=自動保存機能付きビンゴマシーン%0a&url=${window.location.href}&hashtags=やまだBINGO,やまだのアプリ`)));
            break;
        case "line":
            window.open(encodeURI(`https://social-plugins.line.me/lineit/share?url=${window.location.href}`));
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