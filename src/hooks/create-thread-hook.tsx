import { create } from "zustand";

interface ToggleThread {
  isOn: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

const useToggleThread = create<ToggleThread>((set) => ({
  isOn: false,
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: () => set({ isOn: true }),
  setOff: () => set({ isOn: false }),
}));

export default useToggleThread;
