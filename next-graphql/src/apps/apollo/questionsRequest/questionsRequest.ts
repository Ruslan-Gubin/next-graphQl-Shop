import { gql } from "@apollo/client";

const ALL_QUESTIONS = gql`
  query {
    questions {
      viewed
      _id
      createdAt
      dialog {
        name
        text
        time
      }
    }
  }
`;
const CHECK_QUESTIONS = gql`
  query {
    data: checkVieweds {
      viewed
      _id
      dialog {
        name
        text
        time
      }
    }
  }
`;

const ONE_QUESTIONS = gql`
  query ($id: ID) {
    question: question(id: $id) {
      viewed
      _id
      dialog {
        name
        text
        time
      }
    }
  }
`;

const ADD_COMMENT_QUESTION = gql`
  mutation ($id: ID!, $text: String!, $name: String!, $viewed: Boolean!) {
    addCommentDialog(id: $id, text: $text, name: $name, viewed: $viewed) {
      viewed
      _id
      dialog {
        text
        name
        time
      }
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation ($id: ID!) {
    removeDialog(id: $id) {
      _id
    }
  }
`;

const CHECK_NEW_QUESTIONS = gql`
  query {
    checkVieweds {
      _id
    }
  }
`;

export {
  CHECK_QUESTIONS,
  ADD_COMMENT_QUESTION,
  ALL_QUESTIONS,
  DELETE_QUESTION,
  ONE_QUESTIONS,
  CHECK_NEW_QUESTIONS,
};
