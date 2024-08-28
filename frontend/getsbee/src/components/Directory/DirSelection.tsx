import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import { useRecoilValueLoadable } from 'recoil';
import { getUserInfo } from '../../api/UserInfoAPI';
import { getDirectoryState, Directory } from '../../recoil/DirectoryState';

interface TreeNode {
  title: string;
  value: string;
  children: TreeNode[];
}

interface DirSelectionProps {
  selectedDirectoryId?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

const convertToTreeData = (directories: Directory[]): TreeNode[] => {
  const mapDirectoryToTreeNode = (dir: Directory): TreeNode => {
    return {
      title: dir.name,
      value: dir.directoryId.toString(),
      children: dir.children ? dir.children.map(mapDirectoryToTreeNode) : [],
    };
  };

  const treeData: TreeNode[] = directories
    .filter((dir) => dir.depth === 1 && dir.name !== 'Bookmark')
    .map(mapDirectoryToTreeNode);

  return treeData;
};

const DirSelection: React.FC<DirSelectionProps> = ({
  selectedDirectoryId = '',
  readOnly = false,
  onChange = () => {},
}) => {
  const [memberId, setMemberId] = useState<number>(0);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setMemberId(userInfo.data.data.memberId);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const directoriesLoadable = useRecoilValueLoadable(getDirectoryState(memberId));

  if (directoriesLoadable.state === 'loading') {
    return <p>Loading directories...</p>;
  }

  if (directoriesLoadable.state === 'hasError') {
    return <p>Error loading directories</p>;
  }

  const directories = directoriesLoadable.contents;
  const treeData = convertToTreeData(directories);

  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '150px' }}
      value={selectedDirectoryId}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear={!readOnly}
      treeDefaultExpandAll
      onChange={handleChange}
      treeData={treeData}
      disabled={readOnly}
    />
  );
};

DirSelection.propTypes = {
  selectedDirectoryId: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

DirSelection.defaultProps = {
  selectedDirectoryId: '',
  readOnly: false,
  onChange: () => {},
};

export default DirSelection;
