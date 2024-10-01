import { CursorStyle } from "../cursor-core"

export type ClickedEffectStyle = Partial<CursorStyle>

export interface CursorClickEffect {
    fireClickEffect(targetDom: string): void
}
