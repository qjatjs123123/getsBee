import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import ToggleButtonGroup from './ToggleButtonGroup';
import { patchUserInfo } from '../../api/UserInfoAPI';

interface UserInfoFormProps {
  onClose: () => void;
  onSave: (data: { birthYear: number | null; category: string[] }) => void;
}

interface InterestLabel {
  label: string;
  value: string;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onClose, onSave }) => {
  const currentYear = new Date().getFullYear();
  const birthYearOptions = Array.from({ length: 100 }, (_, i) => ({
    label: `${currentYear - i}`,
    value: currentYear - i,
  }));

  const interestLabels: InterestLabel[] = [
    { label: '정치', value: 'POLITICS' },
    { label: '사회', value: 'SOCIAL' },
    { label: '문화', value: 'CULTURE' },
    { label: '경제', value: 'ECONOMY' },
    { label: 'IT', value: 'IT' },
    { label: '세계', value: 'WORLD' },
    { label: '스포츠', value: 'SPORTS' },
    { label: '연예', value: 'ENTERTAIN' },
    { label: '건강', value: 'HEALTH' },
    { label: '여행', value: 'TRAVEL' },
    { label: '교육', value: 'EDUCATION' },
    { label: '리빙', value: 'LIVING' },
    { label: '뷰티', value: 'BEAUTY' },
    { label: '패션', value: 'FASHION' },
    { label: '과학', value: 'SCIENCE' },
  ];

  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(selectedInterests.length > 0 && birthYear !== null);
  }, [selectedInterests, birthYear]);

  const handleSave = async () => {
    if (isFormValid) {
      setIsLoading(true);
      try {
        const serverCategories = selectedInterests.map(
          (label) => interestLabels.find((item) => item.label === label)?.value || '',
        );
        const data = { birthYear, category: serverCategories };
        await patchUserInfo(data);
        onSave(data);
        onClose();
        window.location.reload();
      } catch (error) {
        console.error('Failed to save user info:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    }
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
        <p className="text-lg font-medium whitespace-nowrap">관심분야(최소 1개, 최대 5개)</p>
        <div className="p-4">
          <ToggleButtonGroup
            buttons={interestLabels.map((item) => item.label)}
            maxSelection={5}
            onSelectionChange={handleInterestChange}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <Button label="닫기" severity="secondary" outlined onClick={onClose} disabled={isLoading} />
          <Button
            label={isLoading ? '저장 중...' : '저장 후 맞춤 추천받기'}
            className="bg-[#FFBF09] border-2 border-[#FFBF09] shadow-none hover:bg-[#E5AB08]"
            onClick={handleSave}
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
    </Card>
  );
};

export default UserInfoForm;
