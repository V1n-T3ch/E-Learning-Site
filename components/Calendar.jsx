"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/getTests");
        if (response.data.success) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const matchedEvents = events.filter((e) => {
        const startEventDate = e.startDate ? new Date(e.startDate).toDateString() : null;
        const endEventDate = e.endDate ? new Date(e.endDate).toDateString() : null;
        return startEventDate === date.toDateString() || endEventDate === date.toDateString();
      });

      return matchedEvents.length > 0 ? (
        <div className="text-xs text-red-500">
          {matchedEvents.map((event, index) => {
            if (new Date(event.startDate).toDateString() === date.toDateString()) {
              return <p key={`start-${index}`} className="text-green-500">{event.startTitle}</p>;
            }
            if (new Date(event.endDate).toDateString() === date.toDateString()) {
              return <p key={`end-${index}`} className="text-red-500">{event.endTitle}</p>;
            }
            return null;
          })}
        </div>
      ) : null;
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
