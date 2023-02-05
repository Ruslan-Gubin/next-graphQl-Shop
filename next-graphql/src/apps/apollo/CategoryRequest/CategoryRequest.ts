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

const CREATED_CATEGORY = gql`
mutation(
  $categoryName: String! 
  $department: String! 
  $sub_department: String! 
) {
 data: createdCategory(
    categoryName: $categoryName
    department: $department
    sub_department: $sub_department
  ) {
    _id
  }
}
`;


export {
  CREATED_CATEGORY,
};