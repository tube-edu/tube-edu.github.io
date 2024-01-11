import React from 'react';
import * as Game from '../models/Game';
import { KeyboardMap } from '../hooks/useKeyboardControls';
export type RenderFn = (params: {
    HeldPiece: React.ComponentType;
    Gameboard: React.ComponentType;
    PieceQueue: React.ComponentType;
    points: number;
    linesCleared: number;
    level: number;
    state: Game.State;
    controller: Controller;
}) => React.ReactElement;
export type Controller = {
    pause: () => void;
    resume: () => void;
    hold: () => void;
    hardDrop: () => void;
    moveDown: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    flipClockwise: () => void;
    flipCounterclockwise: () => void;
    restart: () => void;
};
type Props = {
    keyboardControls?: KeyboardMap;
    children: RenderFn;
};
export default function Tetris(props: Props): JSX.Element;
export {};
