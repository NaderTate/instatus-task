"use client";

import useSWR from "swr";
import { NextPage } from "next";

import DataTable from "@/components/data-table";
import SearchBar from "@/components/search-bar";
import { useSearchParams } from "next/navigation";

const HomePage: NextPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const fetcher = async () => {
    const response = await fetch(
      `http://localhost:3000/api/logs?${page ? `page=${page}` : ""}&${
        search ? `search=${search}` : ""
      }`,
      {
        next: { revalidate: 0 },
      }
    );
    const data = await response.json();
    return data;
  };
  const { data, error } = useSWR("logs", fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <SearchBar />
      <DataTable logs={data} />
    </>
  );
};

export default HomePage;
