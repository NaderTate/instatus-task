import { create } from "zustand";
import { FullLog } from "./types";

interface DataStore {
  data: FullLog[] | null;
  setData: (data: FullLog[] | null) => void;
}

export const useData = create<DataStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
