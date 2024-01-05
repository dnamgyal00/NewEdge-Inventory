import { TRANSACTION_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const transactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: () => ({
                url: TRANSACTION_URL,
            }),
            keepUnusedDataFor: 5
        }),
        createStockIn: builder.mutation({
            query: (data) => ({
                url: `${TRANSACTION_URL}/stockIn`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Transaction'],
        }),
    }),
});

export const { useGetTransactionsQuery, useCreateStockInMutation } = transactionsApiSlice; 