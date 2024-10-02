import { useEffect } from "react"
import { ClientCursorMagicOptions, createCursorMagic } from "../core/cursor-magic"

const ReactCursorMagic = (props?: ClientCursorMagicOptions) => {
    useEffect(() => {
        createCursorMagic(props)
    }, [])

    return <></>
}

export default ReactCursorMagic
