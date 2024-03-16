import { FullLog } from "@/types";
import { format } from "date-fns";

const Card = ({ label, value }: { label: string; value: string }) => (
  <>
    <span className="text-[#929292] text-sm">{label}</span>
    <h5 className="text-sm">{value}</h5>
  </>
);
const LogMoreDetails = ({ log }: { log: FullLog }) => (
  <div className="px-10 py-7 border border-[#DFDFDF] rounded-xl absolute flex w-full gap-5">
    <div>
      <h4 className="text-[#929292]">ACTOR</h4>
      <div className="grid grid-cols-2 gap-y-2 mt-2">
        <Card label="Name" value={log.action.actor.name} />
        <Card label="Email" value={log.action.actor.email} />
        <Card label="ID" value={log.action.actor.id} />
      </div>
    </div>
    <div>
      <h4 className="text-[#929292]">ACTION</h4>
      <div className="grid grid-cols-2 gap-y-2 mt-2">
        <Card label="Name" value={`${log.action.type}.${log.action.status}`} />
        <Card label="ID" value={log.action.id} />
        <Card label="TARGET" value={log.action.target?.email || "-"} />
      </div>
    </div>
    <div>
      <h4 className="text-[#929292]">DATE</h4>
      <div className="grid grid-cols-2 gap-y-2 mt-2">
        <Card label="Readable" value={format(log.createdAt, "MMM d, h:mm a")} />
      </div>
    </div>
  </div>
);

export default LogMoreDetails;
