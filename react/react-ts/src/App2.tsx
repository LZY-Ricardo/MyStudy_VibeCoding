import Calender from './components/calendar/index.tsx'
import dayjs from 'dayjs'

function App() {
    return (
        <div>
            <Calender value={dayjs('2024-11-08')}/>
        </div>
    )
}
export default App
