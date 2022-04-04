import React, { useState, useEffect, FC } from 'react';
import TextArea from '../text-area/TextArea';
import { useDebounce, useTranslate } from '../../hooks/hooks';
import './Translate.scss';

import { LANGUAGE_EN, LANGUAGE_TR } from '../../constants';

import {
  ChangeIcon, MicrophoneIcon, StopIcon, SaveIcon, SavedIcon, SaveEmptyIcon,
} from '../../assets/icons';
import { SavedItems } from '../../context/types';


//@ts-ignore
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;

interface ILanguages {
  code: string;
  title: string;
}

interface TranslateProps {
  onHistoryClick: () => void;
  onSave: (search: SavedItems) => void;
}

const Translate: FC<TranslateProps> = ({ onHistoryClick, onSave }) => {
  const d = new Date();
  const [sourceLanguage, setSourceLanguage] = useState<ILanguages>(LANGUAGE_EN);
  const [sourceText, setSourceText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const debouncedSourceText = useDebounce(sourceText);

  const isSourceTurkish = sourceLanguage.code === 'tr';
  mic.lang = isSourceTurkish ? LANGUAGE_TR.code : LANGUAGE_EN.code;

  const { translatedText } = useTranslate(debouncedSourceText, isSourceTurkish ? LANGUAGE_TR.code : LANGUAGE_EN.code, isSourceTurkish ? LANGUAGE_EN.code : LANGUAGE_TR.code);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        setIsListening(true);
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        setIsListening(false);
      };
    }
    mic.onstart = () => {
      setIsListening(true);
    };

    mic.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        //@ts-ignore
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setSourceText(transcript);

      mic.onerror = () => {
        mic.stop();
        setIsListening(false);
        /*  TODO (mert.ohancan) should be handled with error boundary */
      };
    };
  };

  useEffect(() => {
    handleListen();
  }, [isListening]);

  useEffect(() => {
    isSaved && setIsSaved(false);
  }, [debouncedSourceText]);

  const toggleSpeechToText = (): void => setIsListening((state) => !state);

  const handleChangeSourceLanguage = (): void => {
    setSourceLanguage(isSourceTurkish ? LANGUAGE_EN : LANGUAGE_TR);
    setSourceText(translatedText);
  };

  const handleSave = () => {
    setIsSaved(true);
    onSave({
      date: d.toLocaleString(),
      source: {
        code: sourceLanguage.code.toUpperCase(),
        text: sourceText,
      },
      target: {
        code: isSourceTurkish ? LANGUAGE_EN.code.toUpperCase() : LANGUAGE_TR.code.toUpperCase(),
        text: translatedText,
      },
    });
  };

  return (
    <div className="translate-container">
      <div className="translate-information">
        <span className="typed-out">Hello astronaut, I hope all is well. You can translate into Turkish from the inputs below.</span>
      </div>
      <div className="separator" />
      <header className="translate-header">
        <span className="bold source">{sourceLanguage.title}</span>
        <button type="button" onClick={handleChangeSourceLanguage} className="simple-button">
          <img width={16} height={16} alt="change" src={ChangeIcon} />
        </button>
        <span className="bold source">{isSourceTurkish ? LANGUAGE_EN.title : LANGUAGE_TR.title}</span>
      </header>

      <div className="text-area-contents">
        <div className="text-area-wrapper">
          <TextArea value={sourceText} placeholder={isSourceTurkish ? "Merhaba Dünya" : "Hello World"} onChange={({ target }) => setSourceText(target.value)} />
          <button type="button" className="simple-button voice-actions" onClick={toggleSpeechToText}>
            <img width={32} height={32} alt="voice actions" src={isListening ? StopIcon : MicrophoneIcon} />
          </button>
        </div>
        <div className="text-area-wrapper">
          <TextArea placeholder={isSourceTurkish ? "Hello World" : "Merhaba Dünya"} value={translatedText} disabled />
          {debouncedSourceText && translatedText ? (
            <button disabled={isSaved} type="button" className="simple-button voice-actions" onClick={handleSave}>
              <img width={28} height={28} alt="save" src={isSaved ? SaveIcon : SaveEmptyIcon} />
            </button>
          ) : null}
        </div>
      </div>
      <div className="translate-footer">
        {onHistoryClick ? (
          <button type="button" className="simple-button translate-history-icon" onClick={onHistoryClick}>
            <img width={32} height={32} alt="change" src={SavedIcon} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Translate;
