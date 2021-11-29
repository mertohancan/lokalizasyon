import React, { FC, ChangeEvent } from 'react';
import './TextArea.scss';

interface TextAreaProps {
    value: string;
    onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;
    disabled?: boolean;
    placeholder?: string;
  }

const TextArea: FC<TextAreaProps> = ({
  value, onChange, disabled = false, placeholder,
}) => (
  <div className="text-area-container">
    <textarea disabled={disabled} value={value} onChange={onChange} placeholder={placeholder} className="text-area" />
  </div>
);

export default TextArea;
