import { REPORT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateReport: builder.mutation({
        query: ({formDataObj,year}) => ({
          url: `${REPORT_URL}/generate?year=${year}`,
          method: "POST",
          body: formDataObj,
        }),
        invalidatesTags: ["Report"],
      }),

    getReport: builder.query({
      query: ({ filters, page }) => ({
        url: `${REPORT_URL}?year=${filters.year}&category=${filters.category}&page=${page}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getReportExcelData: builder.mutation({
      query: (filters ) => ({
        url: `${REPORT_URL}/excel?year=${filters.year}&category=${filters.category}`,
        method: "POST",
        body: filters,
      }),
      keepUnusedDataFor: 5,
    }),

    getPastYear: builder.query({
    query: () => ({
    url: `${REPORT_URL}/pastYear`,
    }),
    keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetReportQuery,useGetReportExcelDataMutation,useGetPastYearQuery , useUpdateReportMutation} = reportApiSlice;
