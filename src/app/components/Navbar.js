"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/app/components/logo";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { IconContext } from "react-icons";
import styles from "../style/sidebar.module.css";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  const navbarList = [
    { title: "Blog", href: "/blog" },
    { title: "Category", href: "/category" },
  ];
  return (
    <header className=" drop-shadow-xl flex min-h-20 md:h-24 items-center bg-white">
      <div className=" container mx-auto my-6 flex justify-between items-center pl-5 pr-8 lg:pr-16">
        <Logo title="大海も空の青さも知らず" className="text-black" />
        <div className="hidden md:inline-flex items-center gap-7 text-gray-900 hover:text-black duration-200">
          {navbarList.map((value, index) => (
            <Link
              key={index}
              href={value.href}
              className="text-sm uppercase font-semibold relative group overflow-hidden"
            >
              {value.title}
              <span className="w-full h-[1px] bg-blue-700 absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200"></span>
            </Link>
          ))}
        </div>

        {/* ハンバーガーメニュー */}
        <IconContext.Provider value={{ size: "30px" }}>
          <button onClick={menuFunction} className="md:hidden">
            <RxHamburgerMenu />
          </button>
        </IconContext.Provider>

        {/* OpenmenuがTrueのとき表示 */}
        {/* <div className="fixed top-0 right-0 z-10  h-screen w-2/3 bg-white opacity-90 transform translate-x-0 duration-300 ease-in-out"> */}
        <div
          className={
            openMenu
              ? styles.sidebar_show
              : //  absolute top-0 right-0 z-10  h-screen w-2/3 bg-white opacity-90 transition duration-3000`
                styles.sidebar_hidden
            //  absolute top-0 -right-2/3 z-10  h-screen w-2/3 bg-white opacity-90 transition duration-3000`
          }
        >
          <IconContext.Provider value={{ size: "30px" }}>
            <div className=" flex justify-end">
              <button onClick={menuFunction} className="mr-8 mt-8 h-8 w-8">
                <RxCross1 />
              </button>
            </div>
          </IconContext.Provider>
          <nav className="fixed mt-8 h-full">
            {navbarList.map((value, index) => (
              <div
                key={index}
                className="px-12 py-4 font-bold text-2xl"
                onClick={menuFunction}
              >
                <Link href={value.href}>{value.title}</Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
