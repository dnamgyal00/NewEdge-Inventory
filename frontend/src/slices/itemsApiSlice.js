import { ITEM_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => ({
                url: ITEM_URL,
            }),
            keepUnusedDataFor: 5
        })
    }),
});

export const { useGetItemsQuery } = itemsApiSlice; 