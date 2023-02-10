import { gql } from "@apollo/client";

const ALL_PRODUCTS = gql`
  query {
    questions {
      viewed
      _id
      dialog {
        name
        text
        time
      }
    }
  }
`;

const ONE_PRODUCT = gql`
  query ($id: ID) {
    question: question(id: $id) {
      viewed
      _id
      dialog {
        name
        text
        time
      }
    }
  }
`;

const SORT_CATEGORY = gql`
query($department: String!, $sub_department: String!){
 sortCategory(department:$department,sub_department: $sub_department){
   name
   _id
 }
 }
`;

const GET_PRODUCT_UPDATE = gql`
  query (
    $department: String!
    $sub_department: String!
    $category_id: ID!
    $page: Int!
    $perPage: Int!
    $searchValue: String!
  ) {
    getProductsUpdate(
      department: $department
      sub_department: $sub_department
      category_id: $category_id
      searchValue: $searchValue
      page: $page
      perPage: $perPage
    ) {
      name
      brand_id
      category_id
      _id
      colors_names
      count
      price
      oldPrice
      discount
      photo {
        _id
        images {
          url
          public_id
        }
      }
    }
  }
`;
const GET_PRODUCTS_LENGTH = gql`
  query (
    $department: String!
    $sub_department: String!
    $category_id: ID!
    $searchValue: String!
  ) {
    productsLength(
      department: $department
      sub_department: $sub_department
      category_id: $category_id
      searchValue: $searchValue
    ) {
      _id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation (
    $product_id: ID!
    $photo_id: ID!
    $category_id: ID!
    $brand_id: ID!
    $images: [PhotoProductScalar!]
  ) {
    removeProduct(
      product_id: $product_id
      photo_id: $photo_id
      category_id: $category_id
      brand_id: $brand_id
      images: $images
    ) {
      _id
    }
  }
`;

export {DELETE_PRODUCT, GET_PRODUCT_UPDATE, ALL_PRODUCTS, ONE_PRODUCT, SORT_CATEGORY, GET_PRODUCTS_LENGTH };
