import { useEffect, useRef } from "react";

function App() {
    const ipt = useRef(null)

    useEffect(() => {
        console.log(ipt.current);
        
        ipt.current.focus()
    }, [])
    
    return (
        <div>
            <input type="text" ref={ipt} />
        </div>
    )
}
export default App
