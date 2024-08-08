import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

const treeData = [
  {
    value: 'Temporary',
    title: 'Temporary',
    children: [],
  },
  { value: 'Bookmark', title: 'Bookmark', children: [] },
  {
    value: 'IT',
    title: 'IT',
    children: [
      {
        value: 'SpringBoot',
        title: 'SpringBoot',
      },
      {
        value: 'MongoDB',
        title: 'MongoDB',
      },
      {
        value: 'Cloud',
        title: 'Cloud',
      },
      {
        value: 'BlockChain',
        title: 'BlockChain',
      },
    ],
  },
  {
    value: 'Financial Sector',
    title: 'Financial Sector',
    children: [
      {
        value: 'Bank',
        title: 'Bank',
      },
      {
        value: 'Insurance',
        title: 'Insurance',
      },
      {
        value: 'New Service',
        title: 'New Service',
      },
    ],
  },
  {
    value: `What's new`,
    title: `What's new`,
    children: [
      {
        value: 'IT1',
        title: 'IT',
      },
      {
        value: 'Service',
        title: 'Service',
      },
    ],
  },
];

const DirSelection = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '150px' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
      onPopupScroll={onPopupScroll}
    />
  );
};

export default DirSelection;
