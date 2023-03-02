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
  console.log(req.body);

  const endpoint = `${process.env.API_HOST}`;
  const headers = {
    "content-type": "application/json",
    // "Authorization": "<token>"
  };

  const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(categoryes)
  };
  
  try {
    const response = await fetch(endpoint, options);
    const data  = await response.json()
    const respData = await data.data.categorys
  
  
    return res.status(200).json(respData);
  } catch (error) {
    return res.status(404).json({error: error.message})
  }

  // return res.status(200).json({ success: true, id: req.body.id });
}
