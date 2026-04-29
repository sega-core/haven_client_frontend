import { Button } from "@heroui/button";
import { InputText } from "../field/InputText";
import { EMetaCardField, TMetaCardForm } from "../form/FormMetaCard.types";
import { FormMetaCard } from "../form/FormMetaCard";
import {
  useCreateMetaCardAnswer,
  useGetMetaCard,
} from "../../../hooks/useMetaCard";
import { useState, useLayoutEffect } from "react";
import { SkeletonComponent } from "../../../components/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "../../../components/Typography";
import { format, startOfDay } from "date-fns";
import { Hint } from "../../../components/Hint";

const GENERATION_KEY = "meta_card_generation_date";

export const MetaCardSheet = () => {
  const { mutateAsync, isPending } = useCreateMetaCardAnswer();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  const { data } = useGetMetaCard();

  useLayoutEffect(() => {
    const today = format(startOfDay(new Date()), "yyyy-MM-dd");

    const lastGenerationDate = localStorage.getItem(GENERATION_KEY);

    if (lastGenerationDate === today) {
      setIsGenerating(false);
    } else {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        localStorage.setItem(GENERATION_KEY, today);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (values: TMetaCardForm) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  const readOnly = data?.hasAnsweredToday;

  const initialFormValue: TMetaCardForm = {
    [EMetaCardField.SEEN]: data?.answer.seen || "",
    [EMetaCardField.FELT]: data?.answer.felt || "",
    [EMetaCardField.UNDERSTOOD]: data?.answer.understood || "",
  };

  return (
    <AnimatePresence mode="wait">
      {isGenerating ? (
        <motion.div
          key="generating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center min-h-[626px] gap-6 bg-white-primary rounded-2xl"
        >
          <motion.div
            animate={{
              /*               rotate: 360,
               */ scale: [1, 1.1, 1],
            }}
            transition={{
              /*               rotate: { duration: 2, repeat: Infinity, ease: "linear" },
               */ scale: { duration: 1, repeat: Infinity },
            }}
          >
            <svg
              className="w-16 h-16 text-beige-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </motion.div>

          <div className="text-center">
            <motion.p
              className="text-lg font-medium text-beige-primary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Генерируем вашу мета-карту
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <FormMetaCard onSubmit={onSubmit} initialValue={initialFormValue}>
            <div className="grid gap-4 bg-white-primary">
              <div className="rounded-2xl overflow-hidden relative min-h-[626px] bg-gray-100">
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0">
                    <SkeletonComponent className="w-full h-full rounded-2xl!" />
                  </div>
                )}

                {imageError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">
                      Не удалось загрузить изображение
                    </span>
                  </div>
                )}

                <img
                  src={data?.metaCard.imgUrl}
                  alt={data?.metaCard.title}
                  className={`
                    w-full h-full object-cover transition-all duration-700 ease-out
                    ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                  `}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
              <Typography
                type="body-s"
                className="text-center text-brown-primary"
              >
                {data?.metaCard.title}
              </Typography>
              <div className="flex justify-end items-center gap-1">
                {data?.metaCard.description && (
                  <Hint text={data?.metaCard.description} />
                )}
                {/* <Typography type="body-xs" className="text-beige-primary">
                  Помощь
                </Typography> */}
              </div>
              <InputText field={EMetaCardField.SEEN} readOnly={readOnly} />
              <InputText field={EMetaCardField.FELT} readOnly={readOnly} />
              <InputText
                field={EMetaCardField.UNDERSTOOD}
                readOnly={readOnly}
              />

              {!readOnly && (
                <Button
                  radius="full"
                  className="bg-beige-primary text-white"
                  type="submit"
                  isLoading={isPending}
                >
                  Сохранить
                </Button>
              )}
            </div>
          </FormMetaCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
