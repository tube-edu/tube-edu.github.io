import React from 'react';
import { viewMatrix } from '../models/Game';
import { getClassName } from '../models/Piece';
import { Context } from '../context';
export default function GameboardView() {
    var game = React.useContext(Context);
    var matrix = viewMatrix(game);
    return (React.createElement("table", { className: "game-board" },
        React.createElement("tbody", null, matrix.map(function (row, i) {
            var blocksInRow = row.map(function (block, j) {
                var classString = "game-block ".concat(block ? getClassName(block) : 'block-empty');
                return React.createElement("td", { key: j, className: classString });
            });
            return React.createElement("tr", { key: i }, blocksInRow);
        }))));
}
