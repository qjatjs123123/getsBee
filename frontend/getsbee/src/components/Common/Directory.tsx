import React, { useState } from 'react';
import { Badge } from 'primereact/badge';

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
    <div className={`pl-${directory.depth * 1} my-1 `}>
      <div>
        {directory.children.length > 0 && (
          <i
            className={`pi ${isExpanded ? 'pi-sort-up-fill' : 'pi-sort-down-fill'} text-[#8D8D8D] hover:text-[#07294D] cursor-pointer mr-1`}
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
          <Badge
            value={badge}
            severity="danger" // 뱃지 색상 (danger는 빨간색, primary는 파란색 등)
            className="ml-3"
            style={{ fontSize: '14px' }}
          />
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
