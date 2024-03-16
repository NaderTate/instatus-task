import { FullLog } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import LogMoreDetails from "./log-more-details";
const LogRow = ({ log }: { log: FullLog }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <tr
        key={log.id}
        role="button"
        tabIndex={0}
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <td className="p-[23px]">
          <div className="flex items-center gap-x-[11px]">
            <span className="font-bold capitalize rounded-full p-2 w-10 h-10 text-center text-white bg-gradient-to-br from-[#F3994A] to-[#B325E2]">
              {log.action.actor.name.charAt(0)}
            </span>
            <span className="text-sm">{log.action.actor.email}</span>
          </div>
        </td>
        <td>
          {log.action.type}.{log.action.status}
        </td>
        <td>{format(log.createdAt, "MMM d, h:mm a")}</td>
      </tr>
      {showMore && (
        <tr className="relative h-40 w-full">
          <LogMoreDetails log={log} />
        </tr>
      )}
    </>
  );
};

export default LogRow;
