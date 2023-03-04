

const categoryes = {
  query: `query {
    categorys{
      name
      _id
      sub_department
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