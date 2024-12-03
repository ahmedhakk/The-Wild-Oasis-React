import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], // it's array with querys, can be single query or with multible querys, will be saved in the cache.
    queryFn: getCabins,
  });

  return {
    isLoading,
    cabins,
    error,
  };
};
