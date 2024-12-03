import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    // NOTE: *mutationFn is accept only one argument*
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess(data) {
      // this data is the same as data returned from the updateBooking fun
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError() {
      toast.error("There was an error while checking out.");
    },
  });

  return {
    checkout,
    isCheckingOut,
  };
}
