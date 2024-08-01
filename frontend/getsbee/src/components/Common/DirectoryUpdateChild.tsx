import React from 'react';

interface Directory {
  directoryId: number;
  name: string;
  depth: number;
  prevDirectoryId: number | null;
  nextDirectoryId: number | null;
  parentDirectoryId: number;
  memberId: number;
  children: Directory[];
}

interface DirectoryProps {
  directory: Directory;
}

const DirectoryUpdateChild: React.FC<DirectoryProps> = ({ directory }) => {
  const fontSize = directory.depth === 1 ? 'text-[16px]' : 'text-[14px]';

  return (
    <div className={`pl-${directory.depth * 1} my-1 `}>
      <div>
        <span className={`font-bold text-[#8D8D8D] ${fontSize} hover:text-[#07294D] cursor-pointer`}>
          {directory.name}
        </span>
      </div>
      {directory.children.length > 0 && (
        <div className="ml-5">
          {directory.children.map((child) => (
            <DirectoryUpdateChild key={child.directoryId} directory={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryUpdateChild;
