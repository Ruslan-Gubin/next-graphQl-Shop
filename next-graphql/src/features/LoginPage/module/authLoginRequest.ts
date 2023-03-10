import { gql } from "@apollo/client";


const CREATE_USER = gql`
mutation(
  $name: String!,
  $phone: String!,
  $email: String,
  $password: String!,
) {
  createdUser(
    name: $name,
    phone: $phone,
    email: $email,
    password: $password,
  ) {
    _id
    token
    name
    phone
    email
    role
  }
}
`;

const LOGIN_USER = gql`
mutation(
  $phone: String!,
  $password: String!,
) {
  loginUser(
    phone: $phone,
    password: $password,
  ) {
    _id
    token
    name
    phone
    email
    role
  }
}
`;

export { CREATE_USER, LOGIN_USER }