import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

interface TreeNode {
  key: string;
  data: {
    name: string;
  };
  children?: TreeNode[];
}

const EditableTree: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([
    {
      key: '1',
      data: { name: 'Parent 1' },
      children: [
        { key: '1-1', data: { name: 'Child 1-1' } },
        { key: '1-2', data: { name: 'Child 1-2' } },
      ],
    },
    {
      key: '2',
      data: { name: 'Parent 2' },
      children: [{ key: '2-1', data: { name: 'Child 2-1' } }],
    },
  ]);

  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const startEditing = (key: string, initialText: string) => {
    setEditingNode(key);
    setEditingText(initialText);
  };

  const updateNodeName = (key: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.key === key) {
          return { ...node, data: { ...node.data, name: editingText } };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setNodes(updateNode(nodes));
    setEditingNode(null);
  };

  const addNode = (parentKey: string | null) => {
    const newKey = Date.now().toString();
    const newNode = { key: newKey, data: { name: 'New Node' } };

    if (parentKey === null) {
      // Adding a new root node
      setNodes([...nodes, newNode]);
    } else {
      // Adding a child node
      setNodes(
        nodes.map((node) => {
          if (node.key === parentKey) {
            return {
              ...node,
              children: node.children ? [...node.children, newNode] : [newNode],
            };
          }
          return node;
        }),
      );
    }
  };

  const deleteNode = (key: string) => {
    confirmDialog({
      message: 'Are you sure you want to delete this node?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setNodes(
          nodes
            .filter((node) => node.key !== key)
            .map((node) => {
              if (node.children) {
                return { ...node, children: node.children.filter((child) => child.key !== key) };
              }
              return node;
            }),
        );
      },
    });
  };

  const actionTemplate = (node: TreeNode) => {
    const isRootNode = !node.key.includes('-');

    return (
      <div className="flex space-x-2">
        {editingNode === node.key ? (
          <>
            <InputText
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="p-inputtext-sm"
            />
            <Button
              icon="pi pi-check"
              onClick={() => updateNodeName(node.key)}
              className="p-button-sm p-button-success"
            />
            <Button
              icon="pi pi-times"
              onClick={() => setEditingNode(null)}
              className="p-button-sm p-button-secondary"
            />
          </>
        ) : (
          <>
            <Button
              icon="pi pi-pencil"
              onClick={() => startEditing(node.key, node.data.name)}
              className="p-button-sm p-button-secondary"
            />
            {isRootNode && (
              <Button
                icon="pi pi-plus"
                onClick={() => addNode(node.key)}
                className="p-button-sm p-button-success"
                tooltip="Add Child"
                tooltipOptions={{ position: 'top' }}
              />
            )}
            <Button icon="pi pi-trash" onClick={() => deleteNode(node.key)} className="p-button-sm p-button-danger" />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editable Tree (Max Depth: 2)</h1>
      <Button
        label="Add Root Node"
        icon="pi pi-plus"
        onClick={() => addNode(null)}
        className="p-button-sm p-button-success mb-4"
      />
      <TreeTable value={nodes} className="p-treetable-sm">
        <Column field="name" header="Name" expander body={(node) => node.data.name} />
        <Column body={actionTemplate} style={{ width: '250px' }} />
      </TreeTable>
      <ConfirmDialog />
    </div>
  );
};

export default EditableTree;
