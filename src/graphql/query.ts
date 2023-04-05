import { gql } from "@apollo/client";

export const GET_MULTI_EVALUATION_PAGE = gql`
  query {
    multiBusinessTerms(take: 5, orederBy: false) {
      id
      businessTermName
      isCurrentTerm
    }
  }
`;
