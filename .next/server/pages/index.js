"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "@chakra-ui/react"
const react_namespaceObject = require("@chakra-ui/react");
;// CONCATENATED MODULE: external "react-use"
const external_react_use_namespaceObject = require("react-use");
;// CONCATENATED MODULE: external "react-icons/md"
const md_namespaceObject = require("react-icons/md");
;// CONCATENATED MODULE: external "react-icons/bs"
const bs_namespaceObject = require("react-icons/bs");
;// CONCATENATED MODULE: ./components/theme.js





function SelectTheme() {
    const [autoTheme, toggleAutoTheme] = external_react_default().useState(!localStorage.getItem("theme") || localStorage.getItem("theme") === "auto");
    const [isOpen, setIsOpen] = external_react_default().useState(false);
    const onClose = ()=>setIsOpen(false);
    const cancelRef = external_react_default().useRef();
    const { colorMode , toggleColorMode  } = (0,react_namespaceObject.useColorMode)();
    let themeIcon = colorMode === "light" ? /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdBrightnessHigh, {}) : /*#__PURE__*/ jsx_runtime_.jsx(bs_namespaceObject.BsMoon, {});
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    const ToggleTheme = ()=>{
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
    };
    const changeThemeColor = (type)=>{
        let color;
        if (type === "dark") {
            color = "#33373d";
        } else {
            color = "#f8f9fa";
        }
        document.getElementById("headThemeColor").setAttribute("content", color);
    };
    const handleChange = ()=>{
        if (autoTheme) {
            ToggleTheme();
        }
    };
    external_react_default().useEffect(()=>{
        ToggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        autoTheme
    ]);
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
    const handleClickAuto = ()=>{
        const nowAuto = autoTheme;
        localStorage.setItem("theme", "auto");
        toggleAutoTheme(true);
        if (nowAuto) {
            ToggleTheme();
        }
    };
    const handleClickLight = ()=>{
        const nowAuto = autoTheme;
        localStorage.setItem("theme", "light");
        toggleAutoTheme(false);
        if (colorMode === "dark" && !nowAuto) {
            ToggleTheme();
        }
    };
    const handleClickDark = ()=>{
        const nowAuto = autoTheme;
        localStorage.setItem("theme", "dark");
        toggleAutoTheme(false);
        if (colorMode === "light" && !nowAuto) {
            ToggleTheme();
        }
    };
    window.addEventListener("load", ()=>{
        ToggleTheme();
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                icon: themeIcon,
                onClick: ()=>setIsOpen(true),
                children: "テーマ切り替え"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialog, {
                isOpen: isOpen,
                leastDestructiveRef: cancelRef,
                onClose: onClose,
                isCentered: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogOverlay, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogContent, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogHeader, {
                                fontSize: "lg",
                                fontWeight: "bold",
                                children: "テーマ選択"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogBody, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: "アプリのテーマを選択することができます。"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: "デバイスの設定に合わせることもできます。"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Box, {
                                        pb: 3,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                                as: "article",
                                                maxW: "sm",
                                                p: "3",
                                                borderWidth: "1px",
                                                rounded: "md",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                                    as: "button",
                                                    onClick: handleClickAuto,
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                                p: 1,
                                                                pe: 4,
                                                                className: "syncModeIcon " + (autoTheme ? "active" : ""),
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdSync, {})
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                flex: "1",
                                                                children: "システムと同期"
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                                as: "article",
                                                maxW: "sm",
                                                p: "3",
                                                borderWidth: "1px",
                                                rounded: "md",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                                    as: "button",
                                                    onClick: handleClickLight,
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                                p: 1,
                                                                pe: 4,
                                                                className: "lightModeIcon " + (localStorage.getItem("theme") === "light" && !autoTheme && colorMode === "light" ? "active" : ""),
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdBrightnessHigh, {})
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                flex: "1",
                                                                children: "ライトモード"
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                                as: "article",
                                                maxW: "sm",
                                                p: "3",
                                                borderWidth: "1px",
                                                rounded: "md",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                                    as: "button",
                                                    onClick: handleClickDark,
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                                p: 1,
                                                                pe: 4,
                                                                className: "darkModeIcon " + (localStorage.getItem("theme") === "dark" && !autoTheme && colorMode === "dark" ? "active" : ""),
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(bs_namespaceObject.BsMoon, {})
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                flex: "1",
                                                                children: "ダークモード"
                                                            })
                                                        ]
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: external "react-icons/vsc"
const vsc_namespaceObject = require("react-icons/vsc");
;// CONCATENATED MODULE: ./components/about.js





