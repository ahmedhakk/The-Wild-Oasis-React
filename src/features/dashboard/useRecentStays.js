import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams(); // last=7 | 30 | 90

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // i need to get the last bookings in last week or month or ..
  // we need to know today's date and subtract numDays(week or month) from it
  const queryDate = subDays(new Date(), numDays).toISOString(); // subtract numDays from today

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return {
    isLoading,
    stays,
    confirmedStays,
    numDays,
  };
}
