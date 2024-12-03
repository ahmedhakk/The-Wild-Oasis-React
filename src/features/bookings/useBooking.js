import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // it's array with querys, can be single query or with multible querys, will be saved in the cache.
    queryFn: () => getBooking(bookingId),
    retry: false, // react query try to fetch data 3 times - we need to tell it to try to fetch once. and if it don't get it, don't retry again.
  });

  return {
    isLoading,
    booking,
    error,
  };
};
