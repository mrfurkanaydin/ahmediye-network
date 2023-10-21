import { checkLocalStorage } from "@/utils/checkLocalStorage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Solution() {
  const [text, setText] = useState();
  const notify = (data) => toast(data);
  const router = useRouter();
  useEffect(() => {
    const storage = checkLocalStorage();
    if (storage == null) {
      router.push(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeText = () => {
    event.preventDefault();
    setText(event.target.value);
  };
  const submitForm = async () => {
    let number = Number(await localStorage.getItem("number"));
    if (text == undefined || text == "") {
      alert("Formu Boş Gönderemezsin!");
      return;
    }
    let res = await fetch(`https://ahmediye-network.vercel.app/api/solutions`, {
      method: "POST",
      body: JSON.stringify({
        number,
        text
      })
    });
    res = await res.json();
    notify("Önerin Başarıyla Gönderildi");
    setText("");
  };
  return (
    <div className="flex flex-col">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center gap-3 mx-2">
        <div className="text-xl mt-5">Çözüm Merkezi</div>
        <div className="text-red-700 text-center">
          Öneride Bulunmak İstersen veya Fikir Belirtmek İstersen Aşağıdaki
          Kutucuğu Doldur ve Gönder Butonuna Bas. Böylelikle Sorunları Hocamızla
          Buluşturacağız. Bu Hususta Kullandığınız Dile Dikkat Etmelisiniz. Kötü
          Kelamlar Tekamül Talebesine Yakışmayacağı Gibi IP Adresinden Kim
          Olduğunu da Bulmak Hiç Zor Değil. Hedef Keyfiyeti Arttırmak.
          Önerilerinizi ve Fikirlerinizi Bekliyoruz.
        </div>
        <div className="flex flex-col gap-5 w-full mt-5 mx-5">
          <textarea
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Burayı Doldurunuz"
            required
            onChange={(event) => {
              onChangeText();
            }}
            value={text}
          />
          <button
            onClick={submitForm}
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}

export default Solution;
