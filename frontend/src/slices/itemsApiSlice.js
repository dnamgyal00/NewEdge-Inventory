import { ITEM_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => ({
                url: ITEM_URL,
            }),
            keepUnusedDataFor: 5
        }),
        createItem: builder.mutation({
            query: (data) => ({
                url: ITEM_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Item'],
        }),
    }),
});

export const { useGetItemsQuery, useCreateItemMutation } = itemsApiSlice; 