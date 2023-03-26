const maxViewsAllProduct = {
  query: `query($limit: Int){
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
  }`,
};

const getNewProducts = {
  query: `query($limit: Int){
    getNewProducts(limit: $limit){
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
  }`,
};

const getMaxDiscount = {
  query: `query($limit: Int){
    getMaxDiscountProducts(limit: $limit){
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
  }`,
};

const sortProductDepartment = {
  query: `query ($department: String!, $sortValue: String!) {
    sortProductDepartment(department: $department, sortValue: $sortValue) {
      name
      _id
      department
      sub_department
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
  }`,
};

const sortProductsCatalog = {
  query: ` query (
    $department: String!
    $category: String!
    $sub_department: String!
    $sortProperty: sortPropertyScale
    $page: Int!
    $perPage: Int!
  ) {
    sortProductCatalog(
      page: $page
      perPage: $perPage
      department: $department
      category: $category
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
  `,
};

const getAllProductId = {
  query: `
  query {
    products {
      _id
      sub_department
      department
    }
  }
  `,
};

const getSearchProducts = {
  query: `
  query($searchValue: String!) {
    searchProducts(searchValue: $searchValue) {
    _id
    name
    department
    sub_department
    photo{
      images{
        url
      }
    }   
    }
  }
  `,
};

const getOneProductUpdateViews = {
  query: `mutation($id: ID!) {
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
  `
}

const sortProductSimilar = {
  query: `query (
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
        department
        sub_department
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
  `
}



export {
  getSearchProducts,
  getAllProductId,
  sortProductsCatalog,
  maxViewsAllProduct,
  getNewProducts,
  getMaxDiscount,
  sortProductDepartment,
  getOneProductUpdateViews,
  sortProductSimilar,
};
