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
import { buildMatrix, addPieceToBoard, isEmptyPosition, flipClockwise, flipCounterclockwise, moveDown, moveLeft, moveRight, setPiece, hardDrop } from './Matrix';
import Constants from '../constants';
import * as PieceQueue from '../modules/piece-queue';
export var getLevel = function (game) { return Math.floor(game.lines / 10) + 1; };
export var update = function (game, action) {
    var _a, _b;
    switch (action) {
        case 'RESTART': {
            return init();
        }
        case 'PAUSE': {
            return game.state === 'PLAYING' ? __assign(__assign({}, game), { state: 'PAUSED' }) : game;
        }
        case 'RESUME': {
            return game.state === 'PAUSED' ? __assign(__assign({}, game), { state: 'PLAYING' }) : game;
        }
        case 'TOGGLE_PAUSE': {
            if (game.state === 'PLAYING')
                return __assign(__assign({}, game), { state: 'PAUSED' });
            if (game.state === 'PAUSED')
                return __assign(__assign({}, game), { state: 'PLAYING' });
            return game;
        }
        case 'HARD_DROP': {
            if (game.state !== 'PLAYING')
                return game;
            var piece = hardDrop(game.matrix, game.piece);
            return lockInPiece(__assign(__assign({}, game), { piece: piece }));
        }
        case 'TICK':
        case 'MOVE_DOWN': {
            if (game.state !== 'PLAYING')
                return game;
            var updated = applyMove(moveDown, game);
            if (game.piece === updated.piece) {
                return lockInPiece(updated);
            }
            else {
                return updated;
            }
        }
        case 'MOVE_LEFT': {
            return applyMove(moveLeft, game);
        }
        case 'MOVE_RIGHT': {
            return applyMove(moveRight, game);
        }
        case 'FLIP_CLOCKWISE': {
            return applyMove(flipClockwise, game);
        }
        case 'FLIP_COUNTERCLOCKWISE': {
            return applyMove(flipCounterclockwise, game);
        }
        case 'HOLD': {
            if (game.state !== 'PLAYING')
                return game;
            if (game.heldPiece && !game.heldPiece.available)
                return game;
            // Ensure the held piece will fit on the matrix
            if (game.heldPiece &&
                !isEmptyPosition(game.matrix, __assign(__assign({}, game.piece), { piece: game.heldPiece.piece }))) {
                return game;
            }
            var next = PieceQueue.getNext(game.queue);
            var newPiece = (_b = (_a = game.heldPiece) === null || _a === void 0 ? void 0 : _a.piece) !== null && _b !== void 0 ? _b : next.piece;
            return __assign(__assign({}, game), { heldPiece: { piece: game.piece.piece, available: false }, piece: initializePiece(newPiece), queue: newPiece === next.piece ? next.queue : game.queue });
        }
        default: {
            var exhaustiveCheck = action;
            throw new Error("Unhandled action: ".concat(exhaustiveCheck));
        }
    }
};
var lockInPiece = function (game) {
    var _a = setPiece(game.matrix, game.piece), matrix = _a[0], linesCleared = _a[1];
    var next = PieceQueue.getNext(game.queue);
    var piece = initializePiece(next.piece);
    return __assign(__assign({}, game), { state: isEmptyPosition(matrix, piece) ? game.state : 'LOST', matrix: matrix, piece: piece, heldPiece: game.heldPiece
            ? __assign(__assign({}, game.heldPiece), { available: true }) : undefined, queue: next.queue, lines: game.lines + linesCleared, points: game.points + addScore(linesCleared) });
};
var pointsPerLine = 100;
var addScore = function (additionalLines) {
    // what's this called?
    if (additionalLines === 4) {
        return pointsPerLine * 10;
    }
    else {
        return additionalLines * pointsPerLine;
    }
};
var initialPosition = {
    x: Constants.GAME_WIDTH / 2 - Constants.BLOCK_WIDTH / 2,
    y: 0
};
var initializePiece = function (piece) {
    return {
        position: initialPosition,
        piece: piece,
        rotation: 0
    };
};
var applyMove = function (move, game) {
    if (game.state !== 'PLAYING')
        return game;
    var afterFlip = move(game.matrix, game.piece);
    return afterFlip ? __assign(__assign({}, game), { piece: afterFlip }) : game;
};
export var init = function () {
    var queue = PieceQueue.create(5);
    var next = PieceQueue.getNext(queue);
    return {
        state: 'PLAYING',
        points: 0,
        lines: 0,
        matrix: buildMatrix(),
        piece: initializePiece(next.piece),
        heldPiece: undefined,
        queue: next.queue
    };
};
// Good display of merging piece + matrix
export function viewMatrix(game) {
    var gameboard = game.matrix;
    // set the preview
    gameboard = addPieceToBoard(gameboard, hardDrop(gameboard, game.piece), true);
    // set the actual piece
    return addPieceToBoard(gameboard, game.piece);
}
