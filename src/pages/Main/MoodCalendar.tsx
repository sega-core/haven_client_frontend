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
import { MOOD_TAGS_MAP } from "../../modules/Mood/Mood.constants";
import { Typography } from "../../components/Typography";
import { Chip } from "../../components/Chip";
import { BlockAnswer } from "../../components/BlockAnswer";
import { TMood } from "../../api";

interface MoodCalendarProps {
  data: TMood[];
  initialDate?: Date;
}

const MOOD_CONFIG = {
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

export const MoodCalendar = ({
  data,
  initialDate = new Date(),
}: MoodCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const firstDayOfMonth = startDate.getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const calendarDays = [...Array(startOffset).fill(null), ...daysInMonth];

  const getMoodForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return data.find(
      (entry) => format(new Date(entry.createdAt), "yyyy-MM-dd") === dateStr,
    );
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  const selectedDayData = selectedDate
    ? getMoodForDate(selectedDate)
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
                         text-brown-primary hover:bg-beige-primary transition-colors"
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
                         text-brown-primary hover:bg-beige-primary transition-colors"
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

            const mood = getMoodForDate(date);
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

      {/* Модальное окно с деталями дня */}
      <DayDetailsModal
        isOpen={selectedDate !== null}
        onClose={closeModal}
        dayData={selectedDayData}
        date={selectedDate || new Date()}
      />
    </>
  );
};

// Модальное окно для отображения деталей дня
const DayDetailsModal = ({
  isOpen,
  onClose,
  dayData,
  date,
}: {
  isOpen: boolean;
  onClose: () => void;
  dayData?: TMood;
  date: Date;
}) => {
  if (!isOpen) return null;

  const getTagLabel = (tagKey: string) => {
    return MOOD_TAGS_MAP[tagKey]?.label || tagKey;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white-primary rounded-2xl max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-brown-primary">
            {format(date, "d MMMM yyyy", { locale: ru })}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                     text-brown-primary hover:bg-beige-primary transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {dayData ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-col">
              <Typography type="body-md" className="text-brown-primary">
                Мое настроение
              </Typography>
              <div>
                <Chip label={MOOD_CONFIG[dayData.level].label} />
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Typography type="body-md" className="text-brown-primary">
                Мои эмоции и чувства
              </Typography>
              <div className="flex flex-wrap gap-2">
                {dayData.tags.map((item) => {
                  const tag = getTagLabel(item);
                  return <Chip label={tag} />;
                })}
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Typography type="body-md" className="text-brown-primary">
                Мои эмоции и чувства
              </Typography>
              <BlockAnswer comment={dayData.comment} date={dayData.createdAt} />
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-brown-secondary">
            <div className="text-4xl mb-3">📝</div>
            <p>На этот день нет записей</p>
          </div>
        )}
      </div>
    </div>
  );
};
