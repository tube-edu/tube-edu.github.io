var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Constants from '../constants';
import { getBlocks, isRotation } from './Piece';
var GAME_HEIGHT = Constants.GAME_HEIGHT, GAME_WIDTH = Constants.GAME_WIDTH;
var serializeCoords = function (_a) {
    var x = _a.x, y = _a.y;
    return "".concat(x, ",").concat(y);
};
export function buildMatrix() {
    var matrix = new Array(GAME_HEIGHT);
    for (var y = 0; y < matrix.length; y++) {
        matrix[y] = buildGameRow();
    }
    return matrix;
}
function buildGameRow() {
    return new Array(GAME_WIDTH).fill(null);
}
export var addPieceToBoard = function (matrix, positionedPiece, isGhost) {
    if (isGhost === void 0) { isGhost = false; }
    var piece = positionedPiece.piece, rotation = positionedPiece.rotation, position = positionedPiece.position;
    var block = getBlocks(piece)[rotation];
    if (!block) {
        throw new Error("Unexpected: no rotation ".concat(rotation, " found to piece ").concat(piece));
    }
    var filledCells = block.reduce(function (output, row, y) {
        return output.concat(row.map(function (cell, x) {
            return cell ? { x: x + position.x, y: y + position.y } : false;
        }));
    }, []);
    var filled = new Set(filledCells
        .map(function (value) { return (value ? serializeCoords(value) : ''); })
        .filter(Boolean));
    var value = isGhost ? 'ghost' : piece;
    return matrix.map(function (row, y) {
        return row.map(function (cell, x) {
            return filled.has(serializeCoords({ x: x, y: y })) ? value : cell;
        });
    });
};
export function setPiece(matrix, positionedPiece) {
    var _matrix = addPieceToBoard(matrix, positionedPiece);
    // TODO: purify
    var linesCleared = clearFullLines(_matrix);
    return [_matrix, linesCleared];
}
function clearFullLines(matrix) {
    var linesCleared = 0;
    for (var y = 0; y < matrix.length; y++) {
        // it's a full line
        if (every(matrix[y])) {
            // so rip it out
            matrix.splice(y, 1);
            matrix.unshift(buildGameRow());
            linesCleared += 1;
        }
    }
    return linesCleared;
}
function every(list) {
    for (var i = 0; i < list.length; i++) {
        if (!list[i])
            return false;
    }
    return true;
}
export function isEmptyPosition(matrix, positionedPiece) {
    var piece = positionedPiece.piece, rotation = positionedPiece.rotation, position = positionedPiece.position;
    var blocks = getBlocks(piece)[rotation];
    for (var x = 0; x < Constants.BLOCK_WIDTH; x++) {
        for (var y = 0; y < Constants.BLOCK_HEIGHT; y++) {
            var block = blocks[y][x];
            var matrixX = x + position.x;
            var matrixY = y + position.y;
            // might not be filled, ya know
            if (block) {
                // make sure it's on the matrix
                if (matrixX >= 0 && matrixX < GAME_WIDTH && matrixY < GAME_HEIGHT) {
                    // make sure it's available
                    if (!matrix[matrixY] || matrix[matrixY][matrixX]) {
                        // that square is taken by the matrix already
                        return false;
                    }
                }
                else {
                    // there's a square in the block that's off the matrix
                    return false;
                }
            }
        }
    }
    return true;
}
function assert(value) {
    if (!value)
        throw new Error('assertion failed');
}
function tryMove(move) {
    return function (gameboard, positionedPiece) {
        var updatedPiece = move(positionedPiece);
        if (isEmptyPosition(gameboard, updatedPiece)) {
            return updatedPiece;
        }
        return undefined;
    };
}
export var moveLeft = tryMove(function (positionedPiece) {
    var newPosition = __assign(__assign({}, positionedPiece.position), { x: positionedPiece.position.x - 1 });
    return __assign(__assign({}, positionedPiece), { position: newPosition });
});
export var moveRight = tryMove(function (positionedPiece) {
    var newPosition = __assign(__assign({}, positionedPiece.position), { x: positionedPiece.position.x + 1 });
    return __assign(__assign({}, positionedPiece), { position: newPosition });
});
export var moveDown = tryMove(function (positionedPiece) {
    var newPosition = __assign(__assign({}, positionedPiece.position), { y: positionedPiece.position.y + 1 });
    return __assign(__assign({}, positionedPiece), { position: newPosition });
});
export var flipClockwise = tryMove(function (positionedPiece) {
    var _a;
    var rotation = (((_a = positionedPiece.rotation) !== null && _a !== void 0 ? _a : 0) + 1) % Constants.ROTATION_COUNT;
    assert(isRotation(rotation));
    return __assign(__assign({}, positionedPiece), { rotation: rotation });
});
export var flipCounterclockwise = tryMove(function (positionedPiece) {
    var _a;
    var rotation = ((_a = positionedPiece.rotation) !== null && _a !== void 0 ? _a : 0) - 1;
    if (rotation < 0)
        rotation += Constants.ROTATION_COUNT;
    assert(isRotation(rotation));
    return __assign(__assign({}, positionedPiece), { rotation: rotation });
});
export function hardDrop(gameboard, positionedPiece) {
    var position = __assign({}, positionedPiece.position);
    while (isEmptyPosition(gameboard, __assign(__assign({}, positionedPiece), { position: position }))) {
        position.y += 1;
    }
    // at this point, we just found a non-empty position, so let's step back
    position.y -= 1;
    return __assign(__assign({}, positionedPiece), { position: position });
}
