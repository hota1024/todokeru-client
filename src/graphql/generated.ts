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
  DateTime: string;
};

export type CreateEmailAccountDto = {
  host: Scalars['String'];
  isPrimary: Scalars['Boolean'];
  password: Scalars['String'];
  port: Scalars['String'];
  secure: Scalars['Boolean'];
  user: Scalars['String'];
};

export type CreateOtcDto = {
  address: Scalars['String'];
};

export type CreateOtcResultDto = {
  codeExpiresIn: Scalars['DateTime'];
  codeId: Scalars['String'];
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

export type LoginResult = {
  jwt: Scalars['String'];
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
  createOtc: CreateOtcResultDto;
  createTempEmail: CreateOtcResultDto;
  createTempUser: User;
  deleteMailAccount: Scalars['Boolean'];
  endRegisterReception: RegisterationStatus;
  startRegisterReception: RegisterationStatus;
  updateMailAccount: MailAccount;
  validateEmailAuthCode: LoginResult;
  validateRegisterationToken: Scalars['Boolean'];
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


export type MutationCreateOtcArgs = {
  data: CreateOtcDto;
};


export type MutationCreateTempEmailArgs = {
  data: CreateTempEmailDto;
};


export type MutationDeleteMailAccountArgs = {
  id: Scalars['String'];
};


export type MutationStartRegisterReceptionArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateMailAccountArgs = {
  data: UpdateEmailAccountDto;
  id: Scalars['String'];
};


export type MutationValidateEmailAuthCodeArgs = {
  data: ValidateEmailAuthCodeDto;
};


export type MutationValidateRegisterationTokenArgs = {
  token: Scalars['String'];
};

export type Query = {
  hasAdmin: Scalars['Boolean'];
  hasPrimaryMailAccount: Scalars['Boolean'];
  isRegisterationReceptable: Scalars['Boolean'];
  mailAccount: MailAccount;
  mailAccounts: Array<MailAccount>;
  me: User;
  registerationStatus: RegisterationStatus;
  users: Array<User>;
};


export type QueryMailAccountArgs = {
  id: Scalars['String'];
};

export type RegisterationStatus = {
  isReceptable: Scalars['Boolean'];
  receptionStartedAt?: Maybe<Scalars['DateTime']>;
  registeredEmails?: Maybe<Scalars['Float']>;
  registeredStudents?: Maybe<Scalars['Float']>;
  token?: Maybe<Scalars['String']>;
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
  codeId: Scalars['String'];
};

export type CheckTempUserAliveMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type CheckTempUserAliveMutation = { checkTempUserAlive: boolean };

export type CreateMailAccountMutationVariables = Exact<{
  data: CreateEmailAccountDto;
}>;


export type CreateMailAccountMutation = { createMailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean } };

export type CreateOtcMutationVariables = Exact<{
  data: CreateOtcDto;
}>;


export type CreateOtcMutation = { createOtc: { codeId: string, codeExpiresIn: string } };

export type CreateTempEmailMutationVariables = Exact<{
  data: CreateTempEmailDto;
}>;


export type CreateTempEmailMutation = { createTempEmail: { codeId: string, codeExpiresIn: string } };

export type CreateTempUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTempUserMutation = { createTempUser: { id: string, role: UserRole, createdAt: string, updatedAt: string, emails: Array<{ address: string, lastConfirmedAt: string, updatedAt: string, createdAt: string }> } };

export type EndRegisterReceptionMutationVariables = Exact<{ [key: string]: never; }>;


export type EndRegisterReceptionMutation = { endRegisterReception: { token?: string | null } };

export type CreateFirstPrimaryMailAccountMutationVariables = Exact<{
  data: CreateEmailAccountDto;
}>;


export type CreateFirstPrimaryMailAccountMutation = { createFirstPrimaryMailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, role: UserRole } };

export type StartRegisterReceptionMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
}>;


export type StartRegisterReceptionMutation = { startRegisterReception: { token?: string | null } };

export type UpdateMailAccountMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateEmailAccountDto;
}>;


