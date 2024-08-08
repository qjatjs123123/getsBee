import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getDirectories, updateDirectories } from '../../api/DirectoryApi';

interface NodeData {
  directoryId: string;
  name: string;
  depth: number;
  prevDirectoryId: string | null;
  nextDirectoryId: string | null;
  parentDirectoryId: string | null;
  memberId: number;
  memberName?: string; // Optional field, not included in save logic
}

interface TreeNode {
  key: string;
  data: NodeData;
  children: TreeNode[];
}

const EditableDir2: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState(4);
  const [rootDirectoryId, setRootDirectoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        setLoading(true);
        const data = await getDirectories(memberId);
        console.log(data);
        const formattedNodes = formatNodes(data.data);
        setNodes(formattedNodes);
        if (formattedNodes.length > 0) {
          setRootDirectoryId(formattedNodes[0].data.parentDirectoryId);
        }
      } catch (error) {
        console.error('Failed to fetch directories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, [memberId]);

  const formatNodes = (data: any[]): TreeNode[] => {
    return data.map((item) => ({
      key: item.directoryId.toString(),
      data: {
        ...item,
        directoryId: item.directoryId.toString(),
        prevDirectoryId: item.prevDirectoryId ? item.prevDirectoryId.toString() : null,
        nextDirectoryId: item.nextDirectoryId ? item.nextDirectoryId.toString() : null,
        parentDirectoryId: item.parentDirectoryId ? item.parentDirectoryId.toString() : null,
      },
      children: item.children ? formatNodes(item.children) : [],
    }));
  };

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
        parentDirectoryId: isSubDirectory ? parentKey : rootDirectoryId,
        memberId: memberId,
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

  const flattenNodes = (nodes: TreeNode[]): Omit<NodeData, 'memberName'>[] => {
    const flattened: Omit<NodeData, 'memberName'>[] = [];
    const flatten = (node: TreeNode, parentId: string | null = null) => {
      const { memberName, ...flatNode } = {
        ...node.data,
        parentDirectoryId: parentId || rootDirectoryId,
      };
      flattened.push(flatNode);
      node.children.forEach((child) => flatten(child, node.key));
    };
    nodes.forEach((node) => flatten(node));
    return flattened;
  };

  const updatePrevNextIds = (flattenedNodes: Omit<NodeData, 'memberName'>[]): Omit<NodeData, 'memberName'>[] => {
    return flattenedNodes.map((node, index, array) => ({
      ...node,
      prevDirectoryId: index > 0 ? array[index - 1].directoryId : null,
      nextDirectoryId: index < array.length - 1 ? array[index + 1].directoryId : null,
    }));
  };

  const handleSubmit = async () => {
    try {
      let flattenedNodes = flattenNodes(nodes);
      flattenedNodes = updatePrevNextIds(flattenedNodes);
      await updateDirectories(memberId, flattenedNodes);
      console.log('Directories updated successfully');
    } catch (error) {
      console.error('Failed to update directories:', error);
    }
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-4 w-2/3 max-w-3xl">
        <ConfirmDialog />
        <div className="mb-4 flex justify-end items-center space-x-4">
          <InputText
            value={memberId}
            onChange={(e) => setMemberId(Number(e.target.value))}
            className="p-inputtext-sm"
            placeholder="Member ID"
            type="number"
          />
          <Button
            label="Add Root Directory"
            icon="pi pi-plus"
            className="p-button-primary"
            onClick={() => addNode(null)}
          />
        </div>
        <TreeTable value={nodes} className="p-treetable-sm">
          <Column field="name" header={`${username}'s directory`} body={nameTemplate} expander />
          <Column body={actionTemplate} style={{ width: '150px' }} />
        </TreeTable>
        <div className="mt-4 flex justify-end">
          <Button label="Submit Changes" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditableDir2;
