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

const CREATED_PHOTOS = gql`
mutation(
  $images: [String!] 
) {
 data: createdPhoto(
  images: $images
  ) {
    _id
  }
}
`;


export {
  CREATED_PHOTOS,
};