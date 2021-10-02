import React from 'react';
import './App.css';
import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import { MdUndo, MdRedo } from "react-icons/md";

export function Undo(props) {
    return (
        <ButtonGroup
            size="md"
            isAttached
            variant="outline"
            className="undoGroup"
        >
            <Tooltip label="前に戻る">
                <IconButton aria-label="前に戻る" icon={<MdUndo />} disabled={props.props.isSpin} />
            </Tooltip>
            <Tooltip label="後に進む">
                <IconButton aria-label="後に進む" icon={<MdRedo />} disabled={props.props.isSpin} />
            </Tooltip>
        </ButtonGroup>
    );
}