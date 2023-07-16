import React, { useEffect, useRef } from "react";

interface ModalProps {
  filePath: string;
  setModalVisible: (visible: boolean) => void;
}
const IMAGE_PATH_HEADER =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

export default function Modal({ filePath, setModalVisible }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && (event.target as HTMLElement).tagName !== "IMG") {
      setModalVisible(false);
    }
  };
  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setModalVisible(false);
    }
  };

  const handleClickImage = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Modal ImageViewer" ref={modalRef}>
      <div className="content">
        <img
          src={`${IMAGE_PATH_HEADER}${filePath}`}
          onClick={handleClickImage}
        />
      </div>
    </div>
  );
}
