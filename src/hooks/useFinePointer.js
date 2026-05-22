import { useEffect, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

export function useFinePointer() {
  const [finePointer, setFinePointer] = useState(
    typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const handler = (event) => setFinePointer(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return finePointer;
}
