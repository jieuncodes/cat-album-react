import { useEffect } from "react";

export const useModalHandlers = (
  setModalVisible: (visible: boolean) => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as HTMLElement).tagName !== "IMG") {
      setModalVisible(false);
    }
  };

  const ESC_KEY = "Escape";
  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === ESC_KEY) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};
