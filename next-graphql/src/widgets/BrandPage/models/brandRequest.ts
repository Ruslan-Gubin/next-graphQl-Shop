import { gql } from "@apollo/client";


const GET__ONE_BRAND = gql`
query($id: ID!) {
  brand(id: $id) {
    name
    products{
      _id
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
}
`;

const getOneBrandFetch = {
  query: `query($id: ID!) {
    brand(id: $id) {
      name
      products{
        _id
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
  }`
}


export { GET__ONE_BRAND, getOneBrandFetch }