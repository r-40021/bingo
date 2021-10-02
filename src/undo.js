import React from 'react';
import './App.css';
import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import { MdUndo, MdRedo } from "react-icons/md";

export function Undo(props) {
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

    return (
        <ButtonGroup
            size="md"
            isAttached
            variant="outline"
            className="undoGroup"
        >
            <Tooltip label="戻る">
                <IconButton aria-label="戻る" icon={<MdUndo />} disabled={props.props.isSpin || props.props.nowIndex < 0 || props.props.bingoHistory.length === 0} onClick={undo} />
            </Tooltip>
            <Tooltip label="進む">
                <IconButton aria-label="進む" icon={<MdRedo />} disabled={props.props.isSpin || props.props.nowIndex >= props.props.bingoHistory.length - 1 || props.props.bingoHistory.length === 0} onClick={redo} />
            </Tooltip>
        </ButtonGroup>
    );
}