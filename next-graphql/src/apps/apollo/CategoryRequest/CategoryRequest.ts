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
) {
  createdCategory(
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
  SORT_CATEGORY,
};