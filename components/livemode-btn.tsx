import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";

const LivemodeBtn = () => {
  const [liveMode, setLiveMode] = useState(false);

  const { mutate } = useSWRConfig();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined; // Initialize as undefined

    if (liveMode) {
      // Start interval when liveMode is true
      intervalId = setInterval(() => {
        mutate("logs");
      }, 5000); // 5000 milliseconds = 5 seconds
    } else {
      // Clear interval when liveMode is false
      clearInterval(intervalId);
    }

    // Clean up function to clear interval when component unmounts or when liveMode changes to false
    return () => clearInterval(intervalId);
  }, [liveMode, mutate]); // Run effect whenever liveMode changes

  return (
    <button
      onClick={() => setLiveMode(!liveMode)}
      className="text-[#575757] rounded-r-[15px] text-xs px-2 flex items-center gap-x-2 border border-[#E0E0DF]"
    >
      <div
        className={`rounded-full w-3 h-3 transition-colors ${
          liveMode ? "bg-green-500" : "bg-[#8F485D]"
        }`}
      ></div>
      LIVE
    </button>
  );
};

export default LivemodeBtn;
