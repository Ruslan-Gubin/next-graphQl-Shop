import { gql } from "@apollo/client";

const ALL_BRENDS = gql`
  query{
  brands{
    _id
  }
}
`;

const allBrandsId = {
  query: `query{
    brands{
      _id
    }
  }`
}

const CREATED_BRAND = gql`
mutation(
  $brand_name: String!
  $imag: String!
) {
   createdBrend(
    brand_name: $brand_name
    imag: $imag
  ) {
    _id
  }
}
`;



export {
  CREATED_BRAND, 
  ALL_BRENDS,
  allBrandsId,
};