import { CursorCoreOptions } from "./cursor-core";
type ClientCursorMagicOptions = Omit<CursorCoreOptions, 'cursorClickEffect'> & {
    useClickEffect?: boolean;
};
export declare function createCursorMagic(options?: ClientCursorMagicOptions): void;
export declare function initCursorMagic(options?: CursorCoreOptions): void;
export {};
//# sourceMappingURL=cursor-magic.d.ts.map