import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams(); // last=7 | 30 | 90

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // i need to get the last bookings in last week or month or ..
  // we need to know today's date and subtract numDays(week or month) from it
  const queryDate = subDays(new Date(), numDays).toISOString(); // subtract numDays from today

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return {
    isLoading,
    bookings,
  };
}
