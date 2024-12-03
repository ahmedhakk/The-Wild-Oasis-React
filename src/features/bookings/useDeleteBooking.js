import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,

    // when we delete the booking we need to "invalidate" the cache - so we need to refetch the data again
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success("Booking Successfully deleted");
    },

    onError(err) {
      toast.error(err.message);
    },
  });

  return {
    isDeletingBooking,
    deleteBooking,
  };
}
