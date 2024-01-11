import React from 'react';
import Gameboard from './Gameboard';
import * as Game from '../models/Game';
import HeldPiece from './HeldPiece';
import PieceQueue from './PieceQueue';
import { Context } from '../context';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
var defaultKeyboardMap = {
    down: 'MOVE_DOWN',
    left: 'MOVE_LEFT',
    right: 'MOVE_RIGHT',
    space: 'HARD_DROP',
    z: 'FLIP_COUNTERCLOCKWISE',
    x: 'FLIP_CLOCKWISE',
    up: 'FLIP_CLOCKWISE',
    p: 'TOGGLE_PAUSE',
    c: 'HOLD',
    shift: 'HOLD'
};
// https://harddrop.com/wiki/Tetris_Worlds#Gravity
var tickSeconds = function (level) {
    return Math.pow((0.8 - (level - 1) * 0.007), (level - 1));
};
export default function Tetris(props) {
    var _a;
    var _b = React.useReducer(Game.update, Game.init()), game = _b[0], dispatch = _b[1];
    var keyboardMap = (_a = props.keyboardControls) !== null && _a !== void 0 ? _a : defaultKeyboardMap;
    useKeyboardControls(keyboardMap, dispatch);
    var level = Game.getLevel(game);
    React.useEffect(function () {
        var interval;
        if (game.state === 'PLAYING') {
            interval = window.setInterval(function () {
                dispatch('TICK');
            }, tickSeconds(level) * 1000);
        }
        return function () {
            window.clearInterval(interval);
        };
    }, [game.state, level]);
    var controller = React.useMemo(function () { return ({
        pause: function () { return dispatch('PAUSE'); },
        resume: function () { return dispatch('RESUME'); },
        hold: function () { return dispatch('HOLD'); },
        hardDrop: function () { return dispatch('HARD_DROP'); },
        moveDown: function () { return dispatch('MOVE_DOWN'); },
        moveLeft: function () { return dispatch('MOVE_LEFT'); },
        moveRight: function () { return dispatch('MOVE_RIGHT'); },
        flipClockwise: function () { return dispatch('FLIP_CLOCKWISE'); },
        flipCounterclockwise: function () { return dispatch('FLIP_COUNTERCLOCKWISE'); },
        restart: function () { return dispatch('RESTART'); }
    }); }, [dispatch]);
    return (React.createElement(Context.Provider, { value: game }, props.children({
        HeldPiece: HeldPiece,
        Gameboard: Gameboard,
        PieceQueue: PieceQueue,
        points: game.points,
        linesCleared: game.lines,
        state: game.state,
        level: level,
        controller: controller
    })));
}
