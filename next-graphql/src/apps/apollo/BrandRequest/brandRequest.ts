import { gql } from "@apollo/client";

const ALL_BRENDS = gql`
  query{
  brands{
    name
    _id
  }
}
`;

// const ONE_PRODUCT = gql`
//   query ($id: ID) {
//     question: question(id: $id) {
//       viewed
//       _id
//       dialog {
//         name
//         text
//         time
//       }
//     }
//   }
// `;

const CREATED_BRAND = gql`
mutation(
  $brand_name: String!
) {
   createdBrend(
    brand_name: $brand_name
  ) {
    _id
  }
}
`;


export {
  CREATED_BRAND, 
  ALL_BRENDS,
};