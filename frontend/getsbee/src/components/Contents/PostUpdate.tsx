import React, { useState, KeyboardEvent } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import HighlightItem from './HighlightItem';
import DirSelection from '../Directory/DirSelection';
import publicIcon from '../../assets/publicIcon.png';
import privateIcon from '../../assets/privateIcon.png';
import { Post, Highlight as HighlightType } from '../../recoil/PostDetailState';
import { useUpdatePost } from '../../recoil/PostDetailState'; // Add this import

interface PostUpdateProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onCancel: () => void;
}

const PostUpdate: React.FC<PostUpdateProps> = ({ post, onSave, onCancel }) => {
  const [isPublic, setIsPublic] = useState(post.isPublic);
  const [note, setNote] = useState(post.note ?? '');
  const [highlights, setHighlights] = useState<HighlightType[]>(post.highlights);
  const [selectedDirectoryId, setSelectedDirectoryId] = useState(post.directoryId ? post.directoryId.toString() : '');
  const [deleteHighlightIds, setDeleteHighlightIds] = useState<number[]>([]);

  const updatePost = useUpdatePost(); // Add this hook

  const handleSave = async () => {
    try {
      const updatedPostData = {
        note,
        directoryId: parseInt(selectedDirectoryId, 10),
        isPublic,
        deleteHighlightIds,
      };

      await updatePost(post.postId, updatedPostData); // Use the hook to update the post
      onSave({ ...post, ...updatedPostData }); // Update local state with the new data
      window.location.reload();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const publicClass = isPublic ? 'bg-[#DBEAFE] text-[#3B559C]' : 'bg-red-200 text-red-800';
  const publicText = isPublic ? 'Public' : 'Private';
  const iconSrc = isPublic ? publicIcon : privateIcon;

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      togglePublic();
    }
  };

  return (
    <div className="mb-4" style={{ width: '500px', height: 'auto' }}>
      <div className="flex justify-between mt-3">
        <div className="flex items-center">
          <span
            className={`flex items-center text-[12px] font-semibold px-2 py-1 rounded-full ${publicClass} cursor-pointer`}
            onClick={togglePublic}
            onKeyPress={handleKeyPress}
            tabIndex={0}
            role="button"
            aria-label={publicText}
          >
            <img className="flex w-[20px] h-[20px] mr-1" src={iconSrc} alt="statusIcon" />
            {publicText}
          </span>
        </div>
        <div className="flex items-center">
          <DirSelection selectedDirectoryId={selectedDirectoryId} onChange={(value) => setSelectedDirectoryId(value)} />
        </div>
      </div>
      <div className="flex mt-3">
        <div className="w-[60px] h-[60px]">
          <Avatar image={post.memberImage} size="large" shape="circle" className="w-[60px] h-[60px] mt-1" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-[14px] font-semibold" style={{ color: '#8D8D8D' }}>
            {post.directoryName}
          </p>
          <p className="text-[18px] font-bold mr-1"> {post.title}</p>
          <p className="text-[12px] font-semibold block" style={{ color: '#8D8D8D' }}>
            <a href={post.url} className="hover:underline">
              {post.url}
            </a>
          </p>
        </div>
      </div>
      <Divider className="mt-1 mb-2 border-gray-300" style={{ borderBottomWidth: '1px' }} />
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-bold">Highlights</h2>
      </div>
      <div className="mt-4 ml-6">
        {highlights.map((highlight) => (
          <div key={highlight.highlightId} className="flex items-center mb-2">
            <HighlightItem text={highlight.content} color={highlight.color} />
          </div>
        ))}
      </div>
      <div className="flex mt-3 ml-3">
        <h2 className="text-[18px] font-bold">Notes</h2>
      </div>
      <div className="mt-1 ml-6">
        <InputTextarea value={note} onChange={(e) => setNote(e.target.value)} rows={5} className="w-full" />
      </div>
      <div className="flex justify-end mt-3 ml-3">
        <Button label="Cancel" className="p-button-secondary mr-2" onClick={onCancel} />
        <Button label="Save" icon="pi pi-save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default PostUpdate;
