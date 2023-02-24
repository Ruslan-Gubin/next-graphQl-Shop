import { gql } from "@apollo/client";

const GET_USER_ORDERS = gql`
  query ($user_id: ID!) {
    sortOrdersUser(user_id: $user_id) {
      user_id
      street
      flat
      floor
      entrance
      intercom
      privateHome
      status
      _id
      createdAt
      products {
        brandName
        count
        id
        img
        name
        price
        oldPrice
      }
    }
  }
`;
const GET_NEW_ORDERS_LENGTH = gql`
  query  {
    getNewLength {
      _id
    }
  }
`;
const GET_ALL_ORDERS = gql`
    query{
 getAllOrders{
      user_id
      street
      flat
      floor
      entrance
      intercom
      privateHome
      status
      createdAt
      _id
      products {
        brandName
        count
        id
        img
        name
        price
        oldPrice
      }
      user {
        name
        phone
        email
        _id
      }
    
    }
  }
`;

const REMOVE__ORDER = gql`
  mutation ($id: ID!) {
    removeOrder(id: $id) {
      _id
    }
  }
`;
const UPDATE_STATUS_ORDER = gql`
  mutation ($id: ID!, $status: String!) {
    updateStatusOrder(id: $id, status: $status) {
      _id
    }
  }
`;

const GET_ORDERS_LENGTH = gql`
  query ($user_id: ID!) {
    getUserOrdersLength(user_id: $user_id) {
      _id
    }
  }
`;

const REMOVE_ORDER_AND_UPDATE_PRODUCT = gql`
  mutation ($id: ID!, $products: [OrderProductsListScalar!]) {
    removeOrderAndUpdateProduct(id: $id, products: $products) {
      _id
    }
  }
`;

export {
  REMOVE_ORDER_AND_UPDATE_PRODUCT,
  GET_USER_ORDERS,
  GET_ORDERS_LENGTH,
  REMOVE__ORDER,
  GET_ALL_ORDERS,
  UPDATE_STATUS_ORDER,
  GET_NEW_ORDERS_LENGTH,
};
