import { CursorClickEffect } from "./cursor-click-effect";

export class LoggerClickEffect implements CursorClickEffect {
    fireClickEffect(targetDom: string): void {
        console.log(`Click event of ${targetDom} is fired.`)
    }
}
