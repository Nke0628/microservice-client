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
  businessTermEndDate: Scalars['String'];
  businessTermName: Scalars['String'];
  businessTermStartDate: Scalars['String'];
  id: Scalars['String'];
  isCurrentTerm: Scalars['Boolean'];
  multiTermEndDate: Scalars['String'];
  multiTermStartDate: Scalars['String'];
};

export type MultiEvaluation = {
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
  saveReportSetting: ReportSetting;
  submitMultiEvaluation: MultiEvaluation;
};


export type MutationSaveReportSettingArgs = {
  input: SaveReportSettingInput;
};


export type MutationSubmitMultiEvaluationArgs = {
  input: SubmitMultiEvaluationInput;
};

export type Query = {
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
  reportSettingDetails: Array<ReportSettingDetail>;
  reportSettingId: Scalars['ID'];
  saveUser: User;
  saveUserId: Scalars['Float'];
  savedAt: Scalars['String'];
};

export type ReportSettingDetail = {
  charaNum?: Maybe<Scalars['Float']>;
  inputFlg: Scalars['Boolean'];
  positionLayerName: Scalars['String'];
  positionLayerType: Scalars['Float'];
  reportSettingDetailId: Scalars['ID'];
  theme: Scalars['String'];
};

export type SaveReportSettingDetailInput = {
  charaNum?: InputMaybe<Scalars['Float']>;
  inputFlg: Scalars['Boolean'];
  positionLayerType: Scalars['Float'];
  theme: Scalars['String'];
};

export type SaveReportSettingInput = {
  reportSettingDetail: Array<SaveReportSettingDetailInput>;
  termId: Scalars['Float'];
};

export type SearchMultiEvaluation = {
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
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type FetchMultiEvaluationsQueryVariables = Exact<{
  termId: Scalars['Float'];
}>;


export type FetchMultiEvaluationsQuery = { myEvaluatingMultiEvaluations: Array<{ id: string, targetUser: { name: string } }> };

export type FetchMultiTermsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMultiTermsQuery = { multiTerms: Array<{ id: string, businessTermName: string, multiTermStartDate: string, multiTermEndDate: string, isCurrentTerm: boolean }> };

export type FetchReportSettingQueryVariables = Exact<{
  termId: Scalars['Float'];
}>;


export type FetchReportSettingQuery = { reportSetting: { savedAt: string, saveUser: { id: string, name: string }, reportSettingDetails: Array<{ reportSettingDetailId: string, positionLayerType: number, positionLayerName: string, inputFlg: boolean, theme: string, charaNum?: number | null }> } };

export type SaveReportSettingMutationVariables = Exact<{
  input: SaveReportSettingInput;
}>;


export type SaveReportSettingMutation = { saveReportSetting: { savedAt: string, saveUser: { id: string, name: string }, reportSettingDetails: Array<{ reportSettingDetailId: string, positionLayerType: number, positionLayerName: string, inputFlg: boolean, theme: string, charaNum?: number | null }> } };

export type SubmitMultiEvaluationMutationVariables = Exact<{
  input: SubmitMultiEvaluationInput;
}>;


export type SubmitMultiEvaluationMutation = { submitMultiEvaluation: { id: string } };


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
export const SaveReportSettingDocument = gql`
    mutation saveReportSetting($input: SaveReportSettingInput!) {
  saveReportSetting(input: $input) {
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

export function useSaveReportSettingMutation() {
  return Urql.useMutation<SaveReportSettingMutation, SaveReportSettingMutationVariables>(SaveReportSettingDocument);
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