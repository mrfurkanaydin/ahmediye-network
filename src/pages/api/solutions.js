import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  let bodyObject;
  let myPost;
  switch (req.method) {
    case "POST":
        // console.log(JSON.parse(req.body));
      bodyObject = JSON.parse(req.body);
      myPost = await db.collection("solutions").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const solutions = await db.collection("solutions").find({}).toArray();
      res.json({ status: 200, data: solutions });
      break;
  }
}
