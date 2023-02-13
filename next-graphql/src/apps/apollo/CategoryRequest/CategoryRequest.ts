import { gql } from "@apollo/client";

const SORT_CATEGORY = gql`
query($department: String!, $sub_department: String!){
 sortCategory(department:$department,sub_department: $sub_department){
   name
   _id
 }
 }
`;

const CREATED_CATEGORY = gql`
mutation(
  $categoryName: String! 
  $department: String! 
  $sub_department: String!
  $imag: String! 
) {
  createdCategory(
    categoryName: $categoryName
    department: $department
    sub_department: $sub_department
    imag: $imag
  ) {
    _id
  }
}
`;
const  SORT_CATEGORY_FROM_CATALOG = gql`
query(
  $department: String!
) {
  sortCategoryFromCatalog(
    department: $department
  ) {
    name
    sub_department
    image {
    url
    }
  }
}
`;


export {
  SORT_CATEGORY_FROM_CATALOG,
  CREATED_CATEGORY,
  SORT_CATEGORY,
};