import React, { useState, FormEvent, ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import searchIcon from '../../assets/searchIcon.png';

const SubSearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit 로직 추가 필요
    console.log('Submitted value:', value);
    // 제출 후 입력 필드를 초기화
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <InputText
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Search"
        className="border-0 border-b-2 border-gray-300 w-full text-center focus:border-yellow-500 focus:ring-0 bg-transparent rounded-none mr-2"
      />
      <Button
        type="submit"
        label=""
        text
        severity="secondary"
        aria-label="Bookmark"
        className="focus:outline-none focus:shadow-none m-0 p-0"
      >
        <img src={searchIcon} alt="Search Icon" className="w-10" />
      </Button>
    </form>
  );
};

export default SubSearchBar;
