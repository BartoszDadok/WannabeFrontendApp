import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

interface CustomError {
  data: {
    message: string;
    errors: string[];
  };
  status: number;
}

interface FlashCard {
  _id: string;
  flashcard: string[];
}

interface Flashcards {
  data: FlashCard[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wannabe.cyclic.app/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userData.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getFlashcards: builder.query<Flashcards, string>({
      query: (lanugageName) => ({
        url: `/${lanugageName}`,
      }),
      keepUnusedDataFor: 0,
    }),
    newVeryficationToken: builder.query({
      query: (token) => ({
        url: `/resend-verification-link/${token}`,
      }),
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/create-user",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/sign-in",
        method: "POST",
        body: user,
      }),
    }),

    sendMessage: builder.mutation({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/reset-password",
        method: "POST",
        body: email,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: "/delete-account",
        method: "POST",
        body: { id },
      }),
    }),
  }),
});
export const { useLazyNewVeryficationTokenQuery } = api;
export const { useGetFlashcardsQuery } = api;
export const { useCreateUserMutation } = api;
export const { useLoginMutation } = api;
export const { useResetPasswordMutation } = api;
export const { useSendMessageMutation } = api;
export const { useDeleteAccountMutation } = api;
