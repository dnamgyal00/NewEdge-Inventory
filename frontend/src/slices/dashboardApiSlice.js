
import { apiSlice } from "./apiSlice";
import { DASHBOARD_URL } from "../constant";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            query: (timeRange) => ({
                url: `${DASHBOARD_URL}/transactionNo?timeRange=${timeRange}`,
            }),
            keepUnusedDataFor: 5
        }),
        getProductStats :builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}/category_item_count`,
            }),
            keepUnusedDataFor: 5
        }),
        getRecentTransactions :builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}/recentTransaction`,
            }),
            keepUnusedDataFor: 5
        })
    }),
});

export const { useGetStatsQuery,useGetProductStatsQuery,useGetRecentTransactionsQuery} = dashboardApiSlice; 