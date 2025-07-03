import { createContext, useContext } from "react";


function Child2() {
    const count = useContext(numContext)
    return (
        <div>
            <h3>我是孙子组件 -- {count}</h3>
        </div>
    )
}

function Child1() {
    const num = useContext(numContext)
    return(
        <div>
            <h2>我是子组件 -- {num}</h2>
            <Child2 />
        </div>
    )
}

const numContext = createContext()
function App() {
    const num = 100
    return (
        <div>
            <numContext.Provider value={num}>
                <h1>我是父组件</h1>
                <Child1 />
            </numContext.Provider>
        </div>
    )
}

export default App
