import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import ToggleButtonGroup from './ToggleButtonGroup';

interface UserInfoFormProps {
  onClose: () => void;
  onSave: (data: { birthYear: number | null; interests: string[] }) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onClose, onSave }) => {
  const currentYear = new Date().getFullYear();
  const birthYearOptions = Array.from({ length: 100 }, (_, i) => ({
    label: `${currentYear - i}`,
    value: currentYear - i,
  }));

  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const buttonLabels = [
    'Politics',
    'Social',
    'Culture',
    'Economy',
    'IT',
    'World',
    'Sports',
    'Entertain',
    'Health',
    'Travel',
    'Education',
    'Living',
    'Beauty',
    'Fashion',
    'Science',
  ];

  const handleSave = () => {
    onSave({ birthYear, interests: selectedInterests });
    onClose();
  };

  const handleInterestChange = (selection: string[]) => {
    setSelectedInterests(selection);
  };

  return (
    <Card className="p-8 bg-white rounded-lg shadow-lg mx-auto w-[600px]">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center space-x-6">
          <p className="text-lg font-medium whitespace-nowrap">출생년도</p>
          <Dropdown
            id="birthYear"
            value={birthYear}
            options={birthYearOptions}
            onChange={(e: DropdownChangeEvent) => setBirthYear(e.value)}
            placeholder="출생년도를 선택하세요"
            className="flex-grow focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 hover:border-gray-300 transition-colors duration-200 select-none"
          />
        </div>
        <p className="text-lg font-medium whitespace-nowrap">관심분야(최대 5개)</p>
        <div className="p-4">
          <ToggleButtonGroup buttons={buttonLabels} maxSelection={5} onSelectionChange={handleInterestChange} />
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <Button label="닫기" severity="secondary" outlined onClick={onClose} />
          <Button
            label="저장 후 맞춤 추천받기"
            className="bg-[#FFBF09] border-2 border-[#FFBF09] shadow-none hover:bg-[#E5AB08]"
            onClick={handleSave}
          />
        </div>
      </form>
    </Card>
  );
};

export default UserInfoForm;
