import { useLocation } from "react-router-dom";
import { ErrorComponent } from "../../components/ErrorComponent";

export const ErrorPage = () => {
  const location = useLocation();

  const error = location?.state?.error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="max-w-lg w-full">
        <ErrorComponent error={error} />
      </div>
    </div>
  );
};
