import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface NodeData {
  directoryId: string;
  name: string;
  depth: number;
  prevDirectoryId: string | null;
  nextDirectoryId: string | null;
  parentDirectoryId: string | null;
  memberId: number;
}

interface TreeNode {
  key: string;
  data: NodeData;
  children: TreeNode[];
}

const EditableDir: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([
    {
      key: '2',
      data: {
        directoryId: '2',
        name: 'Temporary Directory',
        depth: 1,
        prevDirectoryId: null,
        nextDirectoryId: '3',
        parentDirectoryId: '1',
        memberId: 123,
      },
      children: [],
    },
    {
      key: '3',
      data: {
        directoryId: '3',
        name: 'Bookmark Directory',
        depth: 1,
        prevDirectoryId: '2',
        nextDirectoryId: 'T1',
        parentDirectoryId: '1',
        memberId: 123,
      },
      children: [
        {
          key: '4',
          data: {
            directoryId: '4',
            name: 'Sub Directory',
            depth: 2,
            prevDirectoryId: null,
            nextDirectoryId: null,
            parentDirectoryId: '3',
            memberId: 123,
          },
          children: [],
        },
      ],
    },
    {
      key: 'T1',
      data: {
        directoryId: 'T1',
        name: 'New Directory',
        depth: 1,
        prevDirectoryId: '3',
        nextDirectoryId: null,
        parentDirectoryId: '1',
        memberId: 123,
      },
      children: [
        {
          key: 'T2',
          data: {
            directoryId: 'T2',
            name: 'New Sub Directory',
            depth: 2,
            prevDirectoryId: null,
            nextDirectoryId: null,
            parentDirectoryId: 'T1',
            memberId: 123,
          },
          children: [],
        },
      ],
    },
  ]);

  const addNode = (parentKey: string | null, isSubDirectory: boolean = false) => {
    const newKey = `T${uuidv4()}`;
    const newNode: TreeNode = {
      key: newKey,
      data: {
        directoryId: newKey,
        name: 'New Directory',
        depth: isSubDirectory ? 2 : 1,
        prevDirectoryId: null,
        nextDirectoryId: null,
        parentDirectoryId: isSubDirectory ? parentKey : '1',
        memberId: 123,
      },
      children: [],
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      if (isSubDirectory && parentKey) {
        const parentNode = updatedNodes.find((node) => node.key === parentKey);
        if (parentNode && parentNode.data.depth === 1) {
          if (parentNode.children.length > 0) {
            const lastChild = parentNode.children[parentNode.children.length - 1];
            newNode.data.prevDirectoryId = lastChild.key;
            lastChild.data.nextDirectoryId = newNode.key;
          }
          parentNode.children.push(newNode);
        }
      } else {
        if (updatedNodes.length > 0) {
          const lastNode = updatedNodes[updatedNodes.length - 1];
          newNode.data.prevDirectoryId = lastNode.key;
          lastNode.data.nextDirectoryId = newNode.key;
        }
        updatedNodes.push(newNode);
      }
      return updatedNodes;
    });
  };

  const deleteNode = (key: string) => {
    confirmDialog({
      message: 'Are you sure you want to delete this directory?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setNodes((prevNodes) => {
          const updatedNodes = prevNodes.map((node) => ({
            ...node,
            children: node.children.filter((child) => child.key !== key),
          }));

          const nodeIndex = updatedNodes.findIndex((node) => node.key === key);
          if (nodeIndex !== -1) {
            const prevNode = updatedNodes[nodeIndex - 1];
            const nextNode = updatedNodes[nodeIndex + 1];

            if (prevNode) prevNode.data.nextDirectoryId = nextNode ? nextNode.key : null;
            if (nextNode) nextNode.data.prevDirectoryId = prevNode ? prevNode.key : null;

            updatedNodes.splice(nodeIndex, 1);
          }

          return updatedNodes;
        });
      },
    });
  };

  const updateNode = (key: string, newName: string) => {
    setNodes((prevNodes) => {
      const updateNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map((node) => {
          if (node.key === key) {
            return { ...node, data: { ...node.data, name: newName } };
          }
          if (node.children.length > 0) {
            return { ...node, children: updateNodeRecursive(node.children) };
          }
          return node;
        });
      };
      return updateNodeRecursive(prevNodes);
    });
  };

  const handleSubmit = () => {
    console.log('Submitting data:', nodes);
    // 서버로 데이터를 보내는 로직
  };

  const actionTemplate = (node: TreeNode) => {
    return (
      <div className="flex justify-end space-x-2">
        {node.data.depth === 1 && (
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-success p-button-text"
            onClick={() => addNode(node.key, true)}
          />
        )}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => deleteNode(node.key)}
        />
      </div>
    );
  };

  const nameTemplate = (node: TreeNode) => {
    return (
      <InputText
        value={node.data.name}
        onChange={(e) => updateNode(node.key, e.target.value)}
        className="w-3/4 p-inputtext-sm"
      />
    );
  };

  return (
    <div className="p-4">
      <ConfirmDialog />
      <div className="mb-4">
        <Button
          label="Add Root Directory"
          icon="pi pi-plus"
          className="p-button-primary"
          onClick={() => addNode(null)}
        />
      </div>
      <TreeTable value={nodes} className="p-treetable-sm w-1/3">
        <Column field="name" header="범선이의 다이어리" body={nameTemplate} expander />
        <Column body={actionTemplate} style={{ width: '150px' }} />
      </TreeTable>
      <div className="mt-4">
        <Button label="Submit Changes" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditableDir;
