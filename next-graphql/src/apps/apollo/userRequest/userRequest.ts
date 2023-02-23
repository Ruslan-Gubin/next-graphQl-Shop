import { gql } from "@apollo/client";


const GET__ONE__USER = gql`
query($id: ID!){
  user(id: $id){
    name
    email
    phone
    role
    _id
    image {
    url
    }
  }
}
`;

export {GET__ONE__USER}