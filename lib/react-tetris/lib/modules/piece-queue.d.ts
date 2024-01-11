import { Piece } from '../models/Piece';
export type PieceQueue = {
    minimumLength: number;
    queue: Piece[];
    bucket: Piece[];
};
export declare function create(minimumLength: number): PieceQueue;
export declare function getNext(pieceQueue: PieceQueue): {
    piece: Piece;
    queue: PieceQueue;
};
export default PieceQueue;
