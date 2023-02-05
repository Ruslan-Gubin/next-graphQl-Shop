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

const CREATED_PRODUCT = gql`
mutation(
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

) {
  createdProduct(

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


export {
  ALL_PRODUCTS,
  ONE_PRODUCT,
  CREATED_PRODUCT,
};