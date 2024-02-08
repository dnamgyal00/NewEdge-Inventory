import { REPORT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getReport : builder.query({
            query:({filters,page})=>({
                url:`${REPORT_URL}?year=${filters.year}&category=${filters.category}&page=${page}`
            }),
            keepUnusedDataFor: 5,
        })
    }),
});

export const {useGetReportQuery} = reportApiSlice;