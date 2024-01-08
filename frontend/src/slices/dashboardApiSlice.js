
import { apiSlice } from "./apiSlice";
import { DASHBOARD_URL } from "../constant";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            query: (timeRange) => ({
                url: `${DASHBOARD_URL}/transactionNo?timeRange=${timeRange}`,
            }),
            keepUnusedDataFor: 5
        })
    }),
});

export const { useGetStatsQuery,} = dashboardApiSlice; 