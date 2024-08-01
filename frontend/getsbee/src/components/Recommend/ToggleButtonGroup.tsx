import React, { useState, useEffect, useCallback } from 'react';
import ToggleButton from './ToggleButton';

interface ToggleButtonGroupProps {
  buttons: string[];
  maxSelection: number;
  onSelectionChange: (selection: string[]) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({ buttons, maxSelection = 5, onSelectionChange }) => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const handleSelectionChange = useCallback(() => {
    onSelectionChange(selectedButtons);
  }, [selectedButtons, onSelectionChange]);

  useEffect(() => {
    handleSelectionChange();
  }, [handleSelectionChange]);

  const handleToggle = (label: string) => {
    setSelectedButtons((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }
      if (prev.length < maxSelection) {
        return [...prev, label];
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {buttons.map((label) => (
        <ToggleButton
          key={label}
          label={label}
          isToggled={selectedButtons.includes(label)}
          onClick={() => handleToggle(label)}
          disabled={selectedButtons.length >= maxSelection && !selectedButtons.includes(label)}
        />
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
