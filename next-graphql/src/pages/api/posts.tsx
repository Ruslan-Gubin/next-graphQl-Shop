import type { NextApiRequest, NextApiResponse } from "next";

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
  "variables": {}
}

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)
  // const placeholderData = await response.json()
  console.log(req.body);

  const endpoint = "http://localhost:3005/react-graphql";
  const headers = {
    "content-type": "application/json",
    // "Authorization": "<token>"
  };

  const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(categoryes)
  };
  
  const response = await fetch(endpoint, options);
  if (!response) {
    return
  }
  const data  = await response.json()
  if (!data) {
    return
  }
  const respData = await data.data.categorys



  return res.status(200).json(respData);
  // return res.status(200).json({ success: true, id: req.body.id });
}
