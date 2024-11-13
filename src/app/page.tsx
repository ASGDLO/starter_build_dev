import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import FundPageClient from "@/app/(site)/fund/FundPageClient";
import Testimonials from "@/components/Testimonials";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import NewsletterForm from "@/components/Features/NewsletterForm";
// import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Crypto Build",
  description: "Automate Trading Strategy and Maximize Profits",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      {/* <Newsletter /> */}
      <FundPageClient />
      {/* <NewsletterForm /> */}

      {/* <Features /> */}
      <About />
      <CallToAction />
      <Pricing />
      {/* <Testimonials /> */}
      <Faq />
      {/* <Team /> */}
      {/* <HomeBlogSection posts={posts} /> */}
      <Contact />
      {/* <Clients /> */}
    </main>
  );
}
