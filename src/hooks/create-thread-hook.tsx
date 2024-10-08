import { create } from "zustand";

interface ToggleThread {
  isOn: boolean;
  editMode: boolean;
  id: string;
  title: string;
  description: string;
  logoImage: string;
  bannerImage: string;
  bannerColor: string | null;
  setMany: (values: Partial<ToggleThread>) => void;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

const useToggleThread = create<ToggleThread>((set) => ({
  isOn: false,
  editMode: false,
  id: "",
  title: "",
  description: "",
  logoImage: "",
  bannerImage: "",
  bannerColor: null,
  setMany: (values: Partial<ToggleThread>) => set(values),
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: () => set({ isOn: true }),
  setOff: () =>
    set({
      isOn: false,
      editMode: false,
      title: "",
      description: "",
      logoImage: "",
      bannerImage: "",
      bannerColor: null,
      id: "",
    }),
}));

export default useToggleThread;
