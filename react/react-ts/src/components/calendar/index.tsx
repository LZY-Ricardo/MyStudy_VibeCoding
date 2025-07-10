import './index.scss'
import MonthCalendar from './MonthCalendar'
import { Dayjs } from 'dayjs';
import Header from './header'

export interface CalendarProps {
    value: Dayjs;
}

function Calender(props: CalendarProps) { // {value: Dayjs}

    return (
        <div className='calendar'>
            <Header />
            <MonthCalendar {...props}/>
        </div>
    )
}
export default Calender
