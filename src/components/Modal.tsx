import { useEffect, useRef } from "react";
import { useModalVisibility } from "../hooks/useModalVisibility";

interface ModalProps {
  filePath: string;
  setModalVisible: (visible: boolean) => void;
}
const IMAGE_PATH_HEADER =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

export default function Modal({ filePath, setModalVisible }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useModalVisibility({ modalRef, setModalVisible });

  return (
    <div className="Modal ImageViewer" ref={modalRef}>
      <div className="content">
        <img src={`${IMAGE_PATH_HEADER}${filePath}`} />
      </div>
    </div>
  );
}
