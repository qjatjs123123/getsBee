import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  username: string;
}

const Directory: React.FC<DirectoryProps> = ({ directory, username }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { directoryId } = useParams<{ directoryId: string }>();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      toggleExpand();
    }
  };

  const handleDirectoryClick = () => {
    navigate(`/myhive/${username}/${directory.directoryId}`);
    window.location.reload();
  };

  const fontSize = directory.depth === 1 ? 'text-[16px]' : 'text-[14px]';

  const badge = directory.name === 'Temporary' ? '' : '';
  const isActive = directory.directoryId.toString() === directoryId;

  const textColorClass = isActive ? 'text-[#07294D]' : 'text-[#8D8D8D]';
  const hoverClass = isActive ? '' : 'hover:text-[#07294D]';
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
        <span
          className={`font-bold ${fontSize} ${textColorClass} ${hoverClass} cursor-pointer`}
          onClick={handleDirectoryClick}
        >
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
            <Directory key={child.directoryId} directory={child} username={username} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
