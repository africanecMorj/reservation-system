'use client';

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];


export default function YearCalendar({ year, month, days}) {
 return (
    <div className="p-4 w-screen h-screen">
            <div
              key={month}
              className="border rounded-xl p-4 shadow-sm w-screen h-screen"
            >
              <h2 className=" text-lg font-semibold mb-2 text-center md:text-2xl md:font-bold">
                {new Date(year, month).toLocaleString('uk-UA', {
                  month: 'long',
                })}
              </h2>

              <div className="grid grid-cols-7 text-center text-sm md:text-xl md:font-semibold md:m-10">
                {weekDays.map((d) => (
                  <div
                    key={d}
                    className="font-medium text-gray-600"
                  >
                    {d}
                  </div>
                ))}

                {days.map((day, i) => (
                  <div
                    key={i}
                    className={`h-8 flex items-center justify-center rounded md:m-3
                      ${day ? 'hover:bg-blue-100 cursor-pointer' : ''}
                    `}
                  >
                    {day}
                  </div>
                ))}
              </div>
            

      </div>
    </div>
  );
}
