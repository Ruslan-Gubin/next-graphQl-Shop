

const categoryes = {
  query: `query {
    categorys{
      name
      sub_department
      _id
      department
      image {
        url
      }
    }
  }`
}

const sortCategoryFromCatalog = {
  query: `query(
    $department: String!
  ) {
    sortCategoryFromCatalog(
      department: $department
    ) {
      name
      department
      sub_department
      _id
      image {
      url
      }
    }
  }
  `
}

export { categoryes, sortCategoryFromCatalog}