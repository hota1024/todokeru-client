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
  fromAddress: Scalars['String'];
  host: Scalars['String'];
  isPrimary: Scalars['Boolean'];
  password: Scalars['String'];
  port: Scalars['String'];
  secure: Scalars['Boolean'];
  sendRate: Scalars['Float'];
  user: Scalars['String'];
};

export type CreateGroupDto = {
  isPrivate: Scalars['Boolean'];
  name: Scalars['String'];
};

export type CreateMailDto = {
  body: Scalars['String'];
  groupIds: Array<Scalars['String']>;
  subject: Scalars['String'];
};

export type CreateOtcDto = {
  address: Scalars['String'];
};

export type CreateOtcResultDto = {
  codeExpiresIn: Scalars['DateTime'];
  codeId: Scalars['String'];
};

export type CreateStudentDto = {
  groupId: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
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
  lastConfirmedAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Group = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  mails: Array<Mail>;
  name: Scalars['String'];
  order: Scalars['Float'];
  students: Array<Student>;
  updatedAt: Scalars['DateTime'];
};

export type LoginResult = {
  jwt: Scalars['String'];
  user: User;
};

export type Mail = {
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  groups: Array<Group>;
  id: Scalars['ID'];
  subject: Scalars['String'];
  transports: Array<Transport>;
  udpatedAt: Scalars['DateTime'];
  wasSent: Scalars['Boolean'];
};

export type MailAccount = {
  createdAt: Scalars['DateTime'];
  fromAddress: Scalars['String'];
  host: Scalars['String'];
  id: Scalars['ID'];
  isPrimary: Scalars['Boolean'];
  lastSentAt?: Maybe<Scalars['DateTime']>;
  port: Scalars['String'];
  secure: Scalars['Boolean'];
  sendRate: Scalars['Float'];
  transports: Array<Transport>;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
};

export type Mutation = {
  checkTempUserAlive: Scalars['Boolean'];
  createFirstPrimaryMailAccount: MailAccount;
  createGroup: Group;
  createMail: Mail;
  createMailAccount: MailAccount;
  createOtc: CreateOtcResultDto;
  createStudent: Student;
  createTempEmail: CreateOtcResultDto;
  createTempUser: User;
  deleteGroup: Scalars['Boolean'];
  deleteMail: Scalars['Boolean'];
  deleteMailAccount: Scalars['Boolean'];
  deleteStudent: Scalars['Boolean'];
  deleteUserEmail: Scalars['Boolean'];
  endRegisterReception: RegisterationStatus;
  integrateGroup: Group;
  read: Transport;
  readTransport: Transport;
  resendTransport: Scalars['Boolean'];
  sendMail: Scalars['Boolean'];
  startRegisterReception: RegisterationStatus;
  updateBodyTemplate: Scalars['Boolean'];
  updateGroup: Group;
  updateGroupOrder: Scalars['Boolean'];
  updateMail: Mail;
  updateMailAccount: MailAccount;
  updateOrg: Scalars['Boolean'];
  updateStudent: Student;
  updateSubjectTemplate: Scalars['Boolean'];
  validateEmailAuthCode: LoginResult;
  validateRegisterationToken: Scalars['Boolean'];
};


export type MutationCheckTempUserAliveArgs = {
  id: Scalars['String'];
};


export type MutationCreateFirstPrimaryMailAccountArgs = {
  data: CreateEmailAccountDto;
};


export type MutationCreateGroupArgs = {
  data: CreateGroupDto;
};


export type MutationCreateMailArgs = {
  data: CreateMailDto;
};


export type MutationCreateMailAccountArgs = {
  data: CreateEmailAccountDto;
};


export type MutationCreateOtcArgs = {
  data: CreateOtcDto;
};


export type MutationCreateStudentArgs = {
  data: CreateStudentDto;
};


