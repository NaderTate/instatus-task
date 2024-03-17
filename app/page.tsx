"use client";

import useSWR from "swr";
import { NextPage } from "next";

import DataTable from "@/components/data-table";
import SearchBar from "@/components/search-bar";
import { useSearchParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { FullLog } from "@/types";

const HomePage: NextPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const actorId = searchParams.get("actorId");
  const targetId = searchParams.get("targetId");
  const actionId = searchParams.get("actionId");

  const [logs, setLogs] = useState<FullLog[] | null>(null);

  const fetcher = async () => {
    const response = await fetch(
      `http://localhost:3000/api/logs?${page ? `page=${page}` : ""}&${
        search ? `search=${search}` : ""
      }&${actorId ? `actorId=${actorId}` : ""}&${
        targetId ? `targetId=${targetId}` : ""
      }&${actionId ? `actionId=${actionId}` : ""}`,
      {
        next: { revalidate: 0 },
      }
    );
    const data = await response.json();
    setLogs(data);
    return data;
  };

  const { data, error, isLoading, isValidating } = useSWR("logs", fetcher);

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {isValidating && (
        <AiOutlineLoading3Quarters
          className="absolute top-5 animate-spin"
          size={20}
        />
      )}
      <SearchBar />
      <DataTable logs={data.logs} count={data.count} search={search} />
    </>
  );
};

export default HomePage;
