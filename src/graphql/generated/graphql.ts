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

export type MulritTerm = {
  __typename?: 'MulritTerm';
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
  submitMultiEvaluation: MultiEvaluation;
};


export type MutationSubmitMultiEvaluationArgs = {
  input: SubmitMultiEvaluationInput;
};

export type Query = {
  __typename?: 'Query';
  multiTerms: Array<MulritTerm>;
  myEvaluatingMultiEvaluations: Array<MultiEvaluation>;
};


export type QueryMultiTermsArgs = {
  orederBy: Scalars['Boolean'];
  take: Scalars['Float'];
};


export type QueryMyEvaluatingMultiEvaluationsArgs = {
  termId: Scalars['Float'];
};

export type SubmitMultiEvaluationInput = {
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

export type FetchMultiEvaluationsQueryVariables = Exact<{
  termId: Scalars['Float'];
}>;


export type FetchMultiEvaluationsQuery = { __typename?: 'Query', multiTerms: Array<{ __typename?: 'MulritTerm', id: string, businessTermName: string, multiTermStartDate: string, multiTermEndDate: string, isCurrentTerm: boolean }>, myEvaluatingMultiEvaluations: Array<{ __typename?: 'MultiEvaluation', id: string, targetUser: { __typename?: 'User', name: string } }> };

export type SubmitMultiEvaluationMutationVariables = Exact<{
  input: SubmitMultiEvaluationInput;
}>;


export type SubmitMultiEvaluationMutation = { __typename?: 'Mutation', submitMultiEvaluation: { __typename?: 'MultiEvaluation', id: string } };


export const FetchMultiEvaluationsDocument = gql`
    query fetchMultiEvaluations($termId: Float!) {
  multiTerms(take: 5, orederBy: false) {
    id
    businessTermName
    multiTermStartDate
    multiTermEndDate
    isCurrentTerm
  }
  myEvaluatingMultiEvaluations(termId: $termId) {
    id
    targetUser {
      name
    }
  }
}
    `;

export function useFetchMultiEvaluationsQuery(options: Omit<Urql.UseQueryArgs<FetchMultiEvaluationsQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchMultiEvaluationsQuery, FetchMultiEvaluationsQueryVariables>({ query: FetchMultiEvaluationsDocument, ...options });
};
export const SubmitMultiEvaluationDocument = gql`
    mutation submitMultiEvaluation($input: SubmitMultiEvaluationInput!) {
  submitMultiEvaluation(input: $input) {
    id
  }
}
    `;

export function useSubmitMultiEvaluationMutation() {
  return Urql.useMutation<SubmitMultiEvaluationMutation, SubmitMultiEvaluationMutationVariables>(SubmitMultiEvaluationDocument);
};