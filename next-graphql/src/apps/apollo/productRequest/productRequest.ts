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
const SEARCH_PRODUCTS = gql`
  query($searchValue: String!) {
    searchProducts(searchValue: $searchValue) {
      _id
    name
    photo{
      images{
        url
      }
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
      category_id
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

      feedbacks {
      _id
      text
      user_id
      img {
      url
      }
      user_opinion 
      like
      dislike
      createdAt
      user {
      _id
      name
      image {
      url
      }
      }
      }


      photo {
        images {
          url
        }
      }
    }
  }
`;
const ONE_PRODUCT_QUERY = gql`
  query($id: ID!) {
    getOneProductDetails(id: $id) {
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
      category_id
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

      feedbacks {
      _id
      text
      user_id
      img {
      url
      }
      user_opinion 
      like
      dislike
      createdAt
      user {
      _id
      name
      image {
      url
      }
      }
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
const SORT_PRODUCT_SIMILAR = gql`
  query (
  $department: String!,
  $sub_department: String!
  $category_id: String!
  $exception: String!
  ) {
    sortSimilarProduct(
    department: $department,
    sub_department: $sub_department
    category_id: $category_id
    exception: $exception
    ) {
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
      department
      sub_department
      name
      price
      oldPrice
      discount
      count
      category_id
      brand_id

      feedbacks {
        user_opinion
      }

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

const GET__MAXVIEWS__ALLPRODUCT = gql`
query($limit: Int){
  getMaxViewsProducts(limit: $limit){
    name
    price
    oldPrice
    _id
    sub_department
    department
    discount
    photo {
      images {
      url
      }
    }
  }
}
`;
const GET__NEW__ALLPRODUCT = gql`
query($limit: Int){
  getNewProducts(limit: $limit){
    name
    price
    oldPrice
    sub_department
    department
    _id
    discount
    photo {
      images {
      url
      }
    }
  }
}
`;
const GET__MAXDISCOUNT__ALLPRODUCT = gql`
query($limit: Int){
  getMaxDiscountProducts(limit: $limit){
    name
    price
    oldPrice
    sub_department
    department
    _id
    discount
    photo {
      images {
      url
      }
    }
  }
}
`;

export {
  GET__MAXDISCOUNT__ALLPRODUCT,
  GET__NEW__ALLPRODUCT,
  GET__MAXVIEWS__ALLPRODUCT,
  ONE_PRODUCT_QUERY,
  GET_PRODUCT_UPDATE,
  ALL_PRODUCTS,
  ONE_PRODUCT,
  CREATED_PRODUCT,
  SORT_PRODUCT_DEPARTMENT,
  SORT_PRODUCT_CATALOG,
  SORT_PRODUCT_SIMILAR,
  SEARCH_PRODUCTS,
};
