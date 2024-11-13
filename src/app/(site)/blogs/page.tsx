// src/app/(site)/blogs/page.tsx

import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllPosts } from "@/utils/markdown";

export const metadata = {
  title: "Blog | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "Blog page description",
};


export default async function Blog({ searchParams }: any) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const pageSize = 6;

  // Fetch paginated posts
  const { paginatedPosts, totalPosts, totalPages } = getAllPosts(
    ["title", "date", "excerpt", "coverImage", "slug"],
    currentPage,
    pageSize
  );

  return (
    <>
      <Breadcrumb pageName="Blog" />

      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {paginatedPosts.map((blog, i) => (
              <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <a
                key={i}
                href={`?page=${i + 1}`}
                className={`mx-1 px-4 py-2 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}