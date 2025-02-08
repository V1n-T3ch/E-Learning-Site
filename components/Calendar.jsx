import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ events }) => {
  const [value, setValue] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find((e) => e.date.toDateString() === date.toDateString());
      return event ? <p className="text-xs text-red-500">{event.event}</p> : null;
    }
  };

  return (
    <div className="p-4">
      <Calendar
        className="border items-center border-gray-200 rounded-lg text-black"
        onChange={setValue}
        value={value}
        tileContent={tileContent}
      />
    </div>
  );
};

export default MyCalendar;