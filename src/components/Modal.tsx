import React, { useEffect, useRef } from "react";

interface ModalProps {
  filePath: string;
  setModalVisible: (visible: boolean) => void;
}

export default function Modal({ filePath, setModalVisible }: ModalProps) {
  const IMAGE_PATH_HEADER =
    "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && (e.target as HTMLElement).tagName !== "IMG") {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalVisible(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickImage = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };

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
