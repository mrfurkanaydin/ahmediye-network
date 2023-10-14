// posts.js

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  let bodyObject;
  let thisPost;
  let myPost;
  switch (req.method) {
    case "POST":
      bodyObject = JSON.parse(req.body);
      myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("posts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
    case "PUT":
      bodyObject = JSON.parse(req.body);
      thisPost = await db
        .collection("posts")
        .findOne({ name: bodyObject.name });
      const isVoted = thisPost.votes.find(
        (vote) => vote.number == bodyObject.votes[0].number
      );
      if (isVoted == undefined) {
        myPost = await db
          .collection("posts")
          .updateOne(
            { name: bodyObject.name },
            { $set: { votes: [...thisPost.votes, ...bodyObject.votes] } }
          );
        res.json({ data: "Puan Verme Başarılı", status: 200 });
      } else {
        res.json({ data: "Zaten Puan Verdiniz!", status: 500 });
      }
      break;
  }
}
