import React, { useState } from "react";

function Solution({ allSolutions }) {
  const [datas, setDatas] = useState(allSolutions.data);
  console.log(datas);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center gap-3 mx-2">
        <div className="text-2xl mt-5">
          Talebe Kardeşlerimizden Öneriler
        </div>
        <div className="flex flex-col items-center justify-start mx-5">
          {datas &&
            datas?.map((data) => {
              return (
                <div className="border-b-2 my-3 font-dm font-medium" key={data._id}>
                  {data.text}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Solution;

export async function getServerSideProps(context) {
  let res = await fetch(`http://localhost:3000/api/solutions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  let allSolutions = await res.json();

  return {
    props: { allSolutions }
  };
}
