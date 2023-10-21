import { checkLocalStorage } from "@/utils/checkLocalStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Hub() {
  const router = useRouter();
  useEffect(() => {
    const storage = checkLocalStorage();
    if (storage == null) {
      router.push(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center gap-3 mx-2">
          <div className="text-xl mt-5">Girmek İstediğiniz Hizmeti Seçiniz</div>
          <div className="flex flex-row gap-5">
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3  dark:bg-blue-600 dark:hover:bg-blue-700 
                  focus:outline-none dark:focus:ring-blue-800"
              href="/votes"
            >
              Puan Sistemi
            </Link>
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3  dark:bg-blue-600 dark:hover:bg-blue-700 
                  focus:outline-none dark:focus:ring-blue-800"
              href="/solution"
            >
              Çözüm Merkezi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hub;
