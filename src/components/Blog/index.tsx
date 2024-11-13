  // SingleBlog.tsx
  import React from 'react';

  interface SingleBlogProps {
    blog: {
      title: string;
      date: string;
      excerpt: string;
      coverImage: string;
      slug: string;
    };
  }

  const SingleBlog: React.FC<SingleBlogProps> = ({ blog }) => {
    return (
      <div>
        {/* Your blog rendering logic */}
      </div>
    );
  };

  export default SingleBlog;