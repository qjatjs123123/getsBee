import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { getDirectories, updateDirectories } from '../../api/DirectoryApi';

interface EditableTreeProps {
  memberId: number | null;
}

interface NodeData {
  directoryId: string | number;
  name: string;
  depth: number;
  prevDirectoryId: string | number | null;
  nextDirectoryId: string | number | null;
  parentDirectoryId: string | number | null;
  memberId: number;
  memberName?: string;
  children: NodeData[];
}

interface TreeNode {
  key: string;
  data: NodeData;
  children: TreeNode[];
}

const EditableDir: React.FC<EditableTreeProps> = ({ memberId }) => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const toast = React.useRef<Toast>(null);

  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [rootDirectoryId, setRootDirectoryId] = useState<string | number | null>(null);

  // confirmDialog 스타일 정의
  const confirmDialogStyle = {
    width: '60vw',
    minWidth: '350px',
    maxWidth: '500px',
  };

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

  const isSpecialDirectory = (name: string) => {
    return name === 'Temporary' || name === 'Bookmark';
  };

  const showToast = (severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

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
    const nodeToDelete = nodes.find((node) => node.directoryId === id);
    if (nodeToDelete && isSpecialDirectory(nodeToDelete.name)) {
      showToast('warn', 'Action Denied', `The '${nodeToDelete.name}' directory cannot be deleted.`);
      return;
    }

    confirmDialog({
      message: '디렉토리를 정말 삭제하시겠습니까? 하위 디렉토리 및 포함된 포스트들도 함께 삭제됩니다. ',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      style: confirmDialogStyle,
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
    const nodeToUpdate = nodes.find((node) => node.directoryId === id);
    if (nodeToUpdate && isSpecialDirectory(nodeToUpdate.name)) {
      showToast('warn', 'Action Denied', `The name of the '${nodeToUpdate.name}' directory cannot be changed.`);
      return;
    }

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

  const flattenNodes = (nodes: NodeData[]): NodeData[] => {
    let flatNodes: NodeData[] = [];
    nodes.forEach((node) => {
      const { children, ...nodeWithoutChildren } = node;
      flatNodes.push(nodeWithoutChildren);
      if (children.length > 0) {
        flatNodes = flatNodes.concat(flattenNodes(children));
      }
    });
    return flatNodes;
  };

  const handleSubmit = () => {
    confirmDialog({
      message: '변경사항을 저장하시겠습니까?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      style: confirmDialogStyle,
      accept: async () => {
        try {
          const flattenedNodes = flattenNodes(nodes);
          console.log(JSON.stringify(flattenedNodes, null, 2));
          await updateDirectories(memberId, flattenedNodes);
          showToast('success', 'Success', 'Directories updated successfully');
          // window.location.href = `/myhive/${username}`;
        } catch (error) {
          console.error('Failed to update directories:', error);
          showToast('error', 'Error', 'Failed to update directories');
        }
      },
      reject: () => {
        showToast('info', 'Info', 'Changes were not saved');
      },
    });
  };

  const headerTemplate = (
    <div className="flex justify-end items-center w-full">
      <Button icon="pi pi-plus" className="p-button-rounded text-black p-button-text" onClick={() => addNode(null)} />
    </div>
  );

  const nameTemplate = (node: NodeData) => {
    if (isSpecialDirectory(node.name)) {
      return <span>{node.name}</span>;
    }

    return (
      <InputText
        value={node.name}
        onChange={(e) => updateNode(node.directoryId, e.target.value)}
        className="w-3/4 p-inputtext-sm"
      />
    );
  };

  const actionTemplate = (node: NodeData) => {
    if (isSpecialDirectory(node.name)) {
      return null;
    }

    return (
      <div className="flex justify-end space-x-2">
        {node.depth === 1 && (
          <Button
            icon="pi pi-plus"
            className="p-button-rounded text-black p-button-text"
            onClick={() => addNode(node.directoryId, true)}
          />
        )}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded text-black p-button-text"
          onClick={() => deleteNode(node.directoryId)}
        />
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <Toast ref={toast} />
      <div className="p-4 w-2/3 max-w-3xl">
        <ConfirmDialog />
        <TreeTable value={nodes} className="p-treetable-sm">
          <Column
            field="name"
            header={() => <div className="pl-3 font-bold text-lg">{`${username}'s directory`}</div>}
            body={nameTemplate}
            expander
            style={{ width: '70%' }}
          />
          <Column header={headerTemplate} body={actionTemplate} style={{ width: '30%' }} />
        </TreeTable>
        <div className="mt-4 flex justify-end">
          <Button
            label="저장하기"
            icon="pi pi-check"
            className="bg-[#FFBF09] border-2 border-[#FFBF09] shadow-none hover:bg-[#E5AB08] font-bold"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditableDir;
