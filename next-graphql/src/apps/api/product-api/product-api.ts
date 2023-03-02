

const maxViewsAllProduct = { 
  query: `query($limit: Int){
    getMaxViewsProducts(limit: $limit){
      name
      price
      oldPrice
      _id
      discount
      photo {
        images {
        url
        }
      }
    }
  }`
 }

const getNewProducts = {
  query: `query($limit: Int){
    getNewProducts(limit: $limit){
      name
      price
      oldPrice
      _id
      discount
      photo {
        images {
        url
        }
      }
    }
  }`
}

const getMaxDiscount = {
  query: `query($limit: Int){
    getMaxDiscountProducts(limit: $limit){
      name
      price
      oldPrice
      _id
      discount
      photo {
        images {
        url
        }
      }
    }
  }`
}


export { maxViewsAllProduct,getNewProducts, getMaxDiscount }