import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  // # Create a cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess() {
      toast.success("New Cabin successfully crested");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset(); // reset the form fields
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return {
    isCreating,
    createCabin,
  };
};
