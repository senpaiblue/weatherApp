"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { github } from "@/app/utils/Icons";
import { ThemeDropdown } from "./ThemeDropdown/ThemeDropdown";
import SearchDailog from "./SearchDialog/SearchDailog";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit ">
        <SearchDailog/>
        <ThemeDropdown />
        <Button
          className="source-code"
          onClick={() => {
            router.push("https://github.com/senpaiblue/weatherApp");
          }}
        >
          {github}Source Code
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