export type MutationCreateTempEmailArgs = {
  data: CreateTempEmailDto;
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMailArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMailAccountArgs = {
  id: Scalars['String'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserEmailArgs = {
  id: Scalars['String'];
};


export type MutationIntegrateGroupArgs = {
  id: Scalars['String'];
  otherId: Scalars['String'];
};


export type MutationReadArgs = {
  id: Scalars['String'];
};


export type MutationReadTransportArgs = {
  id: Scalars['String'];
};


export type MutationResendTransportArgs = {
  id: Scalars['String'];
};


export type MutationSendMailArgs = {
  id: Scalars['String'];
};


export type MutationStartRegisterReceptionArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateBodyTemplateArgs = {
  template: Scalars['String'];
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupDto;
  id: Scalars['String'];
};


export type MutationUpdateGroupOrderArgs = {
  data: UpdateGroupOrderDto;
  id: Scalars['String'];
};


export type MutationUpdateMailArgs = {
  data: UpdateMailDto;
  id: Scalars['String'];
};


export type MutationUpdateMailAccountArgs = {
  data: UpdateEmailAccountDto;
  id: Scalars['String'];
};


export type MutationUpdateOrgArgs = {
  data: UpdateOrgDto;
};


export type MutationUpdateStudentArgs = {
  data: UpdateStudentDto;
  id: Scalars['String'];
};


export type MutationUpdateSubjectTemplateArgs = {
  template: Scalars['String'];
};


export type MutationValidateEmailAuthCodeArgs = {
  data: ValidateEmailAuthCodeDto;
};


export type MutationValidateRegisterationTokenArgs = {
  token: Scalars['String'];
};

export type Query = {
  bodyTemplate: Scalars['String'];
  group: Group;
  groups: Array<Group>;
  hasAdmin: Scalars['Boolean'];
  hasPrimaryMailAccount: Scalars['Boolean'];
  isRegisterationReceptable: Scalars['Boolean'];
  mail: Mail;
  mailAccount: MailAccount;
  mailAccounts: Array<MailAccount>;
  mails: Array<Mail>;
  me: User;
  orgName: Scalars['String'];
  registerationStatus: RegisterationStatus;
  student: Student;
  students: Array<Student>;
  subjectTemplate: Scalars['String'];
  transport: Transport;
  user: User;
  users: Array<User>;
  usersWithStudents: Array<User>;
  usersWithStudentsByGroup: Array<User>;
};


export type QueryGroupArgs = {
  id: Scalars['String'];
};


export type QueryMailArgs = {
  id: Scalars['String'];
};


export type QueryMailAccountArgs = {
  id: Scalars['String'];
};


export type QueryStudentArgs = {
  id: Scalars['String'];
};


export type QueryTransportArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersWithStudentsByGroupArgs = {
  groupId: Scalars['String'];
};

export type RegisterationStatus = {
  isReceptable: Scalars['Boolean'];
  receptionStartedAt?: Maybe<Scalars['DateTime']>;
  registeredEmails?: Maybe<Scalars['Float']>;
  registeredStudents?: Maybe<Scalars['Float']>;
  token?: Maybe<Scalars['String']>;
};

export type Student = {
  group: Group;
  id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
  transports: Array<Transport>;
  user: User;
};

export type Transport = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  mail: Mail;
  mailAccount: MailAccount;
  readAt?: Maybe<Scalars['DateTime']>;
  rejectedReason?: Maybe<Scalars['String']>;
  sendStartedAt?: Maybe<Scalars['DateTime']>;
  sentAt?: Maybe<Scalars['DateTime']>;
  status: TransportStatus;
  students: Array<Student>;
  updatedAt: Scalars['DateTime'];
};

export enum TransportStatus {
  Queued = 'Queued',
  Rejected = 'Rejected',
  Sending = 'Sending',
  Sent = 'Sent'
}

export type UpdateEmailAccountDto = {
  fromAddress?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['String']>;
  secure?: InputMaybe<Scalars['Boolean']>;
  sendRate?: InputMaybe<Scalars['Float']>;
  user?: InputMaybe<Scalars['String']>;
};

export type UpdateGroupDto = {
  isPrivate: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UpdateGroupOrderDto = {
  order: Scalars['Float'];
};

export type UpdateMailDto = {
  body: Scalars['String'];
  groupIds: Array<Scalars['String']>;
  subject: Scalars['String'];
};

export type UpdateOrgDto = {
  orgName?: InputMaybe<Scalars['String']>;
};

export type UpdateStudentDto = {
  groupId: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
};

export type User = {
  createdAt: Scalars['DateTime'];
  emails: Array<Email>;
  id: Scalars['ID'];
  role: UserRole;
  students: Array<Student>;
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


export type CreateTempUserMutation = { createTempUser: { id: string, role: UserRole, createdAt: string, updatedAt: string, emails: Array<{ address: string, lastConfirmedAt?: string | null, updatedAt: string, createdAt: string }> } };

export type DeleteMailAccountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMailAccountMutation = { deleteMailAccount: boolean };

export type DeleteUserEmailMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserEmailMutation = { deleteUserEmail: boolean };

export type EndRegisterReceptionMutationVariables = Exact<{ [key: string]: never; }>;


export type EndRegisterReceptionMutation = { endRegisterReception: { token?: string | null } };

export type CreateGroupMutationVariables = Exact<{
  data: CreateGroupDto;
}>;


export type CreateGroupMutation = { createGroup: { id: string, name: string, createdAt: string, updatedAt: string } };

export type UpdateGroupMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateGroupDto;
}>;


export type UpdateGroupMutation = { updateGroup: { id: string, name: string, createdAt: string, updatedAt: string } };

export type UpdateGroupOrderMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateGroupOrderDto;
}>;


export type UpdateGroupOrderMutation = { updateGroupOrder: boolean };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGroupMutation = { deleteGroup: boolean };

export type IntegrateGroupMutationVariables = Exact<{
  id: Scalars['String'];
  otherId: Scalars['String'];
}>;


export type IntegrateGroupMutation = { integrateGroup: { id: string, name: string, createdAt: string, updatedAt: string } };

export type CreateFirstPrimaryMailAccountMutationVariables = Exact<{
  data: CreateEmailAccountDto;
}>;


export type CreateFirstPrimaryMailAccountMutation = { createFirstPrimaryMailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean, sendRate: number, fromAddress: string } };

export type UpdateMailTemplateMutationVariables = Exact<{
  subject: Scalars['String'];
  body: Scalars['String'];
}>;


export type UpdateMailTemplateMutation = { updateSubjectTemplate: boolean, updateBodyTemplate: boolean };

export type CreateMailMutationVariables = Exact<{
  data: CreateMailDto;
}>;


export type CreateMailMutation = { createMail: { id: string } };

export type UpdateMailMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateMailDto;
}>;


