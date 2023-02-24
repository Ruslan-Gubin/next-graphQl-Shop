import { gql } from "@apollo/client";


const CREATED__ORDER = gql`
mutation (
  $user_id: ID!,
  $street: String!,
  $flat: String!,
  $floor: String,
  $entrance: String,
  $intercom: String,
  $privateHome: Boolean,
  $products: [OrderProductScalar!],
) {
  createdOrder(
  user_id: $user_id,
  street: $street,
  flat: $flat,
  floor: $floor,
  entrance: $entrance,
  intercom: $intercom,
  privateHome: $privateHome,
  products: $products, 
  ) {
_id


  }
}
`;

export { CREATED__ORDER }