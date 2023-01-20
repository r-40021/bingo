import React from 'react';
import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import { MdUndo, MdRedo } from "react-icons/md";
import { useKey } from 'react-use';

export function Undo(props) {
    const [ua, updateUA] = React.useState();

    React.useEffect(() => {
        updateUA(window.navigator.userAgent.toLowerCase());
    }, []);

    const ctrlKey = /iphone|ipad|mac os x/.test(ua) ? "⌘" : "Ctrl";
    const undo = () => {
        const newIndex = props.props.nowIndex - 1;
        props.props.changeIndex(newIndex);
        refresh(newIndex);
    };

    const redo = () => {
        const newIndex = props.props.nowIndex + 1;
        props.props.changeIndex(newIndex);
        refresh(newIndex);
    };

    const refresh = newIndex => {
        if (newIndex > -1) {
            const currentHistory = props.props.bingoHistory[newIndex];
            props.props.changeMax(currentHistory.max);
            props.props.changeNum(currentHistory.num);
            props.props.changeColor(currentHistory.colorIndex);
        } else if (newIndex === -1) {
            props.props.changeNum("");
            props.props.changeColor(0);
        }
    }

    const handleKeydownUndo = (e) => ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key === 'z' && !props.props.isSpin && props.props.nowIndex >= 0 && props.props.bingoHistory.length > 0 && document.activeElement.tagName.toLocaleLowerCase() !== "input";

    const handleKeydownRedo = (e) => ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key === 'y' && !props.props.isSpin && props.props.nowIndex < props.props.bingoHistory.length - 1 && props.props.bingoHistory.length > 0 && document.activeElement.tagName.toLocaleLowerCase() !== "input";

    useKey(handleKeydownUndo, undo, {event: 'keyup'});
    useKey(handleKeydownRedo, redo, {event: 'keyup'});

    return (
        <ButtonGroup
            size="md"
            isAttached
            variant="outline"
            className="undoGroup"
        >
            <Tooltip label={`戻る (${ctrlKey}+Z)`}>
                <IconButton aria-label="戻る" icon={<MdUndo />} isDisabled={!props.props.bingoHistory || props.props.isSpin || props.props.nowIndex < 0 || props.props.bingoHistory.length === 0} onClick={undo} />
            </Tooltip>
            <Tooltip label={`進む (${ctrlKey}+Y)`}>
                <IconButton aria-label="進む" icon={<MdRedo />} isDisabled={!props.props.bingoHistory || props.props.isSpin || props.props.nowIndex >= props.props.bingoHistory.length - 1 || props.props.bingoHistory.length === 0} onClick={redo} />
            </Tooltip>
        </ButtonGroup>
    );
}