import React from "react";
import Link from "next/link";

export const Logo = ({ title, className }) => {
  return (
    <Link href={"/"}>
      <h1 className="md:text-xl font-extrabold uppercase ${className}">
        {title}
      </h1>
    </Link>
  );
};
