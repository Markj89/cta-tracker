import { KeyboardEvent as ReactKeyBoardEvent } from "react";

const isKey = (key:string) => (e: KeyboardEvent | ReactKeyBoardEvent) => e?.key === key;

const KEYS = {
    Escape: "Escape",
    Space: ' '
};

export const keyboardUtils = {
    isEscape: isKey(KEYS.Escape),
    isSpaceKey: isKey(KEYS?.Space)
}