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
  reportSetting: ReportSetting;
  searchMyEvaluatingMultiEvaluations: SearchMultiEvaluation;
};


export type QueryMultiTermsArgs = {
  orederBy: Scalars['Boolean'];
  take: Scalars['Float'];
};


export type QueryMyEvaluatingMultiEvaluationsArgs = {
  termId: Scalars['Float'];
};


export type QueryReportSettingArgs = {
  termId: Scalars['Float'];
};


export type QuerySearchMyEvaluatingMultiEvaluationsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};

export type ReportSetting = {
  __typename?: 'ReportSetting';
  reportSettingDetails: Array<ReportSettingDetail>;
  reportSettingId: Scalars['ID'];
  saveUser: User;
  saveUserId: Scalars['Float'];
  savedAt: Scalars['String'];
};

export type ReportSettingDetail = {
  __typename?: 'ReportSettingDetail';
  charaNum?: Maybe<Scalars['Float']>;
  inputFlg: Scalars['Boolean'];
  positionLayerName: Scalars['String'];
  positionLayerType: Scalars['Float'];
  reportSettingDetailId: Scalars['ID'];
  theme: Scalars['String'];
};

export type SearchMultiEvaluation = {
  __typename?: 'SearchMultiEvaluation';
  multiEvaluation: Array<MultiEvaluation>;
  totalCount: Scalars['Float'];
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


export type FetchMultiEvaluationsQuery = { __typename?: 'Query', myEvaluatingMultiEvaluations: Array<{ __typename?: 'MultiEvaluation', id: string, targetUser: { __typename?: 'User', name: string } }> };

export type FetchMultiTermsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMultiTermsQuery = { __typename?: 'Query', multiTerms: Array<{ __typename?: 'MulritTerm', id: string, businessTermName: string, multiTermStartDate: string, multiTermEndDate: string, isCurrentTerm: boolean }> };

export type FetchReportSettingQueryVariables = Exact<{
  termId: Scalars['Float'];
}>;


export type FetchReportSettingQuery = { __typename?: 'Query', reportSetting: { __typename?: 'ReportSetting', savedAt: string, saveUser: { __typename?: 'User', id: string, name: string }, reportSettingDetails: Array<{ __typename?: 'ReportSettingDetail', reportSettingDetailId: string, positionLayerType: number, positionLayerName: string, inputFlg: boolean, theme: string, charaNum?: number | null }> } };

export type SubmitMultiEvaluationMutationVariables = Exact<{
  input: SubmitMultiEvaluationInput;
}>;


export type SubmitMultiEvaluationMutation = { __typename?: 'Mutation', submitMultiEvaluation: { __typename?: 'MultiEvaluation', id: string } };


export const FetchMultiEvaluationsDocument = gql`
    query fetchMultiEvaluations($termId: Float!) {
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
export const FetchMultiTermsDocument = gql`
    query fetchMultiTerms {
  multiTerms(take: 5, orederBy: false) {
    id
    businessTermName
    multiTermStartDate
    multiTermEndDate
    isCurrentTerm
  }
}
    `;

export function useFetchMultiTermsQuery(options?: Omit<Urql.UseQueryArgs<FetchMultiTermsQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchMultiTermsQuery, FetchMultiTermsQueryVariables>({ query: FetchMultiTermsDocument, ...options });
};
export const FetchReportSettingDocument = gql`
    query fetchReportSetting($termId: Float!) {
  reportSetting(termId: $termId) {
    saveUser {
      id
      name
    }
    savedAt
    reportSettingDetails {
      reportSettingDetailId
      positionLayerType
      positionLayerName
      inputFlg
      theme
      charaNum
    }
  }
}
    `;

export function useFetchReportSettingQuery(options: Omit<Urql.UseQueryArgs<FetchReportSettingQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchReportSettingQuery, FetchReportSettingQueryVariables>({ query: FetchReportSettingDocument, ...options });
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