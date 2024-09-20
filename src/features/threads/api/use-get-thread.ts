import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

// export type GetThreadsReturnType = (typeof api.threads.get._returnType)["page"];
interface UseGetThreadProps {
  id: Id<"threads">;
}
export const useGetThread = ({ id }: UseGetThreadProps) => {
  const data = useQuery(api.threads.getById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
