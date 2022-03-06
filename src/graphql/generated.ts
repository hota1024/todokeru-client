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

export type CreateTempEmailDto = {
  address: Scalars['String'];
  userId: Scalars['String'];
};

export type Email = {
  address: Scalars['String'];
  codeExpiresIn?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lastConfirmedAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
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
  checkTempUserAlive: Scalars['Boolean'];
  createFirstPrimaryMailAccount: MailAccount;
  createMailAccount: MailAccount;
  createTempEmail: Email;
  createTempUser: User;
  deleteMailAccount: Scalars['Boolean'];
  updateMailAccount: MailAccount;
  validateEmailAuthCode: Scalars['Boolean'];
};


export type MutationCheckTempUserAliveArgs = {
  id: Scalars['String'];
};


export type MutationCreateFirstPrimaryMailAccountArgs = {
  data: CreateEmailAccountDto;
};


export type MutationCreateMailAccountArgs = {
  data: CreateEmailAccountDto;
};


export type MutationCreateTempEmailArgs = {
  data: CreateTempEmailDto;
};


export type MutationDeleteMailAccountArgs = {
  id: Scalars['String'];
};


export type MutationUpdateMailAccountArgs = {
  data: UpdateEmailAccountDto;
  id: Scalars['String'];
};


export type MutationValidateEmailAuthCodeArgs = {
  data: ValidateEmailAuthCodeDto;
};

export type Query = {
  hasAdmin: Scalars['Boolean'];
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
  role: UserRole;
  updatedAt: Scalars['DateTime'];
};

export enum UserRole {
  Admin = 'Admin',
  Normal = 'Normal',
  Temp = 'Temp'
}

export type ValidateEmailAuthCodeDto = {
  code: Scalars['String'];
  id: Scalars['String'];
};

export type CheckTempUserAliveMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type CheckTempUserAliveMutation = { checkTempUserAlive: boolean };

export type CreateTempEmailMutationVariables = Exact<{
  data: CreateTempEmailDto;
}>;


export type CreateTempEmailMutation = { createTempEmail: { id: string, codeExpiresIn?: any | null | undefined } };

export type CreateTempUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTempUserMutation = { createTempUser: { id: string, role: UserRole, createdAt: any, updatedAt: any, emails: Array<{ address: string, lastConfirmedAt: any, updatedAt: any, createdAt: any }> } };

export type CreateFirstPrimaryMailAccountMutationVariables = Exact<{
  data: CreateEmailAccountDto;
}>;


export type CreateFirstPrimaryMailAccountMutation = { createFirstPrimaryMailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean } };

export type ValidateEmailAuthCodeMutationVariables = Exact<{
  data: ValidateEmailAuthCodeDto;
}>;


export type ValidateEmailAuthCodeMutation = { validateEmailAuthCode: boolean };

export type MailAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MailAccountsQuery = { mailAccounts: Array<{ id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean }> };

export type HasPrimaryMailAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type HasPrimaryMailAccountQuery = { hasPrimaryMailAccount: boolean };

export type HasAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type HasAdminQuery = { hasAdmin: boolean };


export const CheckTempUserAliveDocument = gql`
    mutation checkTempUserAlive($id: String!) {
  checkTempUserAlive(id: $id)
}
    `;
export type CheckTempUserAliveMutationFn = Apollo.MutationFunction<CheckTempUserAliveMutation, CheckTempUserAliveMutationVariables>;

