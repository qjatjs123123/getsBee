import React, { useState, FormEvent, ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import searchBIcon from '../../assets/searchBIcon.png';

const FollowSearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit 로직 추가 필요
    console.log('Submitted value:', value);
    // 제출 후 입력 필드를 초기화
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-[50px] w-[190px] border-2 border-gray-300 rounded-full"
    >
      <InputText
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Search"
        className="w-[130px] h-[30px] ml-4 border-none outline-none ring-0"
      />
      <Button
        type="submit"
        label=""
        text
        severity="secondary"
        aria-label="Bookmark"
        className="focus:outline-none focus:shadow-none m-0 p-0"
      >
        <img src={searchBIcon} alt="Search Icon" className="w-6" />
      </Button>
    </form>
  );
};

export default FollowSearchBar;
