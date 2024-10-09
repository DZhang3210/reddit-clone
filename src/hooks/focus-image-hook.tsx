import { create } from "zustand";

interface FocusImageProps {
  imageLink: string | null;
  setImageLink: (link: string) => void;
  setOff: () => void;
}

const useFocusImage = create<FocusImageProps>((set) => ({
  imageLink: null,
  setImageLink: (link: string) => set({ imageLink: link }),
  setOff: () => set({ imageLink: null }),
}));

export default useFocusImage;
