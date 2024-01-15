import { TRANSACTION_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const transactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (filters) => ({
                url:  `${TRANSACTION_URL}?transactionType=${filters.transactionType}&category=${filters.selectedCategory}&item=${filters.itemName}&startDate=${filters.startDate}&endDate=${filters.endDate}`,
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

{/* transactions?startDate=2023-01-01&endDate=2023-12-31&category=Electronics&item=Laptop&transactionType=stockIn */}