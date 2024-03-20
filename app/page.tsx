"use client";

import useSWR from "swr";
import { NextPage } from "next";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import DataTable from "@/components/data-table";
import SearchBar from "@/components/search-bar";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const HomePage: NextPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const actorId = searchParams.get("actorId");
  const targetId = searchParams.get("targetId");
  const actionId = searchParams.get("actionId");

  const fetcher = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/logs?${
        search ? `search=${search}` : ""
      }&${actorId ? `actorId=${actorId}` : ""}&${
        targetId ? `targetId=${targetId}` : ""
      }&${actionId ? `actionId=${actionId}` : ""}`,
      {
        next: { revalidate: 0 },
      }
    );
    const data = await response.json();
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
