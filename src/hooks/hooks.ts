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

export const useTranslate = (sourceText: string, sourceCode: string, targetCode: string) => {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    if (!sourceText) return;

    const fetchData = async () => {
      const translation = await axios.post(
        `https://libretranslate.de/translate`,
        qs.stringify({
          q: sourceText,
          source: "en",
          target: targetCode,
          format: "text"
        }),
      );
      //@ts-ignore
      setTranslatedText(translation.data.translatedText);

    };

    fetchData();
  }, [sourceText]);

  return { translatedText };
};