function AboutApp() {
    const [isOpen, setIsOpen] = external_react_default().useState(false);
    const onClose = ()=>setIsOpen(false);
    const cancelRef = external_react_default().useRef();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdInfoOutline, {}),
                onClick: ()=>setIsOpen(true),
                children: "このアプリについて"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialog, {
                isOpen: isOpen,
                leastDestructiveRef: cancelRef,
                onClose: onClose,
                isCentered: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogOverlay, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogContent, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogHeader, {
                                fontSize: "lg",
                                fontWeight: "bold",
                                children: "このアプリについて"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogBody, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: "履歴が自動保存されるオンラインビンゴマシーンです。"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: "ソースコードは GitHub で公開しています。"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                        as: "div",
                                        maxW: "sm",
                                        p: "3",
                                        borderWidth: "1px",
                                        rounded: "md",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                            href: "https://frogapp.net/",
                                            isExternal: true,
                                            onClick: onClose,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                        p: 1,
                                                        pe: 4,
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdPerson, {})
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        flex: "1",
                                                        children: "作者 HP"
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                        as: "div",
                                        maxW: "sm",
                                        p: "3",
                                        borderWidth: "1px",
                                        rounded: "md",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                            href: "https://github.com/r-40021/bingo",
                                            isExternal: true,
                                            onClick: onClose,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                        p: 1,
                                                        pe: 4,
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(vsc_namespaceObject.VscGithubInverted, {})
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        flex: "1",
                                                        children: "ソースコード"
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                        as: "div",
                                        maxW: "sm",
                                        p: "3",
                                        borderWidth: "1px",
                                        rounded: "md",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                            href: "https://github.com/r-40021/bingo/blob/main/LICENSE",
                                            isExternal: true,
                                            onClick: onClose,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                        p: 1,
                                                        pe: 4,
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(vsc_namespaceObject.VscLaw, {})
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        flex: "1",
                                                        children: "ライセンス"
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkBox, {
                                        as: "div",
                                        maxW: "sm",
                                        p: "3",
                                        borderWidth: "1px",
                                        rounded: "md",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.LinkOverlay, {
                                            href: "https://github.com/r-40021/bingo/blob/main/README_ja.md#%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%82%BD%E3%83%BC%E3%82%B9%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9",
                                            isExternal: true,
                                            onClick: onClose,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Center, {
                                                        p: 1,
                                                        pe: 4,
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(vsc_namespaceObject.VscLaw, {})
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        flex: "1",
                                                        children: "謝辞"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogFooter, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                                    ref: cancelRef,
                                    onClick: onClose,
                                    colorScheme: "blue",
                                    variant: "outline",
                                    children: "閉じる"
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: external "react-icons/fa"
const fa_namespaceObject = require("react-icons/fa");
;// CONCATENATED MODULE: ./components/share.js





function ShareMenu() {
    const toast = (0,react_namespaceObject.useToast)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.MenuGroup, {
        title: "共有",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdLink, {}),
                onClick: ()=>{
                    CopyURL();
                    toast({
                        title: "URL をコピーしました",
                        position: "top",
                        status: "success",
                        duration: 3000,
                        isClosable: true
                    });
                },
                children: "URL をコピー"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                icon: /*#__PURE__*/ jsx_runtime_.jsx(fa_namespaceObject.FaTwitter, {}),
                onClick: ()=>{
                    ShareToSNS("twitter");
                },
                children: "ツイート"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                icon: /*#__PURE__*/ jsx_runtime_.jsx(fa_namespaceObject.FaLine, {}),
                onClick: ()=>{
                    ShareToSNS("line");
                },
                children: "LINE で送る"
            }),
            navigator.share ? /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdMoreVert, {}),
                onClick: ()=>{
                    ShareToSNS();
                },
                children: "その他の方法"
            }) : null
        ]
    });
}
function CopyURL() {
    navigator.clipboard.writeText(window.location.href);
}
function ShareToSNS(media) {
    switch(media){
        case "twitter":
            window.open(encodeURI(decodeURI(`https://twitter.com/intent/tweet?text=自動保存機能付きビンゴマシーン%0a&url=${window.location.href}&hashtags=やまだBINGO,やまだのアプリ`)));
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
    };
    try {
        await navigator.share(shareData);
    } catch (err) {
        console.error("Web Share API:" + err);
    }
}

