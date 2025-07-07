import { useState } from "react"

function App() {
    const [value, setValue] = useState('hello')
    console.log('组件渲染');
    
    function onChange(event) {
        console.log(event.target.value);
        setValue(event.target.value.toUpperCase())
    }
    
    return (
        <input type="text" value={value} onChange={onChange}/>
    )
}

export default App