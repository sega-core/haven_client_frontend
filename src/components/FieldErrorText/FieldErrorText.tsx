export const FieldErrorText = ({
  isError,
  message,
}: {
  isError: boolean;
  message: string;
}) => {
  if (isError)
    return (
      <div
        data-slot="error-message"
        className="text-tiny text-danger"
        id="react-aria3070100192-:ro:"
      >
        {message}
      </div>
    );
};
