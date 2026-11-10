import Image from "next/image";

interface Section1Props {
  onSelectIkan: (ikan: "lele" | "nila") => void;
}

export default function Section1({ onSelectIkan }: Section1Props) {
  return (
    <section className="text-white">
      <div className="flex justify-center gap-35">
        <div className="flex flex-col text-left">
          <h3 className="text-3xl mb-2 font-bold mb-4">
            Silakan Pilih Ikan Anda
          </h3>
          <p className="">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => onSelectIkan("lele")}
          >
            <Image
              src="/images/lele.png"
              alt="Logo"
              width={200}
              height={200}
              className="mb-4"
              loading="lazy"
            />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => onSelectIkan("nila")}
          >
            <Image
              src="/images/nila.png"
              alt="Logo"
              width={200}
              height={200}
              className="mb-4"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
