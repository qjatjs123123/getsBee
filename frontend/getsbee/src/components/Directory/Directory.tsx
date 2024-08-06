import React, { useState } from 'react';

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

const Directory: React.FC<DirectoryProps> = ({ directory }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      toggleExpand();
    }
  };

  const fontSize = directory.depth === 1 ? 'text-[16px]' : 'text-[14px]';

  const badge = directory.name === 'Temporary' ? '9' : '';

  return (
    <div className={`pl-${directory.depth * 1} my-1`}>
      <div className="flex items-center">
        {directory.children.length > 0 && (
          <i
            className={`pi ${isExpanded ? 'pi-chevron-up' : 'pi-chevron-down'} text-[#BDBDBD] text-[12px] hover:text-[#07294D] cursor-pointer mr-1`}
            onClick={toggleExpand}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            tabIndex={0}
          />
        )}
        <span className={`font-bold text-[#8D8D8D] ${fontSize} hover:text-[#07294D] cursor-pointer`}>
          {directory.name}
        </span>
        {badge && (
          <span
            className="ml-2 w-4 h-4 rounded-full flex items-center justify-center text-bold text-white"
            style={{ backgroundColor: 'red', fontSize: '10px' }}
          >
            {badge}
          </span>
        )}
      </div>
      {isExpanded && directory.children.length > 0 && (
        <div className="ml-5">
          {directory.children.map((child) => (
            <Directory key={child.directoryId} directory={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