;// CONCATENATED MODULE: ./components/menu.js







function MoreTools() {
    const [inWidth, changeWidth] = external_react_default().useState(document.body.clientWidth);
    window.addEventListener("resize", ()=>changeWidth(document.body.clientWidth));
    return /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Box, {
        p: 4,
        pr: inWidth > 400 ? 4 : 0,
        pl: inWidth > 400 ? 1.5 : 0,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Menu, {
            boundary: "scrollParent",
            placement: "top",
            autoSelect: false,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuButton, {
                    as: react_namespaceObject.IconButton,
                    className: "moreSettings",
                    icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdKeyboardArrowUp, {}),
                    "aria-label": "さらにメニューを表示"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.MenuList, {
                    boxShadow: "lg",
                    lineHeight: "1.6em",
                    maxH: "80vh",
                    overflowY: "auto",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.MenuGroup, {
                            title: "情報",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(AboutApp, {}),
                                /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuItem, {
                                    icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdLockOutline, {}),
                                    onClick: ()=>{
                                        window.open("https://frogapp.net/privacy");
                                    },
                                    children: "プライバシーポリシー"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuDivider, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuGroup, {
                            title: "設定",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(SelectTheme, {})
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.MenuDivider, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(ShareMenu, {})
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/undo.js





function Undo(props) {
    const ua = window.navigator.userAgent.toLowerCase();
    const ctrlKey = /iphone|ipad|mac os x/.test(ua) ? "⌘" : "Ctrl";
    const undo = ()=>{
        const newIndex = props.props.nowIndex - 1;
        props.props.changeIndex(newIndex);
        refresh(newIndex);
    };
    const redo = ()=>{
        const newIndex = props.props.nowIndex + 1;
        props.props.changeIndex(newIndex);
        refresh(newIndex);
    };
    const refresh = (newIndex)=>{
        if (newIndex > -1) {
            const currentHistory = props.props.bingoHistory[newIndex];
            props.props.changeMax(currentHistory.max);
            props.props.changeNum(currentHistory.num);
            props.props.changeColor(currentHistory.colorIndex);
        } else if (newIndex === -1) {
            props.props.changeNum("");
            props.props.changeColor(0);
        }
    };
    const handleKeydownUndo = (e)=>(e.ctrlKey && !e.metaKey || !e.ctrlKey && e.metaKey) && e.key === "z" && !props.props.isSpin && props.props.nowIndex >= 0 && props.props.bingoHistory.length > 0 && document.activeElement.tagName.toLocaleLowerCase() !== "input";
    const handleKeydownRedo = (e)=>(e.ctrlKey && !e.metaKey || !e.ctrlKey && e.metaKey) && e.key === "y" && !props.props.isSpin && props.props.nowIndex < props.props.bingoHistory.length - 1 && props.props.bingoHistory.length > 0 && document.activeElement.tagName.toLocaleLowerCase() !== "input";
    (0,external_react_use_namespaceObject.useKey)(handleKeydownUndo, undo, {
        event: "keyup"
    });
    (0,external_react_use_namespaceObject.useKey)(handleKeydownRedo, redo, {
        event: "keyup"
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.ButtonGroup, {
        size: "md",
        isAttached: true,
        variant: "outline",
        className: "undoGroup",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Tooltip, {
                label: `戻る (${ctrlKey}+Z)`,
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.IconButton, {
                    "aria-label": "戻る",
                    icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdUndo, {}),
                    disabled: props.props.isSpin || props.props.nowIndex < 0 || props.props.bingoHistory.length === 0,
                    onClick: undo
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Tooltip, {
                label: `進む (${ctrlKey}+Y)`,
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.IconButton, {
                    "aria-label": "進む",
                    icon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdRedo, {}),
                    disabled: props.props.isSpin || props.props.nowIndex >= props.props.bingoHistory.length - 1 || props.props.bingoHistory.length === 0,
                    onClick: redo
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/style.js

const theme = (0,react_namespaceObject.extendTheme)({
    styles: {
        global: {
            body: {
                lineHeight: "1.7em",
                userSelect: "none"
            },
            input: {
                userSelect: "text"
            }
        }
    }
});
/* harmony default export */ const style = (theme);

;// CONCATENATED MODULE: ./pages/index.jsx









const colorList = [
    "#ffa500",
    "#d3e15c",
    "#b384c7",
    "#F06060",
    "#a9ceec"
]; //数字表示エリアの枠線色
function App() {
    let toHistory;
    if (localStorage.getItem("bi-data")) {
        toHistory = JSON.parse(localStorage.getItem("bi-data"));
        if (localStorage.getItem("myHistory")) {
            localStorage.removeItem("myHistory");
        }
        if (localStorage.getItem("lastColor")) {
            localStorage.removeItem("lastColor");
        }
        if (localStorage.getItem("max")) {
            localStorage.removeItem("max");
        }
    } else if (localStorage.getItem("myHistory") && JSON.parse(localStorage.getItem("myHistory")).length > 0) {
        toHistory = [];
        let oldMax;
        let oldColor;
        const myHistory = JSON.parse(localStorage.getItem("myHistory"));
        if (localStorage.getItem("lastColor")) {
            oldColor = Number(localStorage.getItem("lastColor"));
        } else {
            oldColor = 0;
        }
        if (localStorage.getItem("max")) {
            oldMax = Number(localStorage.getItem("max"));
        } else {
            oldMax = 75;
        }
        myHistory.map((value)=>{
            const data = {
                num: value,
                colorIndex: oldColor,
                max: oldMax
            };
            toHistory.push(data);
            return value;
        });
    } else {
        toHistory = [];
    }
    const [bingoMax, changeMax] = external_react_default().useState(75);
    const [bingoHistory, updateHistory] = external_react_default().useState(toHistory);
    const [displayNum, changeNum] = external_react_default().useState();
    const [circleColor, changeColor] = external_react_default().useState(0);
    const [isSpin, changeIsSpin] = external_react_default().useState(false);
    const [nowIndex, changeIndex] = external_react_default().useState(localStorage.getItem("bi-index") && Number(localStorage.getItem("bi-index")) >= -1 ? Number(localStorage.getItem("bi-index")) : toHistory.length - 1);
    const [flexStyle, changeFlexStyle] = external_react_default().useState({
        height: "100vh"
    });
    const { width , height  } = (0,external_react_use_namespaceObject.useWindowSize)();
    let select = [];
    external_react_default().useEffect(()=>localStorage.setItem("bi-data", JSON.stringify(bingoHistory)), [
        bingoHistory
    ]);
    external_react_default().useEffect(()=>localStorage.setItem("bi-index", nowIndex), [
        nowIndex
    ]);
    external_react_default().useEffect(()=>{
        const newStyle = {
            height: height + "px"
        };
        changeFlexStyle(newStyle);
    }, [
        width,
        height
    ]);
    external_react_default().useEffect(()=>{
        if (bingoHistory.length > 0) {
            if (nowIndex > -1) {
                const currentHistory = bingoHistory[nowIndex];
                changeMax(currentHistory.max);
                changeNum(currentHistory.num);
                changeColor(currentHistory.colorIndex);
            } else if (nowIndex === -1) {
                changeMax(bingoHistory[0].max);
                changeNum("");
                changeColor(0);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    for(let i = 0; i < bingoMax; i++){
        const find = bingoHistory.slice(0, nowIndex + 1).some((elem)=>elem.num === i + 1);
        if (!find) {
            select.push(i + 1);
        }
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.ChakraProvider, {
        theme: style,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex",
            style: flexStyle,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Body, {
                    bingoMax,
                    changeMax,
                    bingoHistory,
                    updateHistory,
                    displayNum,
                    circleColor,
                    nowIndex
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Container, {
                    maxW: "container.xl",
                    className: "footer",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "btns",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Btns, {
                                changeNum,
                                bingoMax,
                                changeMax,
                                updateHistory,
                                bingoHistory,
                                select,
                                changeColor,
                                isSpin,
                                changeIsSpin,
                                nowIndex,
                                changeIndex
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "settings",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "range vflex",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(RangeLabel, {}),
                                        /*#__PURE__*/ jsx_runtime_.jsx(MaxNumSet, {
                                            max: bingoMax,
                                            changeMax,
                                            isSpin
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "moreTools",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(MoreTools, {})
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
function Btns(props) {
    const [isOpen, setIsOpen] = external_react_default().useState(false);
    const onClose = ()=>setIsOpen(false);
    const cancelRef = external_react_default().useRef();
    const bodyWordList = [
        "聖戦の記録をリセットしてリプレイしますか…そうは思わないか？",
        "聖痕をリセットしてリプレイし、希望を私たちの光に変えますか…さあ…この力…どう使う……？",
        "魔力の残滓を抹消してリセットしますか？",
        "履歴を全てを”無”に還す《オール・リセット》してやり直しますか……クク、本当かよ？",
        "仮想化思念体に伝説の大崩壊を発生させてやり直しますか？",
        "仮想化思念体（遺伝子組み換えでない）を Ｒｅｓｅｔ してリセットします…頼んだよ、未来の英雄達…か？",
        "『シン』が消えてから、2年の月日が流れた―――データをダ＝カーポしてリセマラ続行…なんて…＂いつもの＂俺らしくねぇよな…か？",
        "履歴を消してやり直しますか、本当にそれが貴公の望みなのか…？",
        "履歴を消して最初、つまり光と闇の両側の世界からリセマラ続行しても運命に抗うというのか……か？",
        "聖戦の記録を粉砕して零式からスキルリセットしますか！？逆行列か！",
        "セーブデータをすべての記憶　すべての存在　すべての次元から消して最初からやり直しますか…？預言書には無かった出来事だ…"
    ];
    const bodyWord = external_react_default().useRef(bodyWordList[Date.now() % bodyWordList.length]);
    const spin = ()=>{
        props.changeIsSpin(true);
        let select = [];
        if (!props.bingoMax && props.bingoMax !== 0) {
            props.changeMax(75);
            for(let i = 0; i < 75; i++){
                const find = props.bingoHistory.slice(0, props.nowIndex + 1).some((elem)=>elem.num === i + 1);
                if (!find) {
                    select.push(i + 1);
                }
            }
        } else {
            select = props.select.slice();
        }
        if (select.length === 0) {
            bodyWord.current = bodyWordList[Date.now() % bodyWordList.length];
            setIsOpen(true);
            props.changeIsSpin(false);
            return;
        }
        let history;
        let count = 0;
        let colorIndex = 0;
        const time = select.length === 1 ? 2 : getRandomInt(5, 11);
        let shuffle = setInterval(()=>{
            const index = getRandomInt(0, select.length);
            const num = select[index];
            props.changeNum(num);
            const colorListIndex = colorIndex % colorList.length;
            props.changeColor(colorListIndex);
            count++;
            if (count >= time) {
                history = [
                    ...props.bingoHistory.slice(0, props.nowIndex + 1),
                    {
                        num: num,
                        colorIndex: colorListIndex,
                        max: props.bingoMax
                    }
                ];
                select.splice(index, 1);
                props.updateHistory(history);
                props.changeIsSpin(false);
                props.changeIndex(history.length - 1);
                clearInterval(shuffle);
            }
            colorIndex++;
        }, 275);
    };
    const getRandomInt = (min, max)=>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Box, {
                py: 2,
                px: 4,
                className: "spinResetBtn",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.ButtonGroup, {
                    spacing: "1",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                            leftIcon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdLoop, {}),
                            colorScheme: "blue",
                            onClick: spin,
                            disabled: props.isSpin,
                            children: "Spin"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(AskReset, {
                            props,
                            bodyWordList
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Box, {
                py: 2,
                px: 4,
                className: "undoRedo",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Undo, {
                    props
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialog, {
                isOpen: isOpen,
                leastDestructiveRef: cancelRef,
                onClose: onClose,
                isCentered: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogOverlay, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogContent, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogHeader, {
                                fontSize: "lg",
                                fontWeight: "bold",
                                children: "終了！"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogBody, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "nomulish",
                                        children: bodyWord.current
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            "― ",
                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                href: "https://racing-lagoon.info/nomu/translate.php",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "linkWithLine",
                                                children: "ノムリッシュ翻訳"
                                            }),
                                            "より"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogFooter, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                                        ref: cancelRef,
                                        onClick: onClose,
                                        children: "キャンセル"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                                        onClick: ()=>{
                                            onClose();
                                            Reset(props);
                                        },
                                        colorScheme: "blue",
                                        ml: 3,
                                        children: "リセット"
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
function MaxNumSet(props) {
    const [inWidth, changeWidth] = external_react_default().useState(document.body.clientWidth);
    const handleChange = (value)=>{
        props.changeMax(value);
    };
    const sliderColor = (0,react_namespaceObject.useColorModeValue)("gray.500", "gray.600");
    window.addEventListener("resize", ()=>changeWidth(document.body.clientWidth));
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Flex, {
        children: [
            inWidth > 576 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Slider, {
                flex: "1",
                focusThumbOnChange: false,
                value: props.max,
                onChange: handleChange,
                ml: "0.9rem",
                max: 99,
                min: 1,
                disabled: props.isSpin,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.SliderTrack, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.SliderFilledTrack, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.SliderThumb, {
                        fontSize: "sm",
                        boxSize: "32px",
                        color: sliderColor,
                        children: props.max
                    })
                ]
            }) : null,
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Box, {
                pr: 0,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.NumberInput, {
                    maxW: inWidth > 576 ? "100px" : "",
                    ml: inWidth > 576 ? "2rem" : "0",
                    value: props.max,
                    onChange: handleChange,
                    max: 99,
                    min: 1,
                    disabled: props.isSpin,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.NumberInputField, {}),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.NumberInputStepper, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.NumberIncrementStepper, {}),
                                /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.NumberDecrementStepper, {})
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
function RangeLabel() {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Box, {
        className: "rangeValue",
        color: (0,react_namespaceObject.useColorModeValue)("gray.600", "gray.400"),
        mb: 2,
        children: "最大値"
    });
}
function Body(props) {
    const numberElem = external_react_default().useRef(null);
    const historyElem = external_react_default().useRef(null);
    const { width , height  } = (0,external_react_use_namespaceObject.useWindowSize)();
    const circleStyle = {
        borderColor: colorList[props.circleColor]
    };
    const currentHistory = props.bingoHistory.slice(0, props.nowIndex + 1);
    external_react_default().useEffect(()=>{
        historyElem.current.scrollTop = historyElem.current.scrollHeight; // 最下部にスクロール
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.bingoHistory,
        props.nowIndex
    ]);
    external_react_default().useEffect(()=>{
        let nowWidth;
        let nowHeight;
        const isResizing = setInterval(()=>{
            if (document.body.clientWidth !== nowWidth && document.body.clientHeight !== nowHeight) {
                nowWidth = document.body.clientWidth;
                nowHeight = document.body.clientHeight;
            } else {
                const numberCurrentElem = numberElem.current;
                numberCurrentElem.style.width = "";
                numberCurrentElem.style.height = "";
                if (numberCurrentElem.offsetWidth <= numberCurrentElem.offsetHeight * 1) {
                    numberCurrentElem.style.height = numberCurrentElem.offsetWidth + "px";
                } else {
                    numberCurrentElem.style.width = numberCurrentElem.offsetHeight + "px";
                }
                numberCurrentElem.style.fontSize = numberCurrentElem.offsetWidth / 5 * 3 + "px";
                numberCurrentElem.style.borderWidth = numberCurrentElem.offsetWidth * 0.1 + "px";
                const historyCurrentElem = historyElem.current;
                if (width < 576) {
                    historyCurrentElem.style.fontSize = Math.min(historyCurrentElem.clientWidth * 0.12 / 3 * 2, 30) + "px";
                } else {
                    historyCurrentElem.style.fontSize = Math.min(historyCurrentElem.clientWidth * 0.11 / 3 * 2, 30) + "px";
                }
                clearInterval(isResizing);
            }
        }, 200);
    }, [
        width,
        height
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Container, {
        maxW: "container.xl",
        className: "body",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "numberWrapper",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "number",
                    ref: numberElem,
                    style: circleStyle,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "displayNumber",
                        children: props.displayNum
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "history",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Box, {
                    borderWidth: "1px",
                    borderRadius: "lg",
                    overflow: "hidden",
                    className: "historyCard",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.Box, {
                            fontWeight: "semibold",
                            lineHeight: "tight",
                            px: "6",
                            pt: "4",
                            pd: "3",
                            color: (0,react_namespaceObject.useColorModeValue)("gray.600", "gray.300"),
                            ref: historyElem,
                            children: [
                                "履歴 (",
                                currentHistory.length,
                                ")"
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Box, {
                            mt: "3",
                            as: "div",
                            color: (0,react_namespaceObject.useColorModeValue)("gray.600", "gray.300"),
                            fontSize: "30px",
                            className: "historyCardBody",
                            ref: historyElem,
                            children: currentHistory.map((history, index)=>{
                                return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "historyNum",
                                    children: history.num
                                }, index);
                            })
                        })
                    ]
                })
            })
        ]
    });
}
function AskReset(props) {
    const [isOpen, setIsOpen] = external_react_default().useState(false);
    const onClose = ()=>setIsOpen(false);
    const cancelRef = external_react_default().useRef();
    const bodyWord = external_react_default().useRef(props.bodyWordList[Date.now() % props.bodyWordList.length]);
    external_react_default().useEffect(()=>{
        if (isOpen) return;
        bodyWord.current = props.bodyWordList[Date.now() % props.bodyWordList.length];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isOpen
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                leftIcon: /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdDelete, {}),
                bg: (0,react_namespaceObject.useColorModeValue)("gray.200", "gray.600"),
                color: (0,react_namespaceObject.useColorModeValue)("gray.600", "gray.200"),
                _hover: {
                    bg: (0,react_namespaceObject.useColorModeValue)("#ff4430", "#f56051"),
                    color: "gray.50"
                },
                variant: "outline",
                onClick: ()=>setIsOpen(true),
                disabled: props.props.isSpin,
                children: "Reset"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialog, {
                isOpen: isOpen,
                leastDestructiveRef: cancelRef,
                onClose: onClose,
                isCentered: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogOverlay, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogContent, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.AlertDialogHeader, {
                                fontSize: "lg",
                                fontWeight: "bold",
                                children: "リセットしますか？"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogBody, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "nomulish",
                                        children: bodyWord.current
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            "― ",
                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                href: "https://racing-lagoon.info/nomu/translate.php",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "linkWithLine",
                                                children: "ノムリッシュ翻訳"
                                            }),
                                            "より"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.AlertDialogFooter, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                                        ref: cancelRef,
                                        onClick: onClose,
                                        children: "キャンセル"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.Button, {
                                        onClick: ()=>{
                                            onClose();
                                            Reset(props.props);
                                        },
                                        colorScheme: "red",
                                        ml: 3,
                                        children: "リセット"
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
function Reset(props) {
    props.updateHistory([]);
    props.changeNum(null);
    props.changeColor(0);
    props.changeIndex(0);
}
/* harmony default export */ const pages = (App);


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(402));
module.exports = __webpack_exports__;

})();