/**
 * __useCheckTempUserAliveMutation__
 *
 * To run a mutation, you first call `useCheckTempUserAliveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckTempUserAliveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkTempUserAliveMutation, { data, loading, error }] = useCheckTempUserAliveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckTempUserAliveMutation(baseOptions?: Apollo.MutationHookOptions<CheckTempUserAliveMutation, CheckTempUserAliveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckTempUserAliveMutation, CheckTempUserAliveMutationVariables>(CheckTempUserAliveDocument, options);
      }
export type CheckTempUserAliveMutationHookResult = ReturnType<typeof useCheckTempUserAliveMutation>;
export type CheckTempUserAliveMutationResult = Apollo.MutationResult<CheckTempUserAliveMutation>;
export type CheckTempUserAliveMutationOptions = Apollo.BaseMutationOptions<CheckTempUserAliveMutation, CheckTempUserAliveMutationVariables>;
export const CreateTempEmailDocument = gql`
    mutation createTempEmail($data: CreateTempEmailDto!) {
  createTempEmail(data: $data) {
    id
    codeExpiresIn
  }
}
    `;
export type CreateTempEmailMutationFn = Apollo.MutationFunction<CreateTempEmailMutation, CreateTempEmailMutationVariables>;

/**
 * __useCreateTempEmailMutation__
 *
 * To run a mutation, you first call `useCreateTempEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTempEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTempEmailMutation, { data, loading, error }] = useCreateTempEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTempEmailMutation(baseOptions?: Apollo.MutationHookOptions<CreateTempEmailMutation, CreateTempEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTempEmailMutation, CreateTempEmailMutationVariables>(CreateTempEmailDocument, options);
      }
export type CreateTempEmailMutationHookResult = ReturnType<typeof useCreateTempEmailMutation>;
export type CreateTempEmailMutationResult = Apollo.MutationResult<CreateTempEmailMutation>;
export type CreateTempEmailMutationOptions = Apollo.BaseMutationOptions<CreateTempEmailMutation, CreateTempEmailMutationVariables>;
export const CreateTempUserDocument = gql`
    mutation createTempUser {
  createTempUser {
    id
    emails {
      address
      lastConfirmedAt
      updatedAt
      createdAt
    }
    role
    createdAt
    updatedAt
  }
}
    `;
export type CreateTempUserMutationFn = Apollo.MutationFunction<CreateTempUserMutation, CreateTempUserMutationVariables>;

/**
 * __useCreateTempUserMutation__
 *
 * To run a mutation, you first call `useCreateTempUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTempUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTempUserMutation, { data, loading, error }] = useCreateTempUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateTempUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateTempUserMutation, CreateTempUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTempUserMutation, CreateTempUserMutationVariables>(CreateTempUserDocument, options);
      }
export type CreateTempUserMutationHookResult = ReturnType<typeof useCreateTempUserMutation>;
export type CreateTempUserMutationResult = Apollo.MutationResult<CreateTempUserMutation>;
export type CreateTempUserMutationOptions = Apollo.BaseMutationOptions<CreateTempUserMutation, CreateTempUserMutationVariables>;
export const CreateFirstPrimaryMailAccountDocument = gql`
    mutation createFirstPrimaryMailAccount($data: CreateEmailAccountDto!) {
  createFirstPrimaryMailAccount(data: $data) {
    id
    host
    port
    secure
    user
    isPrimary
  }
}
    `;
export type CreateFirstPrimaryMailAccountMutationFn = Apollo.MutationFunction<CreateFirstPrimaryMailAccountMutation, CreateFirstPrimaryMailAccountMutationVariables>;

/**
 * __useCreateFirstPrimaryMailAccountMutation__
 *
 * To run a mutation, you first call `useCreateFirstPrimaryMailAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFirstPrimaryMailAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFirstPrimaryMailAccountMutation, { data, loading, error }] = useCreateFirstPrimaryMailAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFirstPrimaryMailAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateFirstPrimaryMailAccountMutation, CreateFirstPrimaryMailAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFirstPrimaryMailAccountMutation, CreateFirstPrimaryMailAccountMutationVariables>(CreateFirstPrimaryMailAccountDocument, options);
      }
export type CreateFirstPrimaryMailAccountMutationHookResult = ReturnType<typeof useCreateFirstPrimaryMailAccountMutation>;
export type CreateFirstPrimaryMailAccountMutationResult = Apollo.MutationResult<CreateFirstPrimaryMailAccountMutation>;
export type CreateFirstPrimaryMailAccountMutationOptions = Apollo.BaseMutationOptions<CreateFirstPrimaryMailAccountMutation, CreateFirstPrimaryMailAccountMutationVariables>;
export const ValidateEmailAuthCodeDocument = gql`
    mutation validateEmailAuthCode($data: ValidateEmailAuthCodeDto!) {
  validateEmailAuthCode(data: $data)
}
    `;
export type ValidateEmailAuthCodeMutationFn = Apollo.MutationFunction<ValidateEmailAuthCodeMutation, ValidateEmailAuthCodeMutationVariables>;

/**
 * __useValidateEmailAuthCodeMutation__
 *
 * To run a mutation, you first call `useValidateEmailAuthCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateEmailAuthCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateEmailAuthCodeMutation, { data, loading, error }] = useValidateEmailAuthCodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useValidateEmailAuthCodeMutation(baseOptions?: Apollo.MutationHookOptions<ValidateEmailAuthCodeMutation, ValidateEmailAuthCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateEmailAuthCodeMutation, ValidateEmailAuthCodeMutationVariables>(ValidateEmailAuthCodeDocument, options);
      }
export type ValidateEmailAuthCodeMutationHookResult = ReturnType<typeof useValidateEmailAuthCodeMutation>;
export type ValidateEmailAuthCodeMutationResult = Apollo.MutationResult<ValidateEmailAuthCodeMutation>;
export type ValidateEmailAuthCodeMutationOptions = Apollo.BaseMutationOptions<ValidateEmailAuthCodeMutation, ValidateEmailAuthCodeMutationVariables>;
export const MailAccountsDocument = gql`
    query mailAccounts {
  mailAccounts {
    id
    host
    port
    secure
    user
    isPrimary
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
export const HasPrimaryMailAccountDocument = gql`
    query hasPrimaryMailAccount {
  hasPrimaryMailAccount
}
    `;

/**
 * __useHasPrimaryMailAccountQuery__
 *
 * To run a query within a React component, call `useHasPrimaryMailAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasPrimaryMailAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasPrimaryMailAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasPrimaryMailAccountQuery(baseOptions?: Apollo.QueryHookOptions<HasPrimaryMailAccountQuery, HasPrimaryMailAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasPrimaryMailAccountQuery, HasPrimaryMailAccountQueryVariables>(HasPrimaryMailAccountDocument, options);
      }
export function useHasPrimaryMailAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasPrimaryMailAccountQuery, HasPrimaryMailAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasPrimaryMailAccountQuery, HasPrimaryMailAccountQueryVariables>(HasPrimaryMailAccountDocument, options);
        }
export type HasPrimaryMailAccountQueryHookResult = ReturnType<typeof useHasPrimaryMailAccountQuery>;
export type HasPrimaryMailAccountLazyQueryHookResult = ReturnType<typeof useHasPrimaryMailAccountLazyQuery>;
export type HasPrimaryMailAccountQueryResult = Apollo.QueryResult<HasPrimaryMailAccountQuery, HasPrimaryMailAccountQueryVariables>;
export const HasAdminDocument = gql`
    query hasAdmin {
  hasAdmin
}
    `;

/**
 * __useHasAdminQuery__
 *
 * To run a query within a React component, call `useHasAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasAdminQuery(baseOptions?: Apollo.QueryHookOptions<HasAdminQuery, HasAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasAdminQuery, HasAdminQueryVariables>(HasAdminDocument, options);
      }
export function useHasAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasAdminQuery, HasAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasAdminQuery, HasAdminQueryVariables>(HasAdminDocument, options);
        }
export type HasAdminQueryHookResult = ReturnType<typeof useHasAdminQuery>;
export type HasAdminLazyQueryHookResult = ReturnType<typeof useHasAdminLazyQuery>;
export type HasAdminQueryResult = Apollo.QueryResult<HasAdminQuery, HasAdminQueryVariables>;