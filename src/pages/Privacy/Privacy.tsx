import { useEffect, useRef } from "react";
import privacyHtml from "../../assets/doc/privacy.html?raw";

export const Privacy = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Создаем Shadow DOM
      const shadow = containerRef.current.attachShadow({ mode: "open" });
      shadow.innerHTML = privacyHtml;

      // Очистка при размонтировании
      return () => {
        shadow.innerHTML = "";
      };
    }
  }, [privacyHtml]);

  return (
    <div className="grid gap-4 w-full">
      <div ref={containerRef} />
    </div>
  );
};
