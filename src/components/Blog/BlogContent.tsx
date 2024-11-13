import React from 'react';

interface BlogContentProps {
  blog: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    content: string;
  };
}

const BlogContent: React.FC<BlogContentProps> = ({ blog }) => {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <header>
        <h1>{blog.title}</h1>
        <p className="text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
        <img src={blog.coverImage} alt={blog.title} className="w-full h-auto rounded-lg" />
      </header>
      <section>
        <p>{blog.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </section>
    </article>
  );
};

export default BlogContent;

