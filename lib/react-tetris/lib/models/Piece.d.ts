export declare const pieces: readonly ["I", "J", "L", "O", "S", "T", "Z"];
export type Piece = (typeof pieces)[number];
export type Rotation = 0 | 1 | 2 | 3;
export declare const isRotation: (num: number) => num is Rotation;
export declare const getBlocks: (piece: Piece) => number[][][];
export declare const getClassName: (piece: Piece | 'ghost') => string;
