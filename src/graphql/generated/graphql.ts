import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MulritTerms = {
  __typename?: 'MulritTerms';
  businessTermEndDate: Scalars['String'];
  businessTermName: Scalars['String'];
  businessTermStartDate: Scalars['String'];
  id: Scalars['String'];
  isCurrentTerm: Scalars['Boolean'];
  multiTermEndDate: Scalars['String'];
  multiTermStartDate: Scalars['String'];
};

export type MultiEvaluation = {
  __typename?: 'MultiEvaluation';
  goodComment: Scalars['String'];
  id: Scalars['ID'];
  improvementComment: Scalars['String'];
  multiTermId: Scalars['String'];
  score: Scalars['Float'];
  targetUser: User;
  targetUserId: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerMultiEvaluation: MultiEvaluation;
};


export type MutationRegisterMultiEvaluationArgs = {
  input: RegisterMultiEvaluationInput;
};

export type Query = {
  __typename?: 'Query';
  multiBusinessTerms: Array<MulritTerms>;
  multiEvaluations: Array<MultiEvaluation>;
};


export type QueryMultiBusinessTermsArgs = {
  orederBy: Scalars['Boolean'];
  take: Scalars['Float'];
};


export type QueryMultiEvaluationsArgs = {
  termId: Scalars['Float'];
};

export type RegisterMultiEvaluationInput = {
  goodComment: Scalars['String'];
  improvementComment: Scalars['String'];
  multiTermId: Scalars['Float'];
  score: Scalars['Float'];
  targetUserId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TestMutationVariables = Exact<{
  input: RegisterMultiEvaluationInput;
}>;


export type TestMutation = { __typename?: 'Mutation', registerMultiEvaluation: { __typename?: 'MultiEvaluation', id: string } };

export type FetchTopPageDataQueryVariables = Exact<{
  termId: Scalars['Float'];
}>;


export type FetchTopPageDataQuery = { __typename?: 'Query', multiBusinessTerms: Array<{ __typename?: 'MulritTerms', id: string, businessTermName: string, isCurrentTerm: boolean }>, multiEvaluations: Array<{ __typename?: 'MultiEvaluation', id: string, targetUser: { __typename?: 'User', name: string } }> };


export const TestDocument = gql`
    mutation test($input: RegisterMultiEvaluationInput!) {
  registerMultiEvaluation(input: $input) {
    id
  }
}
    `;

export function useTestMutation() {
  return Urql.useMutation<TestMutation, TestMutationVariables>(TestDocument);
};
export const FetchTopPageDataDocument = gql`
    query fetchTopPageData($termId: Float!) {
  multiBusinessTerms(take: 5, orederBy: false) {
    id
    businessTermName
    isCurrentTerm
  }
  multiEvaluations(termId: $termId) {
    id
    targetUser {
      name
    }
  }
}
    `;

export function useFetchTopPageDataQuery(options: Omit<Urql.UseQueryArgs<FetchTopPageDataQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchTopPageDataQuery, FetchTopPageDataQueryVariables>({ query: FetchTopPageDataDocument, ...options });
};