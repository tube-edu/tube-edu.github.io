import React from 'react';
import { getBlocks, getClassName } from '../models/Piece';
var defaultBlock = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var PieceView = function (_a) {
    var piece = _a.piece;
    var fromPiece = piece && getBlocks(piece)[0];
    var blocks = fromPiece !== null && fromPiece !== void 0 ? fromPiece : defaultBlock;
    var rows = blocks.map(function (row, i) {
        var blocksInRow = row.map(function (block, j) {
            var classString = 'game-block ';
            if (piece && block) {
                classString += getClassName(piece);
            }
            else {
                classString += 'block-empty';
            }
            return React.createElement("td", { key: j, className: classString });
        });
        return React.createElement("tr", { key: i }, blocksInRow);
    });
    return (React.createElement("table", { className: "piece-view" },
        React.createElement("tbody", null, rows)));
};
export default PieceView;
