import { useEffect } from "react";
interface IModal {
  modalRef: React.RefObject<HTMLDivElement>;
  setModalVisible: (visible: boolean) => void;
}

export function useModalVisibility({ modalRef, setModalVisible }: IModal) {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      event.target instanceof HTMLElement &&
      event.target.tagName !== "IMG"
    ) {
      setModalVisible(false);
    }
  };

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
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
}
