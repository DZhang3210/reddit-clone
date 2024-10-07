import { create } from "zustand";

interface ToggleSharePost {
  link: string;
  setPostLink: (link: string) => void;
  setOff: () => void;
}

const useToggleSharePost = create<ToggleSharePost>((set) => ({
  link: "",
  setPostLink: (link: string) => set({ link: link }),
  setOff: () => set({ link: "" }),
}));

export default useToggleSharePost;
