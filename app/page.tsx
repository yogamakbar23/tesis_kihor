import Link from "next/dist/client/link";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex flex-col flex-1 bg-sky-900 items-center justify-center">
      <Image
        src="/icons/Lambang UGM-putih.png"
        alt="Logo"
        width={200}
        height={200}
        className="mb-4"
        loading="lazy"
      />
      <h1 className="text-3xl font-bold text-white mb-3">
        Selamat Datang di Laman Perencanaan Budidaya Resirkulasi
      </h1>
      <div className="flex text-white gap-4 text-lg mb-4">
        {" "}
        <Link href="/guide">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Pelajari Lebih Lanjut
          </button>
        </Link>
        <Link href="/home">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Mulai Perencanaan
          </button>
        </Link>
      </div>
    </div>
  );
}
