import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ allPosts }) {
  const [datas, setDatas] = useState(allPosts.data);
  const [number, setNumber] = useState();
  const [vote, setVote] = useState();
  const [ort, setOrt] = useState(0);
  // useEffect(() => {
  //   getPosts();
  // }, []);
  const getPosts = async () => {
    let res = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    res = await res.json();
    setDatas(res.data);
    console.log(datas);
  };

  let submitForm = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        name: "Can Ataseven",
        votes: [{ number, vote }]
      })
    });
    res = await res.json();
    window.location.reload(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center gap-3 mx-10">
        <div>Ahmediye Oylama Sistemi</div>
        {datas.map((data) => {
          const voteValues = data.votes.map((vote) => vote.vote);
          const totalVotes = voteValues.length;
          const sumVotes = voteValues.reduce((total, vote) => total + vote, 0);
          const averageVote = sumVotes / totalVotes;
          return (
            <div key={data.name}>
              <Image
                src="/image1.png"
                width={256}
                height={380}
                alt="Can Ataseven"
              />
              <div>{data.name}</div>
              <div>{averageVote.toFixed(1)}</div>
              <input
                type="number"
                min={1}
                max={106}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Talebe Numaran"
                required
                onChange={(event) => {
                  event.target.value > 106
                    ? setNumber(Number(106))
                    : setNumber(Number(event.target.value));
                }}
                value={number}
              />
              <input
                type="number"
                min={1}
                max={10}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Oy (1 - 10 Arası Olmalı)"
                required
                onChange={(event) => {
                  event.target.value > 10
                    ? setVote(Number(10))
                    : setVote(Number(event.target.value));
                }}
                value={vote}
              />
              <button onClick={submitForm}>Gönder</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  let allPosts = await res.json();

  return {
    props: { allPosts }
  };
}