export type UpdateMailAccountMutation = { updateMailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean } };

export type ValidateEmailAuthCodeMutationVariables = Exact<{
  data: ValidateEmailAuthCodeDto;
}>;


export type ValidateEmailAuthCodeMutation = { validateEmailAuthCode: { jwt: string } };

export type ValidateRegisterationTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateRegisterationTokenMutation = { validateRegisterationToken: boolean };

export type IsRegisterationReceptableQueryVariables = Exact<{ [key: string]: never; }>;


export type IsRegisterationReceptableQuery = { isRegisterationReceptable: boolean };

export type MailAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MailAccountsQuery = { mailAccounts: Array<{ id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean, updatedAt: string, createdAt: string }> };

export type MailAccountQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MailAccountQuery = { mailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean, updatedAt: string, createdAt: string } };

export type HasPrimaryMailAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type HasPrimaryMailAccountQuery = { hasPrimaryMailAccount: boolean };

export type RegisterationStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type RegisterationStatusQuery = { registerationStatus: { isReceptable: boolean, token?: string | null, receptionStartedAt?: string | null, registeredStudents?: number | null, registeredEmails?: number | null } };

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
export const CreateMailAccountDocument = gql`
    mutation createMailAccount($data: CreateEmailAccountDto!) {
  createMailAccount(data: $data) {
    id
    host
    port
    secure
    user
    isPrimary
  }
}
    `;
export type CreateMailAccountMutationFn = Apollo.MutationFunction<CreateMailAccountMutation, CreateMailAccountMutationVariables>;

