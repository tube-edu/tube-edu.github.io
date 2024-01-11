import React from 'react';
import { Action } from '../models/Game';
export type KeyboardMap = Record<string, Action>;
export declare const useKeyboardControls: (keyboardMap: KeyboardMap, dispatch: React.Dispatch<Action>) => void;
