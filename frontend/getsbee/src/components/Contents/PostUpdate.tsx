import React, { useState, KeyboardEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import Highlight from './Highlight';
import publicIcon from '../../assets/publicIcon.png';
import privateIcon from '../../assets/privateIcon.png';

interface Highlight {
  content: string;
  color: string;
}

interface Comment {
  id: string;
  name: string;
  comment: string;
  date: string;
  avatar: string;
}

interface Post {
  title: string;
  url: string;
  viewCount: string;
  likeCount: string;
  directoryName: string;
  isPublic: boolean;
  isLike: boolean;
  note: string;
  avatar: string;
  highlights: Highlight[];
  comments: Comment[];
}

interface PostUpdateProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onCancel: () => void;
}

const PostUpdate: React.FC<PostUpdateProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [isPublic, setIsPublic] = useState(post.isPublic);
  const [note, setNote] = useState(post.note);
  const [highlights, setHighlights] = useState<Highlight[]>(post.highlights);

  const handleSave = () => {
    const updatedPost = {
      ...post,
      title,
      isPublic,
      note,
      highlights,
    };
    onSave(updatedPost);
  };

  const handleRemoveHighlight = (content: string) => {
    const newHighlights = highlights.filter((highlight) => highlight.content !== content);
    setHighlights(newHighlights);
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
    <div style={{ width: '500px', height: 'auto' }}>
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
      </div>
      <div className="flex mt-3">
        <img src={post.avatar} alt={post.title} className="mt-3 ml-3 w-[100px] h-[100px]" />
        <div className="ml-4 flex-1">
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[16px] font-bold w-full mb-2 p-inputtext-sm"
          />
          <p className="text-[14px] font-semibold mb-1" style={{ color: '#8D8D8D' }}>
            {post.directoryName}
          </p>
          <p className="text-[12px] font-semibold block" style={{ color: '#8D8D8D' }}>
            <a href={post.url} className="hover:underline">
              {post.url}
            </a>
          </p>
          <div className="flex justify-end text-[12px] font-semibold mt-3" style={{ color: '#8D8D8D' }}>
            <div className="flex items-center mr-4">
              <i className={`pi pi-heart mr-1`} />
              <span>{post.likeCount}</span>
            </div>
            <div className="flex items-center">
              <i className={`pi pi-eye mr-1`} />
              <span className="mr-3">{post.viewCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <Divider className="mt-1 mb-2 border-gray-300" style={{ borderBottomWidth: '1px' }} />
      </div>
      <div className="flex justify-between items-center mt-3 ml-3">
        <h2 className="text-[18px] font-bold">Highlights</h2>
      </div>
      <div className="mt-4 ml-6">
        {highlights.map((highlight) => (
          <div key={highlight.content} className="flex items-center mb-2">
            <Highlight text={highlight.content} color={highlight.color} className="flex-1" />
            <Button
              icon="pi pi-times"
              className="p-button-text p-button-danger ml-2"
              onClick={() => handleRemoveHighlight(highlight.content)}
            />
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
