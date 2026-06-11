import { X } from 'lucide-react';
import React from 'react';

import {
  closeButton,
  modalContent,
  modalOverlay,
  modalWrapper,
  videoContainer,
  videoFrame,
} from './style.css';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
}) => {
  if (!isOpen) return null;

  const getYouTubeEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={modalOverlay} onClick={handleOverlayClick}>
      <div className={modalWrapper}>
        <button
          className={closeButton}
          onClick={onClose}
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        <div className={modalContent}>
          <div className={videoContainer}>
            <iframe
              className={videoFrame}
              src={getYouTubeEmbedUrl(videoUrl)}
              title="S Cubed Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
