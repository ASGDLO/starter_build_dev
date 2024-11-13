import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    designation: "Investor",
    content:
      "Crypto Build has completely changed the way I manage my assets. The best part is, I don’t need to send my assets anywhere—they stay secure in my wallet, and I can invest in top strategies. My profits have been growing steadily since I started using it.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Sophia Reyes",
    designation: "Solopreneur",
    content:
      "With Crypto Build, I can invest in the best strategies without moving my assets to third parties. The returns have been great, and the revenue stream is now consistent for me. It’s been a solid tool to grow my portfolio.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Michael Zhang",
    designation: "Tech Enthusiast",
    content:
      "I love how hands-off Crypto Build is. The automated strategies are effective, and I don’t have to spend my days constantly monitoring trades. The real-time tracking makes it easy to check on my portfolio whenever I want. It’s been a great way to grow my investments without the stress.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];



const Testimonials = () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle=""
          title="What our Client Say"
          paragraph="Now is free until fund change to private."
          width="640px"
          center
        />

        <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8">
          {testimonialData.map((testimonial, i) => (
            <SingleTestimonial key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
