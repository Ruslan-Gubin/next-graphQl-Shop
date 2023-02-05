import { gql } from "@apollo/client";

// const ALL_PRODUCTS = gql`
//   query {
//     questions {
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
 data:  createdBrend(
    brand_name: $brand_name
  ) {
    _id
  }
}
`;


export {
  CREATED_BRAND, 
};