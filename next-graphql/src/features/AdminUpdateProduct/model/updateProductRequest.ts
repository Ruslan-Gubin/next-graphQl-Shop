import { gql } from "@apollo/client";

const ONE_PRODUCT_UPDATE = gql`
  query ($id: ID) {
    product(id: $id) {
      _id
      name
      description
      colors_names
      department
      sub_department
      count
      discount
      price
      oldPrice
      photo_id
      photo {
        images {
          url
          public_id
        }
      }
      brand {
        name
        _id
      }
      category {
        name
        _id
      }

      options {
        name
        value
      }
    }
  }
`;

const UPDATE_PRODUCT_BASIC = gql`
  mutation (
  $product_id: ID!
  $option_value: [prodOptionScalar]
  $name: String!
  $description: String!
  $price: Int!
  $oldPrice: Int!
  $count: Int!
  ) {
    updateProductBasic(
    product_id: $product_id
    option_value: $option_value
    name: $name
    description: $description
    price: $price
    oldPrice: $oldPrice
    count: $count
    ) {
    
    _id

    }
  }
`;

const UPDATE_PHOTO = gql`
  mutation (
    $photo_id: ID!
    $images_remove: [String]
    $images_add: [String]
    $images_old: [PhotoProductScalar!]
  ) {
    updatePhoto(
      photo_id: $photo_id
      images_remove: $images_remove
      images_add: $images_add
      images_old: $images_old
    ) {
      _id
    }
  }
`;

export { ONE_PRODUCT_UPDATE, UPDATE_PRODUCT_BASIC, UPDATE_PHOTO };
