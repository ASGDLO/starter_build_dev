import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";



const HomeBlogSection = ({ posts }: { posts: any[] }) => {
  if (!Array.isArray(posts)) {
    console.error("Expected 'posts' to be an array, but received:", posts);
    return <div>No posts available</div>;
  }

  return (
    <div className="-mx-4 flex flex-wrap">
      {posts.slice(0, 3).map((blog: any, i: number) => (
        <div key={i} className="w-full px-4 md:w-1/2 lg:w-1/3">
          <SingleBlog blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default HomeBlogSection;
