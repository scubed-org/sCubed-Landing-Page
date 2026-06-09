'use client';

import React, { FC, useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';

type Props = {
  buttonText?: string;
  className?: string;
  url?: string; // Optional override for the Calendly scheduling link
};

const CalendlyButton: FC<Props> = ({
  buttonText = 'BOOK A DEMO',
  className,
  url,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCalendlyLoaded(true);
  };

  const calendlyUrl = url ?? process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!calendlyUrl) {
    console.warn('Calendly URL is not set in environment variables');
  }

  const getRootElement = () => {
    if (typeof document !== 'undefined') {
      return document.body;
    }
    return null;
  };

  return (
    <>
      <button className={className} onClick={handleOpenModal}>
        {buttonText}
      </button>

      {isClient && calendlyLoaded && (
        <PopupModal
          url={calendlyUrl!}
          rootElement={getRootElement() as HTMLElement}
          onModalClose={() => setIsModalOpen(false)}
          open={isModalOpen}
          prefill={{}}
        />
      )}
    </>
  );
};

export default CalendlyButton;