/**
 * __useCreateMailAccountMutation__
 *
 * To run a mutation, you first call `useCreateMailAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMailAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMailAccountMutation, { data, loading, error }] = useCreateMailAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMailAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateMailAccountMutation, CreateMailAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMailAccountMutation, CreateMailAccountMutationVariables>(CreateMailAccountDocument, options);
      }
export type CreateMailAccountMutationHookResult = ReturnType<typeof useCreateMailAccountMutation>;
export type CreateMailAccountMutationResult = Apollo.MutationResult<CreateMailAccountMutation>;
export type CreateMailAccountMutationOptions = Apollo.BaseMutationOptions<CreateMailAccountMutation, CreateMailAccountMutationVariables>;
export const CreateOtcDocument = gql`
    mutation createOtc($data: CreateOtcDto!) {
  createOtc(data: $data) {
    codeId
    codeExpiresIn
  }
}
    `;
export type CreateOtcMutationFn = Apollo.MutationFunction<CreateOtcMutation, CreateOtcMutationVariables>;

/**
 * __useCreateOtcMutation__
 *
 * To run a mutation, you first call `useCreateOtcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOtcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOtcMutation, { data, loading, error }] = useCreateOtcMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOtcMutation(baseOptions?: Apollo.MutationHookOptions<CreateOtcMutation, CreateOtcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOtcMutation, CreateOtcMutationVariables>(CreateOtcDocument, options);
      }
export type CreateOtcMutationHookResult = ReturnType<typeof useCreateOtcMutation>;
export type CreateOtcMutationResult = Apollo.MutationResult<CreateOtcMutation>;
export type CreateOtcMutationOptions = Apollo.BaseMutationOptions<CreateOtcMutation, CreateOtcMutationVariables>;
export const CreateTempEmailDocument = gql`
    mutation createTempEmail($data: CreateTempEmailDto!) {
  createTempEmail(data: $data) {
    codeId
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
export const EndRegisterReceptionDocument = gql`
    mutation endRegisterReception {
  endRegisterReception {
    token
  }
}
    `;
export type EndRegisterReceptionMutationFn = Apollo.MutationFunction<EndRegisterReceptionMutation, EndRegisterReceptionMutationVariables>;

/**
 * __useEndRegisterReceptionMutation__
 *
 * To run a mutation, you first call `useEndRegisterReceptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndRegisterReceptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endRegisterReceptionMutation, { data, loading, error }] = useEndRegisterReceptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useEndRegisterReceptionMutation(baseOptions?: Apollo.MutationHookOptions<EndRegisterReceptionMutation, EndRegisterReceptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndRegisterReceptionMutation, EndRegisterReceptionMutationVariables>(EndRegisterReceptionDocument, options);
      }
export type EndRegisterReceptionMutationHookResult = ReturnType<typeof useEndRegisterReceptionMutation>;
export type EndRegisterReceptionMutationResult = Apollo.MutationResult<EndRegisterReceptionMutation>;
export type EndRegisterReceptionMutationOptions = Apollo.BaseMutationOptions<EndRegisterReceptionMutation, EndRegisterReceptionMutationVariables>;
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
export const MeDocument = gql`
    query me {
  me {
    id
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const StartRegisterReceptionDocument = gql`
    mutation startRegisterReception($token: String) {
  startRegisterReception(token: $token) {
    token
  }
}
    `;
export type StartRegisterReceptionMutationFn = Apollo.MutationFunction<StartRegisterReceptionMutation, StartRegisterReceptionMutationVariables>;

/**
 * __useStartRegisterReceptionMutation__
 *
 * To run a mutation, you first call `useStartRegisterReceptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartRegisterReceptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startRegisterReceptionMutation, { data, loading, error }] = useStartRegisterReceptionMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useStartRegisterReceptionMutation(baseOptions?: Apollo.MutationHookOptions<StartRegisterReceptionMutation, StartRegisterReceptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartRegisterReceptionMutation, StartRegisterReceptionMutationVariables>(StartRegisterReceptionDocument, options);
      }
export type StartRegisterReceptionMutationHookResult = ReturnType<typeof useStartRegisterReceptionMutation>;
export type StartRegisterReceptionMutationResult = Apollo.MutationResult<StartRegisterReceptionMutation>;
export type StartRegisterReceptionMutationOptions = Apollo.BaseMutationOptions<StartRegisterReceptionMutation, StartRegisterReceptionMutationVariables>;
export const UpdateMailAccountDocument = gql`
    mutation updateMailAccount($id: String!, $data: UpdateEmailAccountDto!) {
  updateMailAccount(id: $id, data: $data) {
    id
    host
    port
    secure
    user
    isPrimary
  }
}
    `;
export type UpdateMailAccountMutationFn = Apollo.MutationFunction<UpdateMailAccountMutation, UpdateMailAccountMutationVariables>;

/**
 * __useUpdateMailAccountMutation__
 *
 * To run a mutation, you first call `useUpdateMailAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMailAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMailAccountMutation, { data, loading, error }] = useUpdateMailAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMailAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMailAccountMutation, UpdateMailAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMailAccountMutation, UpdateMailAccountMutationVariables>(UpdateMailAccountDocument, options);
      }
export type UpdateMailAccountMutationHookResult = ReturnType<typeof useUpdateMailAccountMutation>;
export type UpdateMailAccountMutationResult = Apollo.MutationResult<UpdateMailAccountMutation>;
export type UpdateMailAccountMutationOptions = Apollo.BaseMutationOptions<UpdateMailAccountMutation, UpdateMailAccountMutationVariables>;
export const ValidateEmailAuthCodeDocument = gql`
    mutation validateEmailAuthCode($data: ValidateEmailAuthCodeDto!) {
  validateEmailAuthCode(data: $data) {
    jwt
  }
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
export const ValidateRegisterationTokenDocument = gql`
    mutation validateRegisterationToken($token: String!) {
  validateRegisterationToken(token: $token)
}
    `;
export type ValidateRegisterationTokenMutationFn = Apollo.MutationFunction<ValidateRegisterationTokenMutation, ValidateRegisterationTokenMutationVariables>;

/**
 * __useValidateRegisterationTokenMutation__
 *
 * To run a mutation, you first call `useValidateRegisterationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateRegisterationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateRegisterationTokenMutation, { data, loading, error }] = useValidateRegisterationTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateRegisterationTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidateRegisterationTokenMutation, ValidateRegisterationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateRegisterationTokenMutation, ValidateRegisterationTokenMutationVariables>(ValidateRegisterationTokenDocument, options);
      }
export type ValidateRegisterationTokenMutationHookResult = ReturnType<typeof useValidateRegisterationTokenMutation>;
export type ValidateRegisterationTokenMutationResult = Apollo.MutationResult<ValidateRegisterationTokenMutation>;
export type ValidateRegisterationTokenMutationOptions = Apollo.BaseMutationOptions<ValidateRegisterationTokenMutation, ValidateRegisterationTokenMutationVariables>;
export const IsRegisterationReceptableDocument = gql`
    query isRegisterationReceptable {
  isRegisterationReceptable
}
    `;

/**
 * __useIsRegisterationReceptableQuery__
 *
 * To run a query within a React component, call `useIsRegisterationReceptableQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsRegisterationReceptableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsRegisterationReceptableQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsRegisterationReceptableQuery(baseOptions?: Apollo.QueryHookOptions<IsRegisterationReceptableQuery, IsRegisterationReceptableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsRegisterationReceptableQuery, IsRegisterationReceptableQueryVariables>(IsRegisterationReceptableDocument, options);
      }
export function useIsRegisterationReceptableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsRegisterationReceptableQuery, IsRegisterationReceptableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsRegisterationReceptableQuery, IsRegisterationReceptableQueryVariables>(IsRegisterationReceptableDocument, options);
        }
export type IsRegisterationReceptableQueryHookResult = ReturnType<typeof useIsRegisterationReceptableQuery>;
export type IsRegisterationReceptableLazyQueryHookResult = ReturnType<typeof useIsRegisterationReceptableLazyQuery>;
export type IsRegisterationReceptableQueryResult = Apollo.QueryResult<IsRegisterationReceptableQuery, IsRegisterationReceptableQueryVariables>;
export const MailAccountsDocument = gql`
    query mailAccounts {
  mailAccounts {
    id
    host
    port
    secure
    user
    isPrimary
    updatedAt
    createdAt
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
export const MailAccountDocument = gql`
    query mailAccount($id: String!) {
  mailAccount(id: $id) {
    id
    host
    port
    secure
    user
    isPrimary
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useMailAccountQuery__
 *
 * To run a query within a React component, call `useMailAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailAccountQuery(baseOptions: Apollo.QueryHookOptions<MailAccountQuery, MailAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailAccountQuery, MailAccountQueryVariables>(MailAccountDocument, options);
      }
export function useMailAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailAccountQuery, MailAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailAccountQuery, MailAccountQueryVariables>(MailAccountDocument, options);
        }
export type MailAccountQueryHookResult = ReturnType<typeof useMailAccountQuery>;
export type MailAccountLazyQueryHookResult = ReturnType<typeof useMailAccountLazyQuery>;
export type MailAccountQueryResult = Apollo.QueryResult<MailAccountQuery, MailAccountQueryVariables>;
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
export const RegisterationStatusDocument = gql`
    query registerationStatus {
  registerationStatus {
    isReceptable
    token
    receptionStartedAt
    registeredStudents
    registeredEmails
  }
}
    `;

/**
 * __useRegisterationStatusQuery__
 *
 * To run a query within a React component, call `useRegisterationStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegisterationStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegisterationStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useRegisterationStatusQuery(baseOptions?: Apollo.QueryHookOptions<RegisterationStatusQuery, RegisterationStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RegisterationStatusQuery, RegisterationStatusQueryVariables>(RegisterationStatusDocument, options);
      }
export function useRegisterationStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RegisterationStatusQuery, RegisterationStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RegisterationStatusQuery, RegisterationStatusQueryVariables>(RegisterationStatusDocument, options);
        }
export type RegisterationStatusQueryHookResult = ReturnType<typeof useRegisterationStatusQuery>;
export type RegisterationStatusLazyQueryHookResult = ReturnType<typeof useRegisterationStatusLazyQuery>;
export type RegisterationStatusQueryResult = Apollo.QueryResult<RegisterationStatusQuery, RegisterationStatusQueryVariables>;
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