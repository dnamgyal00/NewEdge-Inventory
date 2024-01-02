import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


import { BASE_URL } from '../constant';

const baseQuery =fetchBaseQuery({ BASE_URL});
export const apiSlice = createApi({ 
    baseQuery,
    tagTypes: ['Category', 'Item'],
    endpoints: (builder) => ({}),
});
