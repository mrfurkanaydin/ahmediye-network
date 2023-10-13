import Image from "next/image";
import { useEffect, useState } from "react";

export default function Votes({ allPosts, zort }) {
  const [datas, setDatas] = useState(allPosts.data);
  const [vote, setVote] = useState();
  const [voteList, setVoteList] = useState();
  const [local, setLocal] = useState();
  useEffect(() => {
    getData();
  }, []);

  console.log(local);
  const getData = async () => {
    const res = JSON.parse(localStorage.getItem("voteList"));
    setLocal(res);
  };
  const findItemByName = (nameToFind) => {
    console.log(local);
    if (local != null) {
      const selectedItem = local.find((item) => item === nameToFind);
      return selectedItem == undefined ? false : true;
    }
    return false;
  };
  let submitForm = async (name) => {
    let number = Number(await localStorage.getItem("number"));
    let voteList = JSON.parse(await localStorage.getItem("voteList"));
    setVoteList(voteList);
    if (localStorage.getItem("voteList") == null) {
      await localStorage.setItem("voteList", JSON.stringify([name]));
    } else {
      await localStorage.setItem(
        "voteList",
        JSON.stringify([...voteList, name])
      );
    }
    let res = await fetch(`https://ahmediye-network.vercel.app/api/posts`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        votes: [{ number, vote }]
      })
    });
    res = await res.json();
    window.location.reload(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center gap-3 mx-2">
        <div className="text-2xl font-bold mt-3 my-2">Puan Sistemi</div>
        <>
          {datas.map((data) => {
            const voteValues = data.votes.map((vote) => vote.vote);
            const totalVotes = voteValues.length;
            const sumVotes = voteValues.reduce(
              (total, vote) => total + vote,
              0
            );
            const averageVote = sumVotes / totalVotes;
            return (
              <div key={data.name} className="flex flex-col gap-2 w-2/3 items-center justify-center border p-5 rounded">
                <div className="text-2xl font-bold">{data.name}</div>
                <div>
                  {averageVote > 5 ? (
                    <span className="text-green-400">
                      {averageVote.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-red-700">
                      {averageVote.toFixed(1)}
                    </span>
                  )}
                </div>

                <input
                  type="number"
                  min={1}
                  max={10}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1 - 10 Arası Puan Veriniz"
                  required
                  onChange={(event) => {
                    event.target.value > 10
                      ? setVote(Number(10))
                      : setVote(Number(event.target.value));
                  }}
                  value={vote}
                />
                <button
                  onClick={() => submitForm(data.name)}
                  disabled={findItemByName(data.name)}
                  className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {findItemByName(data.name) ? (
                    <>Puan Verdiniz</>
                  ) : (
                    <>Puan Ver</>
                  )}
                </button>
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let res = await fetch(`https://ahmediye-network.vercel.app/api/posts`, {
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
