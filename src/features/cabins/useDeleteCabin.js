import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // mutate that will call this mutationFn
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,

    // when we delete the cabin we need to "invalidate" the cache - so we need to refetch the data again
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin Successfully deleted");
    },

    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteCabin,
  };
}
