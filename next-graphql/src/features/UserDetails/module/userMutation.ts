import { gql } from "@apollo/client";


const UPDATE_USER = gql`
mutation(
  $name: String!,
  $email: String!,
  $imag: String,
  $id: ID!,
) {
  updateUser(
    name: $name,
    email: $email,
    imag: $imag,
    id: $id,
  ) {
    name
    email
    image{
      url
      public_id
    }
  }
}
`;

const DELETE_USER = gql`
mutation(
  $id: ID!,
) {
  removeUser(
    id: $id,
  ) {
    _id
  }
}
`;


export { UPDATE_USER, DELETE_USER }