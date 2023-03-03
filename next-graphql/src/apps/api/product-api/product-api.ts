

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

const sortProductDepartment = {
  query: `query ($department: String!, $sortValue: String!) {
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
  }`
}

const sortProductsCatalog = {
  query: ` query (
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
  `
}


export { sortProductsCatalog, maxViewsAllProduct,getNewProducts, getMaxDiscount , sortProductDepartment}