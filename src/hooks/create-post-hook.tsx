import { create } from "zustand";

interface TogglePost {
  isOn: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

const useTogglePost = create<TogglePost>((set) => ({
  isOn: false,
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: () => set({ isOn: true }),
  setOff: () => set({ isOn: false }),
}));

export default useTogglePost;
