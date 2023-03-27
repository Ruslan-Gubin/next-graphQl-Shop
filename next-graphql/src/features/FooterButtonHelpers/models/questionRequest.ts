import { gql } from "@apollo/client";

const ALL_QUESTIONS = gql`
  query {
    questions {
      viewed
      _id
      dialog {
        name
        text
      }
    }
  }
`;

const ONE_QUESTIONS = gql`
  query ($id: ID) {
  question: question(id: $id) {
      _id
      dialog {
        name
        text
        time
      }
    }
  }
`;

const ADD_QUESTIONS = gql`
  mutation ($text: String!, $name: String!, $viewed: Boolean!) {
    createdDialog(text: $text, name: $name, viewed: $viewed) {
      _id
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

export {
  ADD_QUESTIONS,
  ALL_QUESTIONS,
  DELETE_QUESTION,
  ONE_QUESTIONS,
};
