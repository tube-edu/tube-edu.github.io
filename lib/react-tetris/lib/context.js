import React from 'react';
import { init } from './models/Game';
export var Context = React.createContext(init());
