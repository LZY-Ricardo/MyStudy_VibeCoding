import Calender from './calender/index.jsx'

// 通过 defaultValue 来传入初始值 date
// 通过 date 之后可以在 onChange 里拿到最新的值 --- 非受控

function App() {
    return <Calender defaultValue={new Date()}
        onChange = {(newDate) => {
            alert(newDate.toLocaleDateString())
        }
    }></Calender>
}
export default App