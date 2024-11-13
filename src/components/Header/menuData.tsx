import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  // {
  //   id: 2,
  //   title: "About",
  //   path: "/about",
  //   newTab: false,
  // },
  {
    id: 3,
    title: "Pricing",
    path: "/pricing",
    newTab: false,
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  {
    id: 5,
    title: "Blog",
    path: "/blogs",
    newTab: false,
  },
  {
    id: 6, // New ID for Strategy
    title: "Free Strategy",
    path: "/strategy",
    newTab: false,
  },
  // {
  //   id: 7, // Ensure this ID is unique
  //   title: "Fund",
  //   path: "/fund",
  //   newTab: false,
  // },
];

export default menuData;
