import { create } from "zustand";

interface SearchPostProps {
  searchQuery: string | null;
  setSearchQuery: (query: string) => void;
  setOff: () => void;
}

const useSearchPost = create<SearchPostProps>((set) => ({
  searchQuery: null,
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setOff: () => set({ searchQuery: null }),
}));

export default useSearchPost;
