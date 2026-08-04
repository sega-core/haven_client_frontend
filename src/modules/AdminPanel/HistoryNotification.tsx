import { Typography } from "../../components/Typography";
import { useGetHistoryNotification } from "../../hooks";

export const HistoryNotification = () => {
  const { data, isLoading } = useGetHistoryNotification();

  if (isLoading) {
    return (
      <div className="p-4 text-center text-brown-secondary">Загрузка...</div>
    );
  }

  return (
    <div className="space-y-2">
      {data?.map((item) => (
        <div key={item.id} className="p-3 bg-white-primary rounded-xl">
          <div className="flex items-center justify-end">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                item.status === "sent"
                  ? "bg-green-100 text-green-600"
                  : item.status === "failed"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {item.status === "sent" || item.status === "partial"
                ? "✅"
                : item.status === "failed"
                  ? "❌"
                  : "⏳"}{" "}
              {item.status}
            </span>
          </div>
          <Typography type="body-s" className="text-brown-secondary">
            {item.message}
          </Typography>
          <Typography type="body-xs" className="text-brown-secondary">
            Log: <br></br>
            {item.error}
          </Typography>
          <div className="flex gap-3 mt-2 text-xs text-brown-secondary">
            <span>📨 {item.recipientCount}</span>
            <span>✅ {item.successCount}</span>
            {item.failCount > 0 && <span>❌ {item.failCount}</span>}
            <span>
              📅 {new Date(item.createdAt).toLocaleDateString("ru-RU")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
