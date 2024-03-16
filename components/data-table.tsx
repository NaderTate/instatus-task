"use client";

import { FullLog } from "@/types";

import LogRow from "./log-row";

interface DataTableProps {
  logs: FullLog[];
}

const DataTable = ({ logs }: DataTableProps) => (
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
        {logs.map((log) => (
          <LogRow log={log} key={log.id} />
        ))}
      </tbody>
    </table>
    <button className="bg-[#F5F5F5] w-full py-[18px] text-sm font-semibold">
      LOAD MORE
    </button>
  </>
);

export default DataTable;
