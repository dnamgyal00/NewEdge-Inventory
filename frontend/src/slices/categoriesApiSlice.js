import { CATEGORY_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({currentPage,filters}) => ({
        url: 
        `${CATEGORY_URL}?page=${currentPage}&nameOrder=${filters.order}&itemOrderCount=${filters.item_count}`
      }),
      keepUnusedDataFor: 5,
    }),

    getCategoriesOnly: builder.query({
      query: () => ({
        url: CATEGORY_URL
      }),
      keepUnusedDataFor: 5,
    }),

    getCategoryDetails: builder.query({
      query: ({ categoryId, currentPage }) => ({
        url: `${CATEGORY_URL}/${categoryId}?page=${currentPage}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, formDataObj }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: formDataObj,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    searchCategoriesByName: builder.query({
      query: (name) => ({
        url: `${CATEGORY_URL}/search?name=${name}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesOnlyQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useSearchCategoriesByNameQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = itemsApiSlice;
