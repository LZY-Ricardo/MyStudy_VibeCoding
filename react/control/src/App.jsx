function App() {
  console.log('组件渲染');
  
  function onChange(event) {
    console.log(event.target.value);
    
  }

  return (
    <input type="text" defaultValue={'hello'} onChange={onChange}/>
  )
}
// import { useRef, useEffect } from "react"

// function App() {

//   const inputRef = useRef(null) 
  
//   useEffect(() => {
//     setTimeout(() => {
//       console.log(inputRef.current.value);
      
//     }, 2000)
//   }, [])

//   return (
//     <input type="text" defaultValue={'hello'} ref={inputRef}/>
//   )
// }

export default App
