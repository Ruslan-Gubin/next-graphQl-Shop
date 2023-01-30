import { gql } from "@apollo/client";


const CHECK_NEW_QUESTIONS = gql`
  query {
    checkVieweds {
      _id
    }
  }
`;

export {
  CHECK_NEW_QUESTIONS,
};
