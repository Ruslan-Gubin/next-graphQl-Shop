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
  mutation($id: ID!) {
    productDetail(id: $id) {
      _id
      name
      price
      oldPrice
      discount
      count
      description
      colors_names
      sub_department
      department
      photo_count
      views
      options {
        name
        value
      }
      brand {
        name
        _id
        image {
          url
        }
      }
      category {
        sub_department
        department
        name
        _id
      }
      photo {
        images {
          url
        }
      }
    }
  }
`;

const CREATED_PRODUCT = gql`
  mutation (
    $price: Int!
    $count: Int!
    $oldPrice: Int!
    $photo_count: Int!
    $name: String!
    $description: String!
    $colors_names: String!
    $options: [prodOptionScalar!]
    $categoryId: String!
    $brandId: String!
    $photo_id: String!
    $department: String!
    $sub_department: String!
  ) {
    createdProduct(
      department: $department
      sub_department: $sub_department
      price: $price
      count: $count
      oldPrice: $oldPrice
      name: $name
      description: $description
      colors_names: $colors_names
      options: $options
      categoryId: $categoryId
      brandId: $brandId
      photo_count: $photo_count
      photo_id: $photo_id
    ) {
      _id
    }
  }
`;

const GET_PRODUCT_UPDATE = gql`
  query (
    $department: String!
    $sub_department: String!
    $category_id: ID!
    $limit: Int!
  ) {
    getProductsUpdate(
      department: $department
      sub_department: $sub_department
      category_id: $category_id
      limit: $limit
    ) {
      name
      _id
      description
      colors_names
      photo_count
      views
      count
      price
      oldPrice
      discount
      options {
        name
        value
      }
      photo {
        _id
        images {
          url
          public_id
        }
      }
      brand {
        name
      }
    }
  }
`;

const SORT_PRODUCT_DEPARTMENT = gql`
  query ($department: String!, $sortValue: String!) {
    sortProductDepartment(department: $department, sortValue: $sortValue) {
      name
      _id
      discount
      price
      oldPrice
      name
      photo {
        images {
          url
        }
      }
    }
  }
`;

const SORT_PRODUCT_CATALOG = gql`
  query (
    $department: String!
    $sub_department: String!
    $sortProperty: sortPropertyScale
  ) {
    sortProductCatalog(
      department: $department
      sub_department: $sub_department
      sortProperty: $sortProperty
    ) {
      _id
      name
      price
      oldPrice
      discount
      count
      category_id
      brand_id
      category {
        name
        _id
      }
      brand {
        name
        _id
      }

      photo {
        images {
          url
        }
      }
    }
  }
`;

export {
  GET_PRODUCT_UPDATE,
  ALL_PRODUCTS,
  ONE_PRODUCT,
  CREATED_PRODUCT,
  SORT_PRODUCT_DEPARTMENT,
  SORT_PRODUCT_CATALOG,
};
