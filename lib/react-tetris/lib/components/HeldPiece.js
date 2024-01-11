import React from 'react';
import PieceView from './PieceView';
import { Context } from '../context';
export default function HeldPiece() {
    var heldPiece = React.useContext(Context).heldPiece;
    return React.createElement(PieceView, { piece: heldPiece === null || heldPiece === void 0 ? void 0 : heldPiece.piece });
}
