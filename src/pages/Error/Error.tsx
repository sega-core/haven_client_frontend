import { useLocation } from "react-router";
import { ErrorComponent } from "../../components/ErrorComponent";

export const ErrorPage = () => {
  const location = useLocation();

  const error = location?.state?.error;

  return (
    <div className="grid gap-4 w-full">
      <ErrorComponent error={error} />
    </div>
  );
};
