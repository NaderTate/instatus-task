"use client";

import { useSWRConfig } from "swr";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoIosDownload } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import SearchInput from "./search-input";

const SearchBar = () => {
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);

  const { mutate } = useSWRConfig();

  return (
    <div className="w-full bg-[#F5F5F5] p-[16px] rounded-t-[15px]">
      <div className="w-full flex">
        <input
          onChange={(e) => {
            router.push(`?search=${e.target.value}`);
            mutate("logs");
          }}
          type="text"
          placeholder="Search name, email or action..."
          className="rounded-l-[8px] border border-[#E0E0DF] w-full bg-transparent p-3"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-[#575757] text-xs px-2 flex items-center gap-x-2 border border-[#E0E0DF]"
        >
          <IoFilterSharp size={20} />
          FILTERS
        </button>

        <button className="text-[#575757] text-xs px-2 flex items-center gap-x-2 border border-[#E0E0DF]">
          <IoIosDownload size={20} />
          EXPORT
        </button>

        <button className="text-[#575757] rounded-r-[15px] text-xs px-2 flex items-center gap-x-2 border border-[#E0E0DF]">
          <div className="rounded-full bg-[#8F485D] w-3 h-3"></div>
          LIVE
        </button>
      </div>
      {showFilters && (
        <div className=" w-full flex flex-wrap gap-5 mt-5">
          <SearchInput query="actorId" placeholder="actor Id" />
          <SearchInput query="targetId" placeholder="target Id" />
          <SearchInput query="actionId" placeholder="action Id" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
