"use client"

import YearCalendar from '@/components/YearCalendar';
import {useState} from 'react'

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array(startDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return days;
}


export default function page() {
  const [year, setYear] = useState(new Date().getFullYear())
  return (
    <div className='w-full h-screen'>
     <h1 className="text-2xl font-bold mb-6 mt-6 text-center">
        Календар на {year}
      </h1>

      <div
        className='flex flex-col'
      >
        {Array.from({ length: 12 }).map((_, month) => {
        const days = getMonthDays(year, month);
        return(
        <YearCalendar year={year} month={month} days={days}/>
        )
      })}
      </div>
      
    </div>
  )
}
