import { CATEGORY_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: CATEGORY_URL,
            }),
            keepUnusedDataFor: 5
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: CATEGORY_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = itemsApiSlice; 