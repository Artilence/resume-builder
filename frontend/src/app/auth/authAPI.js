import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query setup with credentials (cookies)
const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include', // Important for sending cookies
});

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchUser: builder.query({
      query: () => '/me/',
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/refresh/',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchUserQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authAPI;
