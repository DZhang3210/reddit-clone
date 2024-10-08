import { create } from "zustand";

interface ViewThreadAdminsProps {
  threadId: string | null;
  setThreadId: (query: string) => void;
  setOff: () => void;
}

const useViewThreadAdmins = create<ViewThreadAdminsProps>((set) => ({
  threadId: null,
  setThreadId: (threadId: string) => set({ threadId: threadId }),
  setOff: () => set({ threadId: null }),
}));

export default useViewThreadAdmins;
