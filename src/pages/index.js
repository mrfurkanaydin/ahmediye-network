import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [number, setNumber] = useState();
  const router = useRouter();

  useEffect(() => {}, []);
  useEffect(() => {
    const storage = checkLocalStorage();
    if (storage !== null) {
      // Local storage'da "number" öğesi varsa, istediğiniz sayfaya yönlendirin.
      router.push(`/votes`);
    }
  }, []);

  const submitForm = async () => {
    await localStorage.setItem("number", number);
    router.push("/votes", { scroll: false });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 justify-center items-center mx-5">
          <div className="text-2xl font-bold mt-3 my-2">
            Ahmediye Oylama Sistemi
          </div>
          <p className="text-sm text-red-700">
            Talebe Numaranızı Giriniz (Yanlış Girmeniz Durumunda
            Değiştiremeyeceksiniz!)
          </p>
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
          <button
            onClick={submitForm}
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 mt-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

function checkLocalStorage() {
  const number = localStorage.getItem("number");
  if (number) {
    console.log(parseInt(number, 10));
    return parseInt(number, 10);
  }
  return null;
}
