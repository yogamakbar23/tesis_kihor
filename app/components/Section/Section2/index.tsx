import Image from "next/image";
import { useState } from "react";
import InputSatuan from "../../InputSatuan";
import InputSatuanToggle from "../../InputSatuanToggle";

export type BentukKolam =
  | "persegi"
  | "persegi-panjang"
  | "lingkaran"
  | "custom";

interface Section2Props {
  onComplete: (
    bentuk: BentukKolam,
    volumeKolam: number,
    volumeAir: number,
  ) => void;
}

export default function Section2({ onComplete }: Section2Props) {
  const [bentuk, setBentuk] = useState<BentukKolam>("persegi");

  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [diameter, setDiameter] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [kedalamanAir, setKedalamanAir] = useState("");
  const [volumeKolamCustom, setVolumeKolamCustom] = useState("");
  const [satuanKedalaman, setSatuanKedalaman] = useState("%");

  const hitungVolume = () => {
    const t = Number(tinggi);
    const kedalaman = Number(kedalamanAir);

    if (bentuk === "custom") {
      const volumeKolam = Number(volumeKolamCustom);

      if (
        !volumeKolamCustom ||
        volumeKolam <= 0 ||
        !kedalamanAir ||
        kedalaman <= 0 ||
        kedalaman > 100
      ) {
        alert("Masukkan volume kolam dan kedalaman air (1-100%) yang valid.");
        return;
      }

      onComplete("custom", volumeKolam, volumeKolam * (kedalaman / 100));
      return;
    }

    if (!tinggi || !kedalamanAir || t <= 0 || kedalaman <= 0) {
      alert("Masukkan tinggi dan kedalaman air yang valid.");
      return;
    }

    let kedalamanMeter = 0;

    if (satuanKedalaman === "persen") {
      if (kedalaman > 100) {
        alert("Kedalaman air dalam persen tidak boleh lebih dari 100%.");
        return;
      }
      kedalamanMeter = t * (kedalaman / 100);
    } else {
      kedalamanMeter = kedalaman / 100;
      if (kedalamanMeter > t) {
        alert(`Kedalaman air tidak boleh lebih dari ${t * 100} cm.`);
        return;
      }
    }

    const rasioKedalaman = kedalamanMeter / t;

    if (rasioKedalaman <= 0 || rasioKedalaman > 1) {
      alert("Periksa kembali tinggi dan kedalaman air.");
      return;
    }

    let volumeKolam = 0;
    let volumeAir = 0;

    if (bentuk === "persegi") {
      const p = Number(panjang);
      const l = Number(lebar);

      if (!panjang || !lebar || p <= 0 || l <= 0) {
        alert("Masukkan panjang dan lebar yang valid.");
        return;
      }

      volumeKolam = p * l * t;
      volumeAir = volumeKolam * rasioKedalaman;
      onComplete(
        p === l ? "persegi" : "persegi-panjang",
        volumeKolam,
        volumeAir,
      );
      return;
    } else {
      const d = Number(diameter);

      if (!diameter || d <= 0) {
        alert("Masukkan diameter yang valid.");
        return;
      }

      volumeKolam = Math.PI * Math.pow(d / 2, 2) * t;
      volumeAir = volumeKolam * rasioKedalaman;
      onComplete("lingkaran", volumeKolam, volumeAir);
    }
  };

  return (
    <section className="flex text-white justify-center gap-35">
      <div className="">
        <h3 className="text-3xl mb-2 font-bold">
          Silakan Pilih dan Hitung Volume Kolam Anda
        </h3>
        <p className="">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <button
            onClick={() => setBentuk("persegi")}
            className={`cursor-pointer rounded-lg p-4 mr-4 transition-opacity ${
              bentuk === "persegi"
                ? "bg-blue-500 opacity-100 hover:bg-blue-700"
                : "bg-blue-500 opacity-40 hover:opacity-70"
            }`}
          >
            {" "}
            <Image
              src="/images/kolam_persegi.png"
              alt="section2"
              width={75}
              height={75}
              className="w-full h-full"
            />
          </button>
          <button
            onClick={() => setBentuk("lingkaran")}
            className={`cursor-pointer rounded-lg p-4 transition-opacity ${
              bentuk === "lingkaran"
                ? "bg-blue-500 opacity-100 hover:bg-blue-700"
                : "bg-blue-500 opacity-40 hover:opacity-70"
            }`}
          >
            {" "}
            <Image
              src="/images/kolam_lingkaran.png"
              alt="section2"
              width={75}
              height={75}
              className="w-full h-full"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setBentuk("custom");
              setSatuanKedalaman("%");
              setKedalamanAir("");
            }}
            className={`ml-4 cursor-pointer rounded-lg px-5 font-bold transition-opacity ${
              bentuk === "custom"
                ? "bg-blue-500 opacity-100 hover:bg-blue-700"
                : "bg-blue-500 opacity-40 hover:opacity-70"
            }`}
          >
            Custom
          </button>
        </div>

        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-3">
          {bentuk === "custom" && (
            <>
              <label className="self-center">Volume Kolam</label>
              <InputSatuan
                id="volumeKolam"
                min={0.1}
                step={0.1}
                value={volumeKolamCustom}
                onChange={setVolumeKolamCustom}
                placeholder={"Masukkan Volume Kolam"}
                satuan={"m³"}
              />
              <label className="self-center">Kedalaman Air</label>
              <InputSatuan
                id="kedalamanAir"
                value={kedalamanAir}
                onChange={setKedalamanAir}
                placeholder={"Masukkan Kedalaman Air"}
                satuan={"%"}
                min={0.1}
                max={100}
                step={0.1}
              />
            </>
          )}
          {bentuk === "persegi" && (
            <>
              <label className="self-center">Panjang</label>

              <InputSatuan
                id="panjang"
                value={panjang}
                onChange={setPanjang}
                placeholder={"Masukkan Panjang"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Lebar</label>
              <InputSatuan
                id="lebar"
                value={lebar}
                onChange={setLebar}
                placeholder={"Masukkan Lebar"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Tinggi</label>
              <InputSatuan
                id="tinggi"
                value={tinggi}
                onChange={setTinggi}
                placeholder={"Masukkan Tinggi"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center"> Kedalaman Air</label>

              <InputSatuanToggle
                id="kedalamanAir"
                value={kedalamanAir}
                onChange={setKedalamanAir}
                satuan={satuanKedalaman}
                onSatuanChange={setSatuanKedalaman}
                placeholder={`Masukkan ${satuanKedalaman === "persen" ? "persentase" : "centimeter"}`}
                min={0.1}
                max={100}
                step={0.1}
                pilihanSatuan={["%", "cm"]}
              />
            </>
          )}{" "}
          {bentuk === "lingkaran" && (
            <>
              <label className="self-center">Diameter</label>
              <InputSatuan
                id="diameter"
                value={diameter}
                onChange={setDiameter}
                placeholder={"Masukkan Diameter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Tinggi</label>
              <InputSatuan
                id="tinggi"
                value={tinggi}
                onChange={setTinggi}
                placeholder={"Masukkan Tinggi"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center"> Kedalaman Air</label>
              <InputSatuanToggle
                id="kedalamanAir"
                value={kedalamanAir}
                onChange={setKedalamanAir}
                satuan={satuanKedalaman}
                onSatuanChange={setSatuanKedalaman}
                placeholder={`Masukkan ${satuanKedalaman === "persen" ? "persentase" : "centimeter"}`}
                min={0.1}
                max={100}
                step={0.1}
                pilihanSatuan={["%", "cm"]}
              />
            </>
          )}
        </div>
        <button
          onClick={hitungVolume}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Hitung
        </button>
      </div>
    </section>
  );
}
