import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryQlient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };
  // {
  //   field: "totalPrice",
  //   value: 5000,
  //   method: "gte",
  // };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // whenever this filter changes => react query will re-fetch bookings qeury
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  // NEXT PAGE => Now we fetch page (1, 2) together, (2, 3) => So we will not have the loading spinner on every page.
  const pageCount = Math.ceil(count / PAGE_SIZE); // 24 / 10 = 2.4 => 3
  if (page < pageCount) {
    queryQlient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  // PREVIOUS PAGE.
  if (page > 1) {
    queryQlient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, count, error };
};
