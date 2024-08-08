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
  directoryId: string | number;
  name: string;
  depth: number;
  prevDirectoryId: string | number | null;
  nextDirectoryId: string | number | null;
  parentDirectoryId: string | number | null;
  memberId: number;
  children: NodeData[];
}

interface TreeNode {
  key: string;
  data: NodeData;
  children: TreeNode[];
}

const EditableDir2: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState(123);
  const [rootDirectoryId, setRootDirectoryId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        setLoading(true);
        const data = await getDirectories(memberId);
        console.log(data);
        setNodes(data.data);
        if (data.data.length > 0) {
          setRootDirectoryId(data.data[0].parentDirectoryId);
        }
      } catch (error) {
        console.error('Failed to fetch directories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, [memberId]);

  const addNode = (parentId: string | number | null, isSubDirectory: boolean = false) => {
    const newNode: NodeData = {
      directoryId: `T${uuidv4()}`,
      name: 'New Directory',
      depth: isSubDirectory ? 2 : 1,
      prevDirectoryId: null,
      nextDirectoryId: null,
      parentDirectoryId: isSubDirectory ? parentId : rootDirectoryId,
      memberId: memberId,
      children: [],
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      if (isSubDirectory && parentId) {
        const parentNode = updatedNodes.find((node) => node.directoryId === parentId);
        if (parentNode && parentNode.depth === 1) {
          if (parentNode.children.length > 0) {
            const lastChild = parentNode.children[parentNode.children.length - 1];
            newNode.prevDirectoryId = lastChild.directoryId;
            lastChild.nextDirectoryId = newNode.directoryId;
          }
          parentNode.children.push(newNode);
        }
      } else {
        if (updatedNodes.length > 0) {
          const lastNode = updatedNodes[updatedNodes.length - 1];
          newNode.prevDirectoryId = lastNode.directoryId;
          lastNode.nextDirectoryId = newNode.directoryId;
        }
        updatedNodes.push(newNode);
      }
      return updatedNodes;
    });
  };

  const deleteNode = (id: string | number) => {
    confirmDialog({
      message: 'Are you sure you want to delete this directory?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setNodes((prevNodes) => {
          const deleteNodeRecursive = (nodes: NodeData[]): NodeData[] => {
            return nodes.filter((node) => {
              if (node.directoryId === id) {
                return false;
              }
              if (node.children.length > 0) {
                node.children = deleteNodeRecursive(node.children);
              }
              return true;
            });
          };

          const updatedNodes = deleteNodeRecursive(prevNodes);

          // Update prevDirectoryId and nextDirectoryId
          for (let i = 0; i < updatedNodes.length; i++) {
            updatedNodes[i].prevDirectoryId = i > 0 ? updatedNodes[i - 1].directoryId : null;
            updatedNodes[i].nextDirectoryId = i < updatedNodes.length - 1 ? updatedNodes[i + 1].directoryId : null;
          }

          return updatedNodes;
        });
      },
    });
  };

  const updateNode = (id: string | number, newName: string) => {
    setNodes((prevNodes) => {
      const updateNodeRecursive = (nodes: NodeData[]): NodeData[] => {
        return nodes.map((node) => {
          if (node.directoryId === id) {
            return { ...node, name: newName };
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

  const handleSubmit = async () => {
    try {
      console.log(JSON.stringify(nodes, null, 2));
      await updateDirectories(memberId, nodes);
      console.log('Directories updated successfully');
    } catch (error) {
      console.error('Failed to update directories:', error);
    }
  };

  const actionTemplate = (node: NodeData) => {
    return (
      <div className="flex justify-end space-x-2">
        {node.depth === 1 && (
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-success p-button-text"
            onClick={() => addNode(node.directoryId, true)}
          />
        )}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => deleteNode(node.directoryId)}
        />
      </div>
    );
  };

  const nameTemplate = (node: NodeData) => {
    return (
      <InputText
        value={node.name}
        onChange={(e) => updateNode(node.directoryId, e.target.value)}
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
