import Image from "next/image";
import { useState } from "react";
import InputSatuan from "../../InputSatuan";
import InputSatuanToggle from "../../InputSatuanToggle";

export type BentukKolam =
  | "persegi"
  | "persegi-panjang"
  | "lingkaran"
  | "kerucut"
  | "custom";

interface Section2Props {
  onBack: () => void;
  onComplete: (
    bentuk: BentukKolam,
    volumeKolam: number,
    volumeAir: number,
  ) => void;
}

export default function Section2({ onBack, onComplete }: Section2Props) {
  const [bentuk, setBentuk] = useState<BentukKolam>("persegi");

  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [diameter, setDiameter] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [tinggiAtas, setTinggiAtas] = useState("");
  const [tinggiBawah, setTinggiBawah] = useState("");
  const [kedalamanAir, setKedalamanAir] = useState("");
  const [volumeKolamCustom, setVolumeKolamCustom] = useState("");
  const [satuanKedalaman, setSatuanKedalaman] = useState("%");

  const hitungVolume = () => {
    const t = Number(tinggi);
    const kedalaman = Number(kedalamanAir);

    if (bentuk === "kerucut") {
      const d = Number(diameter);
      const tAtas = Number(tinggiAtas);
      const tBawah = Number(tinggiBawah);
      const kedalamanMeter = kedalaman / 100;

      if (
        !diameter ||
        !tinggiAtas ||
        !tinggiBawah ||
        !kedalamanAir ||
        !Number.isFinite(d) ||
        !Number.isFinite(tAtas) ||
        !Number.isFinite(tBawah) ||
        !Number.isFinite(kedalamanMeter) ||
        d <= 0 ||
        tAtas <= 0 ||
        tBawah <= 0 ||
        kedalaman <= 0
      ) {
        alert("Masukkan diameter, tinggi kolam, dan kedalaman air yang valid.");
        return;
      }

      if (kedalamanMeter < tBawah || kedalamanMeter > tAtas + tBawah) {
        alert(
          "Kedalaman air harus minimal setinggi kerucut bawah dan tidak melebihi tinggi total kolam.",
        );
        return;
      }

      const luasPenampang = Math.PI * Math.pow(d / 2, 2);
      const volumeAtas = luasPenampang * tAtas;
      const volumeBawah = (luasPenampang * tBawah) / 3;
      const volumeKolam = volumeAtas + volumeBawah;
      const ketinggianAirAtas = kedalamanMeter - tBawah;
      const volumeAir = volumeBawah + luasPenampang * ketinggianAirAtas;

      onComplete("kerucut", volumeKolam, volumeAir);
      return;
    }

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

    if (satuanKedalaman === "%") {
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
        <div className="flex gap-4">
          <button
            onClick={() => setBentuk("persegi")}
            className={`flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center rounded-lg p-4 transition-opacity ${
              bentuk === "persegi"
                ? "bg-blue-500 opacity-100 hover:bg-blue-700"
                : "bg-blue-500 opacity-40 hover:opacity-70"
            }`}
          >
            {" "}
            <Image
              src="/images/kolam_persegi.png"
              alt="Kolam persegi"
              width={1254}
              height={1254}
              className="h-20 w-20 object-contain"
            />
          </button>
          <button
            onClick={() => setBentuk("lingkaran")}
            className={`flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center rounded-lg p-4 transition-opacity ${
              bentuk === "lingkaran"
                ? "bg-blue-500 opacity-100 hover:bg-blue-700"
                : "bg-blue-500 opacity-40 hover:opacity-70"
            }`}
          >
            {" "}
            <Image
              src="/images/kolam_lingkaran.png"
              alt="Kolam lingkaran"
              width={1254}
              height={1254}
              className="h-20 w-20 object-contain"
            />
          </button>
          <button
            onClick={() => setBentuk("kerucut")}
            className={`flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center rounded-lg p-4 transition-opacity ${
              bentuk === "kerucut"
                ? "bg-blue-500 opacity-100 hover:bg-blue-700"
                : "bg-blue-500 opacity-40 hover:opacity-70"
            }`}
          >
            {" "}
            <Image
              src="/images/kolam_kerucut.png"
              alt="Kolam berbentuk kerucut"
              width={1024}
              height={1536}
              className="h-20 w-20 object-contain"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setBentuk("custom");
              setSatuanKedalaman("%");
              setKedalamanAir("");
            }}
            className={`cursor-pointer rounded-lg px-5 font-bold transition-opacity ${
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
                placeholder={"Masukkan meter kubik"}
                satuan={"m³"}
              />
              <label className="self-center">Kedalaman Air</label>
              <InputSatuan
                id="kedalamanAir"
                value={kedalamanAir}
                onChange={setKedalamanAir}
                placeholder={"Masukkan persentase (0.1-100%)"}
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
                placeholder={"Masukkan meter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Lebar</label>
              <InputSatuan
                id="lebar"
                value={lebar}
                onChange={setLebar}
                placeholder={"Masukkan meter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Tinggi</label>
              <InputSatuan
                id="tinggi"
                value={tinggi}
                onChange={setTinggi}
                placeholder={"Masukkan meter"}
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
                placeholder={`Masukkan ${satuanKedalaman === "%" ? "persentase (0.1-100%)" : "centimeter"}`}
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
                placeholder={"Masukkan meter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Tinggi</label>
              <InputSatuan
                id="tinggi"
                value={tinggi}
                onChange={setTinggi}
                placeholder={"Masukkan meter"}
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
                placeholder={`Masukkan ${satuanKedalaman === "%" ? "persentase (0.1-100%)" : "centimeter"}`}
                min={0.1}
                max={100}
                step={0.1}
                pilihanSatuan={["%", "cm"]}
              />
            </>
          )}
          {bentuk === "kerucut" && (
            <>
              <label className="self-center">Diameter</label>
              <InputSatuan
                id="diameter"
                value={diameter}
                onChange={setDiameter}
                placeholder={"Masukkan meter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Tinggi Tabung Atas</label>
              <InputSatuan
                id="tinggiAtas"
                value={tinggiAtas}
                onChange={setTinggiAtas}
                placeholder={"Masukkan meter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Tinggi Kerucut Bawah</label>
              <InputSatuan
                id="tinggiBawah"
                value={tinggiBawah}
                onChange={setTinggiBawah}
                placeholder={"Masukkan meter"}
                satuan={"m"}
                min={0.1}
                step={0.1}
              />
              <label className="self-center">Kedalaman Air</label>
              <InputSatuan
                id="kedalamanAir"
                value={kedalamanAir}
                onChange={setKedalamanAir}
                satuan={"cm"}
                placeholder={"Masukkan centimeter"}
                min={0.1}
                step={0.1}
              />
            </>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded bg-[#efc07b] px-4 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a]"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={hitungVolume}
            className="cursor-pointer rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Hitung
          </button>
        </div>
      </div>
    </section>
  );
}
