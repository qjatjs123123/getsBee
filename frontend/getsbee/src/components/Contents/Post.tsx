import React from 'react';

function Post() {
  const post = {
    title: 'Lorem lpsum passages, and more recently with...',
    url: 'www.asdlsdspeh.com/ashaasd/',
    thumbnail: 'https://via.placeholder.com/100',
    viewCount: '400M',
    directoryName: 'Dahyun Ko / IT',
    createdAt: 'Jul 17, 2024',
    highlightColors: ['#FFB6C6', '#F9F47F'],
    highlightNumber: 4,
  };

  return (
    <div className="border border-gray-300 rounded-[12px]" style={{ width: '400px', height: '150px' }}>
      <div className="flex">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="mt-3 ml-3 w-[100px] h-[100px] rounded-lg border border-gray-300"
        />
        <div className="ml-2.5 flex-1">
          <h2 className="text-[18px] font-bold mt-2 leading-tight mr-1">{post.title}</h2>
          <a href={post.url} className="text-[12px] font-semibold hover:underline block" style={{ color: '#8D8D8D' }}>
            {post.url}
          </a>
          <p className="text-[14px] font-semibold" style={{ color: '#8D8D8D' }}>
            {post.directoryName}
          </p>
          <p className="text-[12px] font-semibold" style={{ color: '#8D8D8D' }}>
            조회수 {post.viewCount}
          </p>
        </div>
      </div>
      <div className="flex ml-3 justify-between mt-1 px-4">
        <p className="text-[12px] font-semibold mt-1" style={{ color: '#8D8D8D' }}>
          {post.createdAt}
        </p>
        <div className="flex ">
          <div className="flex mt-1">
            {post.highlightColors.map((color) => (
              <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className="text-[14px] font-semibold" style={{ color: '#8D8D8D' }}>
            {post.highlightNumber}Highlights
          </span>
        </div>
      </div>
    </div>
  );
}

export default Post;
