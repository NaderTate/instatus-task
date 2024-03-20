"use client";

import { useEffect, useState } from "react";

import LogRow from "./log-row";

import { FullLog } from "@/types";
import { useData } from "@/store";

interface DataTableProps {
  logs: FullLog[] | null;
  count: number;
  search: string | null;
}

const DataTable = ({ logs, count, search }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { data, setData } = useData();

  const hasMore = data && data.length < count;

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/logs?${
        search ? `search=${search}` : ""
      }&page=${currentPage + 1}`,
      {
        next: { revalidate: 0 },
      }
    );
    const data = await response.json();
    return data;
  };

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (data) {
      const newData = await fetchData();
      if (!newData || newData.logs.length === 0) return;
      setData([...data, ...newData.logs]);
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData(logs);
  }, [logs, setData]);

  return (
    <>
      <table className="text-left w-full">
        <thead>
          <tr className="bg-[#F5F5F5] text-[#616161] text-sm font-semibold">
            <th className="p-[16px]">ACTOR</th>
            <th>ACTION</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody className="border border-[#F0F0F0] rounded-b-[14px]">
          {data ? (
            data.map((log) => <LogRow log={log} key={log.id} />)
          ) : (
            <tr>
              <td>No logs found</td>
            </tr>
          )}
        </tbody>
      </table>
      {hasMore && (
        <button
          onClick={loadMore}
          className="bg-[#F5F5F5] w-full py-[18px] text-sm font-semibold"
        >
          {isLoading ? "LOADING..." : "LOAD MORE"}
        </button>
      )}
    </>
  );
};
export default DataTable;
