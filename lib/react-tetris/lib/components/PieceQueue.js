import React from 'react';
import PieceView from './PieceView';
import { Context } from '../context';
export default function PieceQueue() {
    var queue = React.useContext(Context).queue;
    return (React.createElement("div", null, queue.queue.map(function (piece, i) { return (React.createElement(PieceView, { piece: piece, key: i })); })));
}
