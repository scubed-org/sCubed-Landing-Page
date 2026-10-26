'use client';

import React, { FC, useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';
import { useRouter } from 'next/navigation';

import Button from '../Button/button';

import { container, buttonStyle } from './styles.css';

type Props = {
  buttonColor: string;
  buttonBackground: string;
  buttonWidth?: string;
  buttonText?: string;
  navigateTo?: string;
  border?: string;
};

const CalendlyWidget: FC<Props> = ({
  buttonColor,
  buttonBackground,
  buttonWidth,
  buttonText,
  navigateTo,
  border,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenModal = () => {
    if (navigateTo) {
      router.push(navigateTo);
    } else {
      setIsModalOpen(true);
      setCalendlyLoaded(true);
    }
  };

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

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
    <div className={container}>
      <Button
        className={buttonStyle}
        color={buttonColor}
        backgroundColor={buttonBackground}
        width={buttonWidth ?? '180px'}
        border={border}
        onClick={handleOpenModal}
      >
        {buttonText || 'BOOK A DEMO'}
      </Button>

      {isClient && calendlyLoaded && (
        <PopupModal
          url={calendlyUrl!}
          rootElement={getRootElement() as HTMLElement}
          onModalClose={() => setIsModalOpen(false)}
          open={isModalOpen}
          prefill={{}}
        />
      )}
    </div>
  );
};

export default CalendlyWidget;
