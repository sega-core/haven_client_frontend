import { useCallback, useState } from "react";
import { useDrawerContext } from "../../components/Drawer";
import { MetaCardSheet } from "./MetaCardSheet";

export const MetaCardBanner = () => {
  const { openDrawer, closeDrawer } = useDrawerContext();
  const [isPressed, setIsPressed] = useState(false);

  const handleOpen = useCallback(() => {
    setIsPressed(true);

    setTimeout(() => {
      openDrawer({
        title: "Ваша карта",
        content: <MetaCardSheet onClose={closeDrawer}/>,
      });
      setIsPressed(false);
    }, 180);
  }, [openDrawer]);

  return (
    <div
      onClick={handleOpen}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <div
        className="
          p-5 rounded-3xl cursor-pointer
          transition-all duration-300
        "
        style={{
          transform: isPressed
            ? "scale(0.96) rotateX(6deg)"
            : "scale(1) rotateX(0deg)",

          background: `
            linear-gradient(
              135deg,
              var(--background-color-6-primary),
              var(--background-color-3-primary)
            )
          `,
          border: "1px solid var(--stroke-color-6-secondary)",
          boxShadow: isPressed
            ? "0 4px 12px rgba(0,0,0,0.2)"
            : "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex flex-col gap-2">
            <div
              className="text-xl font-semibold leading-tight"
              style={{ color: "var(--text-white-primary)" }}
            >
              Найди ответы
            </div>

            <div
              className="text-sm max-w-[220px]"
              style={{ color: "var(--text-white-secondary)" }}
            >
              Нажми, чтобы вытянуть образ и увидеть смысл
            </div>
          </div>

          {/* RIGHT — карта */}
          <div
            className="relative w-16 h-24 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300"
            style={{
             /*  transform: isPressed
                ? "rotateY(180deg) scale(0.95)"
                : "rotateY(0deg)",
 */
              background: `
                linear-gradient(
                  135deg,
                  var(--background-color-2-primary),
                  var(--background-color-2-secondary)
                )
              `,
              color: "var(--text-cold-green-primary)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
            }}
          >
            🧿
          </div>
        </div>
      </div>
    </div>
  );
};