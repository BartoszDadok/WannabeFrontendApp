import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { FlashcardsApi } from "../../types/flashcards";
import { apiEndpoint } from "../apiEndpoint";

import {
  ResetPasswordResponse,
  CustomError,
  ResendTokenResponse,
  CreateUserResponse,
  CreateUserQuery,
  LoginResponse,
  LoginQuery,
  ContactResponse,
  ContactQuery,
  ResetPasswordQuery,
  DeleteAccountResponse,
  DeleteAccountQuery,
  ResendTokenQuery,
} from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndpoint,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).dataUser.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getFlashcards: builder.query<FlashcardsApi, string>({
      query: (lanugageName) => ({
        url: `/${lanugageName}`,
      }),
    }),
    newVeryficationToken: builder.query<ResendTokenResponse, ResendTokenQuery>({
      query: (token) => ({
        url: `/resend-verification-link/${token}`,
      }),
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserQuery>({
      query: (user) => ({
        url: "/create-user",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginQuery>({
      query: (user) => ({
        url: "/sign-in",
        method: "POST",
        body: user,
      }),
    }),
    sendMessage: builder.mutation<ContactResponse, ContactQuery>({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordQuery>({
      query: (email) => ({
        url: "/reset-password",
        method: "POST",
        body: email,
      }),
    }),
    deleteAccount: builder.mutation<DeleteAccountResponse, DeleteAccountQuery>({
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
