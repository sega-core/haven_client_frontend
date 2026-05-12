// DayDetailsModal.tsx
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Typography } from "../../components/Typography";
import { Chip } from "../../components/Chip";
import { BlockAnswer } from "../../components/BlockAnswer";
import { TDailyQuestion, TGratitude, TMetaCard, TMood } from "../../api";
import { MOOD_TAGS_MAP } from "../Mood/Mood.constants";
import { MOOD_CONFIG } from "./Calendar";
import { Modal } from "../../components/Modal";

const EmptyState = () => (
  <div className="text-center py-8 text-brown-secondary">
    <div className="text-4xl mb-3">📝</div>
    <p>На этот день нет записей</p>
  </div>
);

interface DayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayData?: {
    mood?: TMood;
    gratitude?: TGratitude[];
    dailyQuestion?: TDailyQuestion;
    metaCard?: TMetaCard;
  };
  date: Date;
}

export const DayDetailsModal = ({
  isOpen,
  onClose,
  dayData,
  date,
}: DayDetailsModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) setCurrentIndex(0);
  }, [isOpen]);

  const getTagLabel = (tagKey: string) => {
    return MOOD_TAGS_MAP[tagKey]?.label || tagKey;
  };

  const slides = [
    {
      id: "mood",
      title: "Как ваше настроение сегодня?",
      content: (
        <>
          {dayData?.mood ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 flex-col">
                <Typography type="body-md" className="text-brown-primary">
                  Моё настроение
                </Typography>
                <div>
                  <Chip label={MOOD_CONFIG[dayData?.mood?.level].label} />
                </div>
              </div>
              {!!dayData?.mood.tags.length && (
                <div className="flex gap-2 flex-col">
                  <Typography type="body-md" className="text-brown-primary">
                    Мои эмоции и чувства
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {dayData?.mood?.tags.map((item, index) => {
                      const tag = getTagLabel(item);
                      return <Chip label={tag} key={index} />;
                    })}
                  </div>
                </div>
              )}
              {dayData?.mood.comment && (
                <div className="flex gap-2 flex-col">
                  <Typography type="body-md" className="text-brown-primary">
                    Комментарий
                  </Typography>
                  <BlockAnswer
                    comment={dayData?.mood?.comment}
                    date={dayData?.mood.createdAt}
                  />
                </div>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      ),
    },
    {
      id: "gratitude",
      title: "Благодарность",
      content: (
        <>
          {dayData?.gratitude?.length ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 flex-col">
                {dayData?.gratitude.map((item, index) => (
                  <BlockAnswer
                    key={index}
                    comment={item.comment}
                    date={item.createdAt}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      ),
    },
    {
      id: "question",
      title: "Вопрос дня",
      content: (
        <>
          {dayData?.dailyQuestion ? (
            <div className="flex flex-col gap-4">
              <Typography type="body-md" className="text-brown-primary">
                {dayData.dailyQuestion?.question}
              </Typography>
              <div className="flex gap-2 flex-col">
                <BlockAnswer
                  comment={dayData?.dailyQuestion.userAnswer}
                  date={dayData?.dailyQuestion.createdAt}
                />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      ),
    },
    {
      id: "metaCard",
      title: "Метафорическая карта",
      content: (
        <>
          {dayData?.metaCard?.answer.seen ? (
            <div className="flex flex-col gap-4">
              <Typography type="body-md" className="text-brown-primary">
                {dayData.metaCard?.metaCard.title}
              </Typography>
              <img
                src={dayData?.metaCard.metaCard.imgUrl}
                className={`
                    w-full h-full object-cover transition-all duration-700 ease-out rounded-2xl overflow-hidden max-h-3/5
                  `}
                loading="lazy"
              />
              <div className="flex gap-2 flex-col">
                <Typography type="body-md" className="text-brown-primary mb-2">
                  Что я увидел
                </Typography>
                <BlockAnswer
                  comment={dayData?.metaCard.answer.seen}
                  date={dayData?.metaCard.createdAt}
                />
                <Typography type="body-md" className="text-brown-primary mb-2">
                  Что я почувствовал
                </Typography>
                <BlockAnswer
                  comment={dayData?.metaCard.answer.felt || ""}
                  date={dayData?.metaCard.createdAt}
                />
                <Typography type="body-md" className="text-brown-primary mb-2">
                  Что я понял
                </Typography>
                <BlockAnswer
                  comment={dayData?.metaCard.answer.understood || ""}
                  date={dayData?.metaCard.createdAt}
                />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="grid gap-3"
      >
        <div className="flex items-center justify-between">
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

        <Typography className="text-brown-primary" type="body-lg">
          {slides[currentIndex].title}
        </Typography>

        <div className="min-h-[300px] transition-all duration-300">
          {slides[currentIndex].content}
        </div>

        <div className="flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`
                transition-all rounded-full
                ${
                  currentIndex === idx
                    ? "w-6 h-2 bg-brown-primary"
                    : "w-2 h-2 bg-beige-primary"
                }
              `}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
