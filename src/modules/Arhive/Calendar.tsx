import {
  eachDayOfInterval,
  format,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { useGetProgressRange } from "../../hooks";
import { DayDetailsModal } from "./DayDetailsModal";

export const MOOD_CONFIG = {
  1: {
    emoji: "😞",
    bgColor: "rgba(82, 47, 41, 0.25)",
    label: "Ужасно",
  },
  2: {
    emoji: "😐",
    bgColor: "rgba(26, 32, 22, 0.25)",
    label: "Плохо",
  },
  3: {
    emoji: "🙂",
    bgColor: "rgba(92, 107, 68, 0.25)",
    label: "Норм",
  },
  4: {
    emoji: "😊",
    bgColor: "rgba(202, 181, 143, 0.3)",
    label: "Хорошо",
  },
  5: {
    emoji: "😁",
    bgColor: "rgba(208, 207, 140, 0.35)",
    label: "Супер",
  },
};
const initialDate = new Date();

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const { data } = useGetProgressRange({
    startDate: format(startOfMonth(currentDate), "yyyy-MM-dd"),
    endDate: format(endOfMonth(currentDate), "yyyy-MM-dd"),
  });

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const firstDayOfMonth = startDate.getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const calendarDays = [...Array(startOffset).fill(null), ...daysInMonth];

  const getDataForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return {
      mood: data?.mood?.find(
        (entry) => format(new Date(entry.createdAt), "yyyy-MM-dd") === dateStr,
      ),
      gratitude: data?.gratitude.filter(
        (entry) => format(new Date(entry.createdAt), "yyyy-MM-dd") === dateStr,
      ),
      dailyQuestion: data?.dailyQuestion.find(
        (entry) => format(new Date(entry.createdAt), "yyyy-MM-dd") === dateStr,
      ),
    };
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  const selectedDayData = selectedDate
    ? getDataForDate(selectedDate)
    : undefined;

  return (
    <>
      <div className="bg-white-primary rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-brown-primary font-medium">
            {format(currentDate, "LLLL yyyy", { locale: ru })}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button
                onClick={goToPreviousMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                         text-brown-primary transition-colors"
                aria-label="Предыдущий месяц"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNextMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                         text-brown-primary transition-colors"
                aria-label="Следующий месяц"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <div
              key={day}
              className="text-center text-xs text-brown-secondary py-1"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="aspect-square rounded-lg bg-transparent"
                />
              );
            }

            const mood = getDataForDate(date).mood;
            const dayNumber = format(date, "d");
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isToday =
              format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

            return (
              <div
                key={date.toISOString()}
                onClick={() => handleDayClick(date)}
                style={{
                  backgroundColor: mood
                    ? MOOD_CONFIG[mood.level].bgColor
                    : undefined,
                }}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center
                  transition-all active:scale-95 cursor-pointer hover:ring-1 hover:ring-gray-400
                  ${!mood && "bg-gray-100"}
                  ${isToday ? "ring-1 ring-gray-400" : ""}
                  ${!isCurrentMonth ? "opacity-50" : ""}
                `}
              >
                <span
                  className={`text-xs font-medium ${mood ? "text-brown-primary" : "text-gray-400"}`}
                >
                  {dayNumber}
                </span>
                {mood && (
                  <span className="text-sm leading-none mt-0.5">
                    {MOOD_CONFIG[mood.level].emoji}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex gap-3 justify-center">
          {[1, 2, 3, 4, 5].map((level) => {
            const config = MOOD_CONFIG[level as keyof typeof MOOD_CONFIG];
            return (
              <div key={level} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.bgColor }}
                />
                <span className="text-xs text-brown-secondary truncate flex items-center gap-0.5">
                  <span>{config.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <DayDetailsModal
        isOpen={selectedDate !== null}
        onClose={closeModal}
        dayData={selectedDayData}
        date={selectedDate || new Date()}
      />
    </>
  );
};