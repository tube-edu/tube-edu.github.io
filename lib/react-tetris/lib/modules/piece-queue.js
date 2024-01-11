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
import { pieces } from '../models/Piece';
export function create(minimumLength) {
    return fill({
        minimumLength: minimumLength,
        queue: [],
        bucket: []
    });
}
function fill(pieceQueue) {
    var local = [];
    var bucket = pieceQueue.bucket;
    while (local.length + pieceQueue.queue.length < pieceQueue.minimumLength) {
        var _a = pullFromBucket(bucket), piece = _a[0], updatedBucket = _a[1];
        local.push(piece);
        bucket = updatedBucket;
    }
    return __assign(__assign({}, pieceQueue), { queue: pieceQueue.queue.concat(local) });
}
export function getNext(pieceQueue) {
    if (!pieceQueue.queue[0]) {
        throw new Error('Unexpected empty queue');
    }
    var next = pieceQueue.queue[0];
    var queue = pieceQueue.queue.slice(1);
    return {
        piece: next,
        queue: fill(__assign(__assign({}, pieceQueue), { queue: queue }))
    };
}
function pullFromBucket(bucket) {
    var local = bucket.slice(0);
    if (local.length === 0) {
        // fill the bucket
        pieces.forEach(function (piece) {
            // 4 is just the number of each type of piece. it's arbitrary, not magic, okay.
            for (var i = 0; i < 4; i++) {
                local.push(piece);
            }
        });
    }
    var randomPiece = local.splice(randomNumber(local.length), 1)[0];
    if (!randomPiece) {
        console.error('bucket:', JSON.stringify(local));
        throw new Error("Unexpected: failed to pull from bucket");
    }
    return [randomPiece, local];
}
function randomNumber(under) {
    return Math.floor(Math.random() * under);
}
