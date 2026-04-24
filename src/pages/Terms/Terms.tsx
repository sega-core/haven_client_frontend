import { useEffect, useRef } from "react";
import termsHtml from "../../assets/doc/terms.html?raw";

export const Terms = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Создаем Shadow DOM
      const shadow = containerRef.current.attachShadow({ mode: "open" });
      shadow.innerHTML = termsHtml;

      // Очистка при размонтировании
      return () => {
        shadow.innerHTML = "";
      };
    }
  }, [termsHtml]);

  return (
    <div className="grid gap-4 w-full">
      <div ref={containerRef} />
    </div>
  );
};
