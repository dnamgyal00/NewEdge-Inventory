import { TRANSACTION_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const transactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: ({filters,currentPage}) => ({
                url:  `${TRANSACTION_URL}?transactionType=${filters.transactionType}&category=${filters.selectedCategory}&item=${filters.itemName}&startDate=${filters.startDate}&endDate=${filters.endDate}&page=${currentPage}`,
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

