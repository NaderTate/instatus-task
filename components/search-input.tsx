import { CiSearch } from "react-icons/ci";

import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useRef } from "react";

const SearchInput = ({
  query,
  placeholder,
}: {
  query: string;
  placeholder: string;
}) => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const delayedMutate = () => {
    setTimeout(() => {
      mutate("logs");
    }, 500);
  };
  return (
    <div className="relative flex">
      <input
        ref={ref}
        onChange={(e) => {
          router.push(`?${query}=${e.target.value}`);
          delayedMutate();
        }}
        className="rounded-[8px] border border-[#E0E0DF] bg-transparent p-3 pr-10"
        placeholder={placeholder}
      />
      <CiSearch
        onClick={() => {
          router.push(`?${query}=${ref.current?.value}`);
          delayedMutate();
        }}
        className="absolute top-0 bottom-0 right-5 m-auto cursor-pointer text-[#575757]"
        size={20}
      />
    </div>
  );
};

export default SearchInput;
