

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
  }`,
}

export { categoryes }