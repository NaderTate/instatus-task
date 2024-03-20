import { CSVLink } from "react-csv";

import { format } from "date-fns";

import { useData } from "@/store";
import { IoIosDownload } from "react-icons/io";

const ExportBtn = () => {
  const { data } = useData();

  const csvData = data
    ? [
        ["Actor", "Action", "Target", "Date"],
        ...data.map((log) => [
          log.action.actor.email,
          `${log.action.type}.${log.action.status}`,
          log.action.target?.email || "-",
          format(log.createdAt, "MMM d, h:mm a"),
        ]),
      ]
    : [["No data to export"]];

  return (
    <CSVLink
      className="text-[#575757] text-xs px-2 flex items-center gap-x-2 border border-[#E0E0DF]"
      data={csvData}
    >
      <IoIosDownload size={20} />
      EXPORT
    </CSVLink>
  );
};

export default ExportBtn;
