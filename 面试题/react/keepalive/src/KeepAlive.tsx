import { createContext, useContext } from "react"
import { useLocation, useOutlet, matchPath } from "react-router-dom"

interface KeepAliveProps {
    keepPath: string[]
    children: React.ReactNode
}
const keepElements: Record<string, React.ReactNode> = {}

// 用来缓存组件的对象
const KeepAliveContext = createContext({ // useContext 可以识别的对象
    keepPath: [] as string[],
    keepElements,
    dropByPath(path: string) {
        keepElements[path] = null
    }
})

const isKeepPath = (keepPath: string[], path: string) => {
    return keepPath.includes(path)
}

export function useKeepOutlet() {
    const location = useLocation()
    const element = useOutlet() // 拿到在二级路由出口展示的组件 VDOM 树
    // console.log(element);
    const { keepPath, keepElements } = useContext(KeepAliveContext)
    const isKeep = isKeepPath(keepPath, location.pathname) // 当前展示的组件是否要缓存
    if (isKeep) {
        keepElements[location.pathname] = element
    }
    return <>
        {
            Object.entries(keepElements).map(([pathname, element]) => {
                return (
                    <div
                        key={pathname}
                        className="keep-alive-page"
                        style={{ overflow: "hidden" }}
                        hidden={!matchPath(location.pathname, pathname)}
                    >
                        {element}
                    </div>
                )
            })
        }
        {
            !isKeep && element
        }
    </>
}

export default function KeepAlive(props: KeepAliveProps) {
    const { keepPath, children } = props
    const { keepElements, dropByPath } = useContext(KeepAliveContext)
    return (
        <KeepAliveContext.Provider value={{ keepPath, keepElements, dropByPath }}>
            {children}
        </KeepAliveContext.Provider>
    )
}
