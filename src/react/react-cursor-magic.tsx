import { useEffect } from "react"
import { createCursorMagic } from "../core/cursor-magic"
import { CursorCoreOptions } from "../core/cursor-core"

const ReactCursorMagic = (props?: CursorCoreOptions) => {
    useEffect(() => {
        createCursorMagic(props)
    }, [])

    return <></>
}

export default ReactCursorMagic
