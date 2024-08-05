import React from 'react';
import { Button } from 'primereact/button';

interface ToggleButtonProps {
  label: string;
  isToggled: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, isToggled, onClick, disabled }) => {
  return (
    <Button
      label={label}
      rounded
      onClick={onClick}
      disabled={disabled}
      className={`
        border-2 border-[#FFBF09] font-bold transition-colors duration-300 shadow-none
        ${isToggled ? 'bg-[#FFBF09] text-black hover:bg-[#E6AC00]' : 'bg-transparent text-black hover:bg-[#FFF5D6]'}
        ${disabled && !isToggled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    />
  );
};

export default ToggleButton;
