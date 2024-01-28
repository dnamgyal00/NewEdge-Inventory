import { ITEM_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ categoryName, currentPage }) => ({
        url:
          categoryName || currentPage
            ? `${ITEM_URL}?categoryName=${categoryName}&page=${currentPage}`
            : ITEM_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getItemDetails: builder.query({
      query: ({ itemId, currentPage }) => ({
        url: `${ITEM_URL}/${itemId}?page=${currentPage}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createItem: builder.mutation({
      query: (formDataObj) => ({
        url: ITEM_URL,
        method: "POST",
        body: formDataObj,
      }),
      invalidatesTags: ["Item"],
    }),

    searchItemByName: builder.query({
      query: (name) => ({
          url: `${ITEM_URL}/search?name=${name}`
      }),
      keepUnusedDataFor: 5
  }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemDetailsQuery,
  useCreateItemMutation,
  useSearchItemByNameQuery,
} = itemsApiSlice;