export type UpdateMailMutation = { updateMail: { id: string } };

export type DeleteMailMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMailMutation = { deleteMail: boolean };

export type SendMailMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type SendMailMutation = { sendMail: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, role: UserRole, emails: Array<{ id: string, address: string, lastConfirmedAt?: string | null }>, students: Array<{ id: string, surname: string, name: string, group: { name: string } }> } };

export type UpdateOrgMutationVariables = Exact<{
  data: UpdateOrgDto;
}>;


export type UpdateOrgMutation = { updateOrg: boolean };

export type StartRegisterReceptionMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
}>;


export type StartRegisterReceptionMutation = { startRegisterReception: { token?: string | null } };

export type CreateStudentMutationVariables = Exact<{
  data: CreateStudentDto;
}>;


export type CreateStudentMutation = { createStudent: { id: string } };

export type UpdateStudentMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateStudentDto;
}>;


export type UpdateStudentMutation = { updateStudent: { id: string } };

export type DeleteStudentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteStudentMutation = { deleteStudent: boolean };

export type ReadTransportMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReadTransportMutation = { readTransport: { mail: { subject: string, body: string, groups: Array<{ name: string }> }, students: Array<{ surname: string, name: string }> } };

export type ResendTransportMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ResendTransportMutation = { resendTransport: boolean };

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

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = { groups: Array<{ id: string, name: string, order: number, isPrivate: boolean, students: Array<{ id: string }> }> };

export type GroupQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GroupQuery = { group: { id: string, name: string, createdAt: string, updatedAt: string, order: number, isPrivate: boolean, students: Array<{ id: string, name: string, surname: string }> } };

export type IsRegisterationReceptableQueryVariables = Exact<{ [key: string]: never; }>;


export type IsRegisterationReceptableQuery = { isRegisterationReceptable: boolean };

export type MailAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MailAccountsQuery = { mailAccounts: Array<{ id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean, sendRate: number, fromAddress: string, updatedAt: string, createdAt: string }> };

export type MailAccountQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MailAccountQuery = { mailAccount: { id: string, host: string, port: string, secure: boolean, user: string, isPrimary: boolean, sendRate: number, fromAddress: string, updatedAt: string, createdAt: string } };

export type HasPrimaryMailAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type HasPrimaryMailAccountQuery = { hasPrimaryMailAccount: boolean };

export type MailTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type MailTemplateQuery = { subjectTemplate: string, bodyTemplate: string };

export type MailsQueryVariables = Exact<{ [key: string]: never; }>;


export type MailsQuery = { mails: Array<{ id: string, subject: string, body: string, wasSent: boolean, createdAt: string, groups: Array<{ id: string, name: string }> }> };

export type MailQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MailQuery = { mail: { id: string, subject: string, body: string, wasSent: boolean, createdAt: string, groups: Array<{ id: string, name: string }> } };

export type MailWithTransportsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MailWithTransportsQuery = { mail: { id: string, subject: string, body: string, wasSent: boolean, createdAt: string, groups: Array<{ id: string, name: string }>, transports: Array<{ id: string, status: TransportStatus, sendStartedAt?: string | null, sentAt?: string | null, readAt?: string | null, rejectedReason?: string | null, students: Array<{ id: string, name: string, surname: string, group: { id: string, name: string } }>, mailAccount: { id: string, host: string, user: string } }> } };

export type OrgNameQueryVariables = Exact<{ [key: string]: never; }>;


export type OrgNameQuery = { orgName: string };

export type RegisterationStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type RegisterationStatusQuery = { registerationStatus: { isReceptable: boolean, token?: string | null, receptionStartedAt?: string | null, registeredStudents?: number | null, registeredEmails?: number | null } };

export type StudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsQuery = { students: Array<{ id: string, name: string, surname: string, group: { id: string, name: string }, user: { id: string } }> };

export type StudentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type StudentQuery = { student: { id: string, name: string, surname: string, group: { id: string, name: string }, user: { id: string } } };

export type TransportQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TransportQuery = { transport: { id: string, status: TransportStatus, sendStartedAt?: string | null, sentAt?: string | null, readAt?: string | null, rejectedReason?: string | null, createdAt: string, updatedAt: string, mail: { id: string, subject: string, body: string, groups: Array<{ id: string, name: string }> }, students: Array<{ id: string, name: string, surname: string, user: { id: string }, group: { id: string, name: string } }>, mailAccount: { id: string, host: string, user: string } } };

export type HasAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type HasAdminQuery = { hasAdmin: boolean };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { user: { id: string, emails: Array<{ address: string }>, students: Array<{ id: string, surname: string, name: string, group: { name: string } }> } };

export type UsersWithStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersWithStudentsQuery = { usersWithStudents: Array<{ id: string, emails: Array<{ address: string }>, students: Array<{ id: string, surname: string, name: string, group: { name: string } }> }> };

export type UsersWithStudentsByGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type UsersWithStudentsByGroupQuery = { usersWithStudentsByGroup: Array<{ id: string, emails: Array<{ address: string }>, students: Array<{ id: string, surname: string, name: string, group: { name: string } }> }> };


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
export const DeleteMailAccountDocument = gql`
    mutation deleteMailAccount($id: String!) {
  deleteMailAccount(id: $id)
}
    `;
export type DeleteMailAccountMutationFn = Apollo.MutationFunction<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>;

/**
 * __useDeleteMailAccountMutation__
 *
 * To run a mutation, you first call `useDeleteMailAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMailAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMailAccountMutation, { data, loading, error }] = useDeleteMailAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMailAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>(DeleteMailAccountDocument, options);
      }
export type DeleteMailAccountMutationHookResult = ReturnType<typeof useDeleteMailAccountMutation>;
export type DeleteMailAccountMutationResult = Apollo.MutationResult<DeleteMailAccountMutation>;
export type DeleteMailAccountMutationOptions = Apollo.BaseMutationOptions<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>;
export const DeleteUserEmailDocument = gql`
    mutation deleteUserEmail($id: String!) {
  deleteUserEmail(id: $id)
}
    `;
export type DeleteUserEmailMutationFn = Apollo.MutationFunction<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>;

/**
 * __useDeleteUserEmailMutation__
 *
 * To run a mutation, you first call `useDeleteUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserEmailMutation, { data, loading, error }] = useDeleteUserEmailMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserEmailMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>(DeleteUserEmailDocument, options);
      }
export type DeleteUserEmailMutationHookResult = ReturnType<typeof useDeleteUserEmailMutation>;
export type DeleteUserEmailMutationResult = Apollo.MutationResult<DeleteUserEmailMutation>;
export type DeleteUserEmailMutationOptions = Apollo.BaseMutationOptions<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>;
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
export const CreateGroupDocument = gql`
    mutation createGroup($data: CreateGroupDto!) {
  createGroup(data: $data) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation updateGroup($id: String!, $data: UpdateGroupDto!) {
  updateGroup(id: $id, data: $data) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateGroupOrderDocument = gql`
    mutation updateGroupOrder($id: String!, $data: UpdateGroupOrderDto!) {
  updateGroupOrder(id: $id, data: $data)
}
    `;
export type UpdateGroupOrderMutationFn = Apollo.MutationFunction<UpdateGroupOrderMutation, UpdateGroupOrderMutationVariables>;

/**
 * __useUpdateGroupOrderMutation__
 *
 * To run a mutation, you first call `useUpdateGroupOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupOrderMutation, { data, loading, error }] = useUpdateGroupOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGroupOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupOrderMutation, UpdateGroupOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupOrderMutation, UpdateGroupOrderMutationVariables>(UpdateGroupOrderDocument, options);
      }
export type UpdateGroupOrderMutationHookResult = ReturnType<typeof useUpdateGroupOrderMutation>;
export type UpdateGroupOrderMutationResult = Apollo.MutationResult<UpdateGroupOrderMutation>;
export type UpdateGroupOrderMutationOptions = Apollo.BaseMutationOptions<UpdateGroupOrderMutation, UpdateGroupOrderMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation deleteGroup($id: String!) {
  deleteGroup(id: $id)
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const IntegrateGroupDocument = gql`
    mutation integrateGroup($id: String!, $otherId: String!) {
  integrateGroup(id: $id, otherId: $otherId) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type IntegrateGroupMutationFn = Apollo.MutationFunction<IntegrateGroupMutation, IntegrateGroupMutationVariables>;

/**
 * __useIntegrateGroupMutation__
 *
 * To run a mutation, you first call `useIntegrateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIntegrateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [integrateGroupMutation, { data, loading, error }] = useIntegrateGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      otherId: // value for 'otherId'
 *   },
 * });
 */
export function useIntegrateGroupMutation(baseOptions?: Apollo.MutationHookOptions<IntegrateGroupMutation, IntegrateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IntegrateGroupMutation, IntegrateGroupMutationVariables>(IntegrateGroupDocument, options);
      }
export type IntegrateGroupMutationHookResult = ReturnType<typeof useIntegrateGroupMutation>;
export type IntegrateGroupMutationResult = Apollo.MutationResult<IntegrateGroupMutation>;
export type IntegrateGroupMutationOptions = Apollo.BaseMutationOptions<IntegrateGroupMutation, IntegrateGroupMutationVariables>;
export const CreateFirstPrimaryMailAccountDocument = gql`
    mutation createFirstPrimaryMailAccount($data: CreateEmailAccountDto!) {
  createFirstPrimaryMailAccount(data: $data) {
    id
    host
    port
    secure
    user
    isPrimary
    sendRate
    fromAddress
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
export const UpdateMailTemplateDocument = gql`
    mutation updateMailTemplate($subject: String!, $body: String!) {
  updateSubjectTemplate(template: $subject)
  updateBodyTemplate(template: $body)
}
    `;
export type UpdateMailTemplateMutationFn = Apollo.MutationFunction<UpdateMailTemplateMutation, UpdateMailTemplateMutationVariables>;

/**
 * __useUpdateMailTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateMailTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMailTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMailTemplateMutation, { data, loading, error }] = useUpdateMailTemplateMutation({
 *   variables: {
 *      subject: // value for 'subject'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateMailTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMailTemplateMutation, UpdateMailTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMailTemplateMutation, UpdateMailTemplateMutationVariables>(UpdateMailTemplateDocument, options);
      }
export type UpdateMailTemplateMutationHookResult = ReturnType<typeof useUpdateMailTemplateMutation>;
export type UpdateMailTemplateMutationResult = Apollo.MutationResult<UpdateMailTemplateMutation>;
export type UpdateMailTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateMailTemplateMutation, UpdateMailTemplateMutationVariables>;
export const CreateMailDocument = gql`
    mutation createMail($data: CreateMailDto!) {
  createMail(data: $data) {
    id
  }
}
    `;
export type CreateMailMutationFn = Apollo.MutationFunction<CreateMailMutation, CreateMailMutationVariables>;

/**
 * __useCreateMailMutation__
 *
 * To run a mutation, you first call `useCreateMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMailMutation, { data, loading, error }] = useCreateMailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMailMutation(baseOptions?: Apollo.MutationHookOptions<CreateMailMutation, CreateMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMailMutation, CreateMailMutationVariables>(CreateMailDocument, options);
      }
export type CreateMailMutationHookResult = ReturnType<typeof useCreateMailMutation>;
export type CreateMailMutationResult = Apollo.MutationResult<CreateMailMutation>;
export type CreateMailMutationOptions = Apollo.BaseMutationOptions<CreateMailMutation, CreateMailMutationVariables>;
export const UpdateMailDocument = gql`
    mutation updateMail($id: String!, $data: UpdateMailDto!) {
  updateMail(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateMailMutationFn = Apollo.MutationFunction<UpdateMailMutation, UpdateMailMutationVariables>;

/**
 * __useUpdateMailMutation__
 *
 * To run a mutation, you first call `useUpdateMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMailMutation, { data, loading, error }] = useUpdateMailMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMailMutation, UpdateMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMailMutation, UpdateMailMutationVariables>(UpdateMailDocument, options);
      }
export type UpdateMailMutationHookResult = ReturnType<typeof useUpdateMailMutation>;
export type UpdateMailMutationResult = Apollo.MutationResult<UpdateMailMutation>;
export type UpdateMailMutationOptions = Apollo.BaseMutationOptions<UpdateMailMutation, UpdateMailMutationVariables>;
export const DeleteMailDocument = gql`
    mutation deleteMail($id: String!) {
  deleteMail(id: $id)
}
    `;
export type DeleteMailMutationFn = Apollo.MutationFunction<DeleteMailMutation, DeleteMailMutationVariables>;

/**
 * __useDeleteMailMutation__
 *
 * To run a mutation, you first call `useDeleteMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMailMutation, { data, loading, error }] = useDeleteMailMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMailMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMailMutation, DeleteMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMailMutation, DeleteMailMutationVariables>(DeleteMailDocument, options);
      }
export type DeleteMailMutationHookResult = ReturnType<typeof useDeleteMailMutation>;
export type DeleteMailMutationResult = Apollo.MutationResult<DeleteMailMutation>;
export type DeleteMailMutationOptions = Apollo.BaseMutationOptions<DeleteMailMutation, DeleteMailMutationVariables>;
export const SendMailDocument = gql`
    mutation sendMail($id: String!) {
  sendMail(id: $id)
}
    `;
export type SendMailMutationFn = Apollo.MutationFunction<SendMailMutation, SendMailMutationVariables>;

/**
 * __useSendMailMutation__
 *
 * To run a mutation, you first call `useSendMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMailMutation, { data, loading, error }] = useSendMailMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSendMailMutation(baseOptions?: Apollo.MutationHookOptions<SendMailMutation, SendMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMailMutation, SendMailMutationVariables>(SendMailDocument, options);
      }
export type SendMailMutationHookResult = ReturnType<typeof useSendMailMutation>;
export type SendMailMutationResult = Apollo.MutationResult<SendMailMutation>;
export type SendMailMutationOptions = Apollo.BaseMutationOptions<SendMailMutation, SendMailMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    role
    emails {
      id
      address
      lastConfirmedAt
    }
    students {
      id
      surname
      name
      group {
        name
      }
    }
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
export const UpdateOrgDocument = gql`
    mutation updateOrg($data: UpdateOrgDto!) {
  updateOrg(data: $data)
}
    `;
export type UpdateOrgMutationFn = Apollo.MutationFunction<UpdateOrgMutation, UpdateOrgMutationVariables>;

/**
 * __useUpdateOrgMutation__
 *
 * To run a mutation, you first call `useUpdateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgMutation, { data, loading, error }] = useUpdateOrgMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOrgMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrgMutation, UpdateOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrgMutation, UpdateOrgMutationVariables>(UpdateOrgDocument, options);
      }
export type UpdateOrgMutationHookResult = ReturnType<typeof useUpdateOrgMutation>;
export type UpdateOrgMutationResult = Apollo.MutationResult<UpdateOrgMutation>;
export type UpdateOrgMutationOptions = Apollo.BaseMutationOptions<UpdateOrgMutation, UpdateOrgMutationVariables>;
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
export const CreateStudentDocument = gql`
    mutation createStudent($data: CreateStudentDto!) {
  createStudent(data: $data) {
    id
  }
}
    `;
export type CreateStudentMutationFn = Apollo.MutationFunction<CreateStudentMutation, CreateStudentMutationVariables>;

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStudentMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, options);
      }
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>;
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>;
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<CreateStudentMutation, CreateStudentMutationVariables>;
export const UpdateStudentDocument = gql`
    mutation updateStudent($id: String!, $data: UpdateStudentDto!) {
  updateStudent(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateStudentMutationFn = Apollo.MutationFunction<UpdateStudentMutation, UpdateStudentMutationVariables>;

/**
 * __useUpdateStudentMutation__
 *
 * To run a mutation, you first call `useUpdateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentMutation, { data, loading, error }] = useUpdateStudentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateStudentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentMutation, UpdateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument, options);
      }
export type UpdateStudentMutationHookResult = ReturnType<typeof useUpdateStudentMutation>;
export type UpdateStudentMutationResult = Apollo.MutationResult<UpdateStudentMutation>;
export type UpdateStudentMutationOptions = Apollo.BaseMutationOptions<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const DeleteStudentDocument = gql`
    mutation deleteStudent($id: String!) {
  deleteStudent(id: $id)
}
    `;
export type DeleteStudentMutationFn = Apollo.MutationFunction<DeleteStudentMutation, DeleteStudentMutationVariables>;

/**
 * __useDeleteStudentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentMutation, { data, loading, error }] = useDeleteStudentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStudentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudentMutation, DeleteStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument, options);
      }
export type DeleteStudentMutationHookResult = ReturnType<typeof useDeleteStudentMutation>;
export type DeleteStudentMutationResult = Apollo.MutationResult<DeleteStudentMutation>;
export type DeleteStudentMutationOptions = Apollo.BaseMutationOptions<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const ReadTransportDocument = gql`
    mutation readTransport($id: String!) {
  readTransport(id: $id) {
    mail {
      subject
      body
      groups {
        name
      }
    }
    students {
      surname
      name
    }
  }
}
    `;
export type ReadTransportMutationFn = Apollo.MutationFunction<ReadTransportMutation, ReadTransportMutationVariables>;

/**
 * __useReadTransportMutation__
 *
 * To run a mutation, you first call `useReadTransportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadTransportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readTransportMutation, { data, loading, error }] = useReadTransportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadTransportMutation(baseOptions?: Apollo.MutationHookOptions<ReadTransportMutation, ReadTransportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadTransportMutation, ReadTransportMutationVariables>(ReadTransportDocument, options);
      }
export type ReadTransportMutationHookResult = ReturnType<typeof useReadTransportMutation>;
export type ReadTransportMutationResult = Apollo.MutationResult<ReadTransportMutation>;
export type ReadTransportMutationOptions = Apollo.BaseMutationOptions<ReadTransportMutation, ReadTransportMutationVariables>;
export const ResendTransportDocument = gql`
    mutation resendTransport($id: String!) {
  resendTransport(id: $id)
}
    `;
export type ResendTransportMutationFn = Apollo.MutationFunction<ResendTransportMutation, ResendTransportMutationVariables>;

/**
 * __useResendTransportMutation__
 *
 * To run a mutation, you first call `useResendTransportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendTransportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendTransportMutation, { data, loading, error }] = useResendTransportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResendTransportMutation(baseOptions?: Apollo.MutationHookOptions<ResendTransportMutation, ResendTransportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendTransportMutation, ResendTransportMutationVariables>(ResendTransportDocument, options);
      }
export type ResendTransportMutationHookResult = ReturnType<typeof useResendTransportMutation>;
export type ResendTransportMutationResult = Apollo.MutationResult<ResendTransportMutation>;
export type ResendTransportMutationOptions = Apollo.BaseMutationOptions<ResendTransportMutation, ResendTransportMutationVariables>;
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
export const GroupsDocument = gql`
    query groups {
  groups {
    id
    name
    order
    isPrivate
    students {
      id
    }
  }
}
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const GroupDocument = gql`
    query group($id: String!) {
  group(id: $id) {
    id
    name
    createdAt
    updatedAt
    order
    isPrivate
    students {
      id
      name
      surname
    }
  }
}
    `;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
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
    sendRate
    fromAddress
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
    sendRate
    fromAddress
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
export const MailTemplateDocument = gql`
    query mailTemplate {
  subjectTemplate
  bodyTemplate
}
    `;

/**
 * __useMailTemplateQuery__
 *
 * To run a query within a React component, call `useMailTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useMailTemplateQuery(baseOptions?: Apollo.QueryHookOptions<MailTemplateQuery, MailTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailTemplateQuery, MailTemplateQueryVariables>(MailTemplateDocument, options);
      }
export function useMailTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailTemplateQuery, MailTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailTemplateQuery, MailTemplateQueryVariables>(MailTemplateDocument, options);
        }
export type MailTemplateQueryHookResult = ReturnType<typeof useMailTemplateQuery>;
export type MailTemplateLazyQueryHookResult = ReturnType<typeof useMailTemplateLazyQuery>;
export type MailTemplateQueryResult = Apollo.QueryResult<MailTemplateQuery, MailTemplateQueryVariables>;
export const MailsDocument = gql`
    query mails {
  mails {
    id
    subject
    body
    groups {
      id
      name
    }
    wasSent
    createdAt
  }
}
    `;

/**
 * __useMailsQuery__
 *
 * To run a query within a React component, call `useMailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMailsQuery(baseOptions?: Apollo.QueryHookOptions<MailsQuery, MailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailsQuery, MailsQueryVariables>(MailsDocument, options);
      }
export function useMailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailsQuery, MailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailsQuery, MailsQueryVariables>(MailsDocument, options);
        }
export type MailsQueryHookResult = ReturnType<typeof useMailsQuery>;
export type MailsLazyQueryHookResult = ReturnType<typeof useMailsLazyQuery>;
export type MailsQueryResult = Apollo.QueryResult<MailsQuery, MailsQueryVariables>;
export const MailDocument = gql`
    query mail($id: String!) {
  mail(id: $id) {
    id
    subject
    body
    groups {
      id
      name
    }
    wasSent
    createdAt
  }
}
    `;

/**
 * __useMailQuery__
 *
 * To run a query within a React component, call `useMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailQuery(baseOptions: Apollo.QueryHookOptions<MailQuery, MailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailQuery, MailQueryVariables>(MailDocument, options);
      }
export function useMailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailQuery, MailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailQuery, MailQueryVariables>(MailDocument, options);
        }
export type MailQueryHookResult = ReturnType<typeof useMailQuery>;
export type MailLazyQueryHookResult = ReturnType<typeof useMailLazyQuery>;
export type MailQueryResult = Apollo.QueryResult<MailQuery, MailQueryVariables>;
export const MailWithTransportsDocument = gql`
    query mailWithTransports($id: String!) {
  mail(id: $id) {
    id
    subject
    body
    groups {
      id
      name
    }
    wasSent
    createdAt
    transports {
      id
      status
      sendStartedAt
      sentAt
      readAt
      rejectedReason
      students {
        id
        name
        surname
        group {
          id
          name
        }
      }
      mailAccount {
        id
        host
        user
      }
    }
  }
}
    `;

/**
 * __useMailWithTransportsQuery__
 *
 * To run a query within a React component, call `useMailWithTransportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailWithTransportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailWithTransportsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailWithTransportsQuery(baseOptions: Apollo.QueryHookOptions<MailWithTransportsQuery, MailWithTransportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailWithTransportsQuery, MailWithTransportsQueryVariables>(MailWithTransportsDocument, options);
      }
export function useMailWithTransportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailWithTransportsQuery, MailWithTransportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailWithTransportsQuery, MailWithTransportsQueryVariables>(MailWithTransportsDocument, options);
        }
export type MailWithTransportsQueryHookResult = ReturnType<typeof useMailWithTransportsQuery>;
export type MailWithTransportsLazyQueryHookResult = ReturnType<typeof useMailWithTransportsLazyQuery>;
export type MailWithTransportsQueryResult = Apollo.QueryResult<MailWithTransportsQuery, MailWithTransportsQueryVariables>;
export const OrgNameDocument = gql`
    query orgName {
  orgName
}
    `;

/**
 * __useOrgNameQuery__
 *
 * To run a query within a React component, call `useOrgNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrgNameQuery(baseOptions?: Apollo.QueryHookOptions<OrgNameQuery, OrgNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgNameQuery, OrgNameQueryVariables>(OrgNameDocument, options);
      }
export function useOrgNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgNameQuery, OrgNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgNameQuery, OrgNameQueryVariables>(OrgNameDocument, options);
        }
export type OrgNameQueryHookResult = ReturnType<typeof useOrgNameQuery>;
export type OrgNameLazyQueryHookResult = ReturnType<typeof useOrgNameLazyQuery>;
export type OrgNameQueryResult = Apollo.QueryResult<OrgNameQuery, OrgNameQueryVariables>;
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
export const StudentsDocument = gql`
    query students {
  students {
    id
    name
    surname
    group {
      id
      name
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentsQuery(baseOptions?: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
      }
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
        }
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>;
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>;
export const StudentDocument = gql`
    query student($id: String!) {
  student(id: $id) {
    id
    name
    surname
    group {
      id
      name
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useStudentQuery__
 *
 * To run a query within a React component, call `useStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudentQuery(baseOptions: Apollo.QueryHookOptions<StudentQuery, StudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
      }
export function useStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentQuery, StudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
        }
export type StudentQueryHookResult = ReturnType<typeof useStudentQuery>;
export type StudentLazyQueryHookResult = ReturnType<typeof useStudentLazyQuery>;
export type StudentQueryResult = Apollo.QueryResult<StudentQuery, StudentQueryVariables>;
export const TransportDocument = gql`
    query transport($id: String!) {
  transport(id: $id) {
    id
    mail {
      id
      subject
      body
      groups {
        id
        name
      }
    }
    students {
      id
      name
      surname
      user {
        id
      }
      group {
        id
        name
      }
    }
    mailAccount {
      id
      host
      user
    }
    status
    sendStartedAt
    sentAt
    readAt
    rejectedReason
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useTransportQuery__
 *
 * To run a query within a React component, call `useTransportQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTransportQuery(baseOptions: Apollo.QueryHookOptions<TransportQuery, TransportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransportQuery, TransportQueryVariables>(TransportDocument, options);
      }
export function useTransportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransportQuery, TransportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransportQuery, TransportQueryVariables>(TransportDocument, options);
        }
export type TransportQueryHookResult = ReturnType<typeof useTransportQuery>;
export type TransportLazyQueryHookResult = ReturnType<typeof useTransportLazyQuery>;
export type TransportQueryResult = Apollo.QueryResult<TransportQuery, TransportQueryVariables>;
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
export const UserDocument = gql`
    query user($id: String!) {
  user(id: $id) {
    id
    emails {
      address
    }
    students {
      id
      surname
      name
      group {
        name
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersWithStudentsDocument = gql`
    query usersWithStudents {
  usersWithStudents {
    id
    emails {
      address
    }
    students {
      id
      surname
      name
      group {
        name
      }
    }
  }
}
    `;

/**
 * __useUsersWithStudentsQuery__
 *
 * To run a query within a React component, call `useUsersWithStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersWithStudentsQuery(baseOptions?: Apollo.QueryHookOptions<UsersWithStudentsQuery, UsersWithStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersWithStudentsQuery, UsersWithStudentsQueryVariables>(UsersWithStudentsDocument, options);
      }
export function useUsersWithStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersWithStudentsQuery, UsersWithStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersWithStudentsQuery, UsersWithStudentsQueryVariables>(UsersWithStudentsDocument, options);
        }
export type UsersWithStudentsQueryHookResult = ReturnType<typeof useUsersWithStudentsQuery>;
export type UsersWithStudentsLazyQueryHookResult = ReturnType<typeof useUsersWithStudentsLazyQuery>;
export type UsersWithStudentsQueryResult = Apollo.QueryResult<UsersWithStudentsQuery, UsersWithStudentsQueryVariables>;
export const UsersWithStudentsByGroupDocument = gql`
    query usersWithStudentsByGroup($groupId: String!) {
  usersWithStudentsByGroup(groupId: $groupId) {
    id
    emails {
      address
    }
    students {
      id
      surname
      name
      group {
        name
      }
    }
  }
}
    `;

/**
 * __useUsersWithStudentsByGroupQuery__
 *
 * To run a query within a React component, call `useUsersWithStudentsByGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithStudentsByGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithStudentsByGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUsersWithStudentsByGroupQuery(baseOptions: Apollo.QueryHookOptions<UsersWithStudentsByGroupQuery, UsersWithStudentsByGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersWithStudentsByGroupQuery, UsersWithStudentsByGroupQueryVariables>(UsersWithStudentsByGroupDocument, options);
      }
export function useUsersWithStudentsByGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersWithStudentsByGroupQuery, UsersWithStudentsByGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersWithStudentsByGroupQuery, UsersWithStudentsByGroupQueryVariables>(UsersWithStudentsByGroupDocument, options);
        }
export type UsersWithStudentsByGroupQueryHookResult = ReturnType<typeof useUsersWithStudentsByGroupQuery>;
export type UsersWithStudentsByGroupLazyQueryHookResult = ReturnType<typeof useUsersWithStudentsByGroupLazyQuery>;
export type UsersWithStudentsByGroupQueryResult = Apollo.QueryResult<UsersWithStudentsByGroupQuery, UsersWithStudentsByGroupQueryVariables>;