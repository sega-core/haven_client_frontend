import { Field, Form } from "react-final-form";
import { Textarea } from "../../components/Input";
import { Block } from "../../components/Block";
import { Button } from "@heroui/button";
import { useSendNotification } from "../../hooks";
import { Typography } from "../../components/Typography";

export const SendNotification = () => {
  const { mutate, isPending } = useSendNotification();

  const onSubmit = async (values: { message: string; testFlag: boolean }) => {
    try {
      const { message, testFlag } = values;

      mutate({ message, recipients: testFlag ? "test" : "all" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form id={"notification"} onSubmit={handleSubmit}>
          <Block disabledTransform>
            <Field name={"testFlag"}>
              {({ input }) => (
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={input.checked}
                    onChange={input.onChange}
                    className="mt-0.5 w-4 h-4 text-cold-green-primary rounded border-beige-tertiary focus:ring-cold-green-primary disabled:opacity-50"
                  />
                  <Typography type="body-s" className="text-brown-primary">
                    Тест
                  </Typography>
                </div>
              )}
            </Field>
            <Field name={"message"}>
              {({ input, meta }) => (
                <Textarea
                  input={input}
                  meta={meta}
                  placeholder="Введите текст уведомления..."
                  maxLength={150}
                />
              )}
            </Field>
            <Button
              radius="full"
              className="bg-beige-primary text-white"
              isLoading={isPending}
              type="submit"
            >
              Отправить
            </Button>
          </Block>
        </form>
      )}
    </Form>
  );
};
