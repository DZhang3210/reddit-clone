import { create } from "zustand";

interface TogglePost {
  isOn: boolean;
  editMode: boolean;
  id: string;
  title: string;
  content: string;
  threadId: string;
  imageTitle: string;
  image: string;
  setMany: (values: Partial<TogglePost>) => void;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

const useTogglePost = create<TogglePost>((set) => ({
  isOn: false,
  editMode: false,
  id: "",
  title: "",
  content: "",
  threadId: "",
  imageTitle: "",
  image: "",
  setMany: (values: Partial<TogglePost>) => set(values),
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: () => set({ isOn: true }),
  setOff: () =>
    set({
      isOn: false,
      editMode: false,
      id: "",
      title: "",
      content: "",
      threadId: "",
      imageTitle: "",
      image: "",
    }),
}));

export default useTogglePost;
