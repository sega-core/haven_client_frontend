import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  openLink, /* miniApp */
} from "@tma.js/sdk-react";
import { Typography } from '../../components/Typography';
import { Block } from '../../components/Block';

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.url;

  useEffect(() => {
    if (url) {
      openLink(url);
      setTimeout(() => {
        /* miniApp.close(); */
      }, 100);
    }
  }, [url, navigate]);

  return (
    <Block className="flex items-center justify-center h-screen" disabledTranform>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6875a] mx-auto mb-4"></div>
        <Typography type='body-md' className='text-brown-primary'>Перенаправление на страницу оплаты...</Typography>
        <Typography type='body-s' className="text-brown-secondary">Пожалуйста, подождите</Typography>
      </div>
    </Block>
  );
};