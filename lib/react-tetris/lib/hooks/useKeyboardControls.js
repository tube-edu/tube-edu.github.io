import React from 'react';
import key from 'keymaster';
import DetectShift from '../modules/detect-shift';
export var useKeyboardControls = function (keyboardMap, dispatch) {
    React.useEffect(function () {
        var keyboardDispatch = Object.entries(keyboardMap).reduce(function (output, _a) {
            var key = _a[0], action = _a[1];
            output[key] = function () { return dispatch(action); };
            return output;
        }, {});
        addKeyboardEvents(keyboardDispatch);
        return function () { return removeKeyboardEvents(keyboardDispatch); };
    }, [keyboardMap, dispatch]);
};
function addKeyboardEvents(keyboardMap) {
    Object.keys(keyboardMap).forEach(function (k) {
        var fn = keyboardMap[k];
        if (k === 'shift' && fn) {
            DetectShift.bind(fn);
        }
        else if (fn) {
            key(k, fn);
        }
    });
}
function removeKeyboardEvents(keyboardMap) {
    Object.keys(keyboardMap).forEach(function (k) {
        if (k === 'shift') {
            var fn = keyboardMap[k];
            fn && DetectShift.unbind(fn);
        }
        else {
            key.unbind(k);
        }
    });
}
