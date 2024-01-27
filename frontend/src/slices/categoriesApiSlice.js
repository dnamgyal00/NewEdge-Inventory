import { CATEGORY_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (page) => ({
                url: page? `${CATEGORY_URL}?page=${page}`:CATEGORY_URL
            }),
            keepUnusedDataFor: 5
        }),
        getCategoryDetails: builder.query({
            query: ({categoryId,currentPage}) => ({
              url: `${CATEGORY_URL}/${categoryId}?page=${currentPage}`,
            }),
            keepUnusedDataFor: 5,
          }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: CATEGORY_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),

        searchCategoriesByName: builder.query({
            query: (name) => ({
                url: `${CATEGORY_URL}/search?name=${name}`
            }),
            keepUnusedDataFor: 5
        }),
    }),
});

export const { useGetCategoriesQuery,useGetCategoryDetailsQuery, useCreateCategoryMutation,useSearchCategoriesByNameQuery } = itemsApiSlice; 