/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { GOOGLE_API_KEY } from '../constants';

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useTranslate = (sourceText: string, targetCode: string) => {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    if (!sourceText) return;

    const fetchData = async () => {
      const translation = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
        qs.stringify({
          q: sourceText,
          target: targetCode,
        }),
      );
      setTranslatedText(translation.data.data.translations[0].translatedText);
    };

    fetchData();
  }, [sourceText]);

  return { translatedText };
};
