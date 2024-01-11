import { Piece, Rotation } from './Piece';
export { Piece };
export type Coords = {
    x: number;
    y: number;
};
export type Matrix = Array<Array<Piece | 'ghost' | null>>;
export declare function buildMatrix(): Matrix;
export declare const addPieceToBoard: (matrix: Matrix, positionedPiece: PositionedPiece, isGhost?: boolean) => Matrix;
export type PositionedPiece = {
    piece: Piece;
    rotation: Rotation;
    position: Coords;
};
export declare function setPiece(matrix: Matrix, positionedPiece: PositionedPiece): [Matrix, number];
export declare function isEmptyPosition(matrix: Matrix, positionedPiece: PositionedPiece): boolean;
export declare const moveLeft: (gameboard: Matrix, positionedPiece: PositionedPiece) => PositionedPiece | undefined;
export declare const moveRight: (gameboard: Matrix, positionedPiece: PositionedPiece) => PositionedPiece | undefined;
export declare const moveDown: (gameboard: Matrix, positionedPiece: PositionedPiece) => PositionedPiece | undefined;
export declare const flipClockwise: (gameboard: Matrix, positionedPiece: PositionedPiece) => PositionedPiece | undefined;
export declare const flipCounterclockwise: (gameboard: Matrix, positionedPiece: PositionedPiece) => PositionedPiece | undefined;
export declare function hardDrop(gameboard: Matrix, positionedPiece: PositionedPiece): PositionedPiece;
