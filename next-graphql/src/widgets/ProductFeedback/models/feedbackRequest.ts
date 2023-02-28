import { gql } from "@apollo/client";


const CREATE_FEEDBACK = gql`
mutation(
  $text: String!,
	$user_id: String!,
  $product_id: String!,
  $img: String,
  $user_opinion: Int,
){
  createdFeedback(
    text: $text,
    user_id: $user_id,
    product_id: $product_id,
    img: $img,
    user_opinion: $user_opinion,
  ){
    _id
  }
}
`;
const REMOVE_FEEDBACK = gql`
mutation(
  $id: ID!,
){
  removeFeedback(
    id: $id,
  ){
    _id
  }
}
`;

export { CREATE_FEEDBACK, REMOVE_FEEDBACK }