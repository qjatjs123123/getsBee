import React from 'react';
import folderIcon from '../../assets/folderIcon.png'; // 폴더 이미지를 임포트합니다.

interface DirectoryNavProps {
  userName: string;
  directories: { id: string; name: string }[];
  postCount: number;
}

const DirectoryNav: React.FC<DirectoryNavProps> = ({ userName, directories, postCount }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={folderIcon} alt="Folder" className="w-6 h-5" />
      <span className="text-[20px] font-bold text-[#959595]">{userName}&apos;s</span>
      {/* {directories.map((dir, index) => (
        <React.Fragment key={dir.id}>
          <span className="text-[20px] font-bold text-[#959595]">&gt;</span>
          <span
            className={`text-[20px] font-bold ${index === directories.length - 1 ? 'text-[#253746]' : 'text-[#959595]'}`}
          >
            {dir.name}
          </span>
        </React.Fragment>
      ))}
      <span className="font-bold text-[#253746]">({postCount})</span> */}
    </div>
  );
};

export default DirectoryNav;
