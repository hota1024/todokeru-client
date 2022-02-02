import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateEmailAccountDto = {
  host: Scalars['String'];
  isPrimary: Scalars['Boolean'];
  password: Scalars['String'];
  port: Scalars['String'];
  secure: Scalars['Boolean'];
  user: Scalars['String'];
};

export type Email = {
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lastConfirmedAt: Scalars['DateTime'];
  otc?: Maybe<Otc>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type MailAccount = {
  createdAt: Scalars['DateTime'];
  host: Scalars['String'];
  id: Scalars['ID'];
  isPrimary: Scalars['Boolean'];
  port: Scalars['String'];
  secure: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
};

export type Mutation = {
  createFirstPrimaryAccount: MailAccount;
  createMailAccount: MailAccount;
  deleteMailAccount: Scalars['Boolean'];
  updateMailAccount: MailAccount;
};


export type MutationCreateFirstPrimaryAccountArgs = {
  data: CreateEmailAccountDto;
};


export type MutationCreateMailAccountArgs = {
  data: CreateEmailAccountDto;
};


export type MutationDeleteMailAccountArgs = {
  id: Scalars['String'];
};


export type MutationUpdateMailAccountArgs = {
  data: UpdateEmailAccountDto;
  id: Scalars['String'];
};

export type Otc = {
  codeHash: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email?: Maybe<Email>;
  expiresIn: Scalars['DateTime'];
  id: Scalars['ID'];
  updateAt: Scalars['DateTime'];
};

export type Query = {
  hasPrimaryMailAccount: Scalars['Boolean'];
  mailAccount: MailAccount;
  mailAccounts: Array<MailAccount>;
  users: Array<User>;
};


export type QueryMailAccountArgs = {
  id: Scalars['String'];
};

export type UpdateEmailAccountDto = {
  host?: InputMaybe<Scalars['String']>;
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['String']>;
  secure?: InputMaybe<Scalars['Boolean']>;
  user?: InputMaybe<Scalars['String']>;
};

export type User = {
  createdAt: Scalars['DateTime'];
  emails: Array<Email>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type MailAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MailAccountsQuery = { mailAccounts: Array<{ id: string }> };


export const MailAccountsDocument = gql`
    query mailAccounts {
  mailAccounts {
    id
  }
}
    `;

/**
 * __useMailAccountsQuery__
 *
 * To run a query within a React component, call `useMailAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMailAccountsQuery(baseOptions?: Apollo.QueryHookOptions<MailAccountsQuery, MailAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailAccountsQuery, MailAccountsQueryVariables>(MailAccountsDocument, options);
      }
export function useMailAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailAccountsQuery, MailAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailAccountsQuery, MailAccountsQueryVariables>(MailAccountsDocument, options);
        }
export type MailAccountsQueryHookResult = ReturnType<typeof useMailAccountsQuery>;
export type MailAccountsLazyQueryHookResult = ReturnType<typeof useMailAccountsLazyQuery>;
export type MailAccountsQueryResult = Apollo.QueryResult<MailAccountsQuery, MailAccountsQueryVariables>;