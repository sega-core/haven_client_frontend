import { Button } from "@heroui/button";
import { Typography } from "../../../components/Typography";
import { useCreateAnswer } from "../../../hooks";
import {
  TDailyQuestionForm,
  EDailyQuestionField,
} from "../form/FormDailyQuestion.types";
import { InputText } from "../field/InputText";
import { FormDailyQuestion } from "../form/FormDailyQuestion";
import { INITIAL_FORM } from "../form/FormDailyQuestion.constant";
import { BlockAnswer } from "../../../components/BlockAnswer";
import { TDailyQuestion } from "../../../api";

export const DailyQuestionSheet = ({
  onClose,
  question,
}: {
  onClose: () => void;
  question?: TDailyQuestion;
}) => {
  const { mutateAsync, isPending } = useCreateAnswer();

  const onSubmit = async (values: TDailyQuestionForm) => {
    try {
      await mutateAsync(values[EDailyQuestionField.ANSWER]);
    } catch (error) {
      alert(error);
    } finally {
      onClose();
    }
  };

  const isCompleted = question?.userAnswer;

  return (
    <FormDailyQuestion onSubmit={onSubmit} initialValue={INITIAL_FORM}>
      <div className="grid gap-4 bg-white-primary">
        <Typography type="body-s" className="text-brown-primary text-center">
          {question?.question}
        </Typography>
        {!isCompleted && <InputText />}
        {isCompleted && (
          <BlockAnswer
            comment={question.userAnswer}
            date={question.createdAt}
          />
        )}
        {!isCompleted && (
          <Button
            radius="full"
            className="bg-beige-primary text-white"
            isLoading={isPending}
            type="submit"
          >
            Сохранить
          </Button>
        )}
      </div>
    </FormDailyQuestion>
  );
};
