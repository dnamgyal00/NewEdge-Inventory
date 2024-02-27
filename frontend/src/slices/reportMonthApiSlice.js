import { REPORT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const reportMonthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateMonthReport: builder.mutation({
      query: ({ form,year,month }) => ({
        url: `${REPORT_URL}/monthly/generate?year=${year}&month=${month}`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["ReportMonth"],
    }),

    getMonthReport: builder.query({
      query: ({ filters, page }) => ({
        url: `${REPORT_URL}/monthly?year=${filters.year}&month=${filters.month}&category=${filters.category}&page=${page}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getMonthReportExcelData: builder.mutation({
      query: (filters) => ({
        url: `${REPORT_URL}/monthly/excel?year=${filters.year}&month=${filters.month}&category=${filters.category}`,
        method: "POST",
        body: filters,
      }),
      keepUnusedDataFor: 5,
    }),

    getPastYear: builder.query({
      query: () => ({
        url: `${REPORT_URL}/monthly/pastYear`,
      }),
      keepUnusedDataFor: 5,
    }),

    getPastMonth: builder.query({
      query: ({year}) => ({
        url: `${REPORT_URL}/monthly/pastMonth?year=${year}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetMonthReportQuery,
  useGetMonthReportExcelDataMutation,
  useGetPastYearQuery,
  useGetPastMonthQuery,
  useUpdateMonthReportMutation,
} = reportMonthApiSlice;
