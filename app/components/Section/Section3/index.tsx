import Image from "next/image";
import { useState } from "react";
import type { BentukKolam } from "../Section2";
import InputSatuan from "../../InputSatuan";

export type JenisIkan = "lele" | "nila";

interface Section3Props {
  ikan: JenisIkan;
  bentuk: BentukKolam;
  volumeKolam: number;
  volumeAir: number;
  onKembali: () => void;
  onHitung: (
    tebarAwal: number,
    survivalRate: number,
    bobotTarget: number,
  ) => void;
}

export default function Section3({
  ikan,
  bentuk,
  volumeKolam,
  volumeAir,
  onKembali,
  onHitung,
}: Section3Props) {
  const [dikonfirmasi, setDikonfirmasi] = useState(false);
  const [tebarAwal, setTebarAwal] = useState("");
  const [survivalRate, setSurvivalRate] = useState("");
  const [bobotTarget, setBobotTarget] = useState("");

  const hitungHasil = () => {
    const tebar = Number(tebarAwal);
    const sr = Number(survivalRate);
    const bobot = Number(bobotTarget);

    if (tebar < 0 || sr < 0 || sr > 100 || bobot < 0) {
      alert(
        "Masukkan tebar awal, survival rate (1-100%), dan bobot target yang valid.",
      );
      return;
    }

    onHitung(tebar, sr, bobot);
  };

  return (
    <section className="flex gap-35 px-6 text-white">
      <div>
        <h3 className="text-3xl font-bold">Informasi Kolam</h3>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 justify-between items-center rounded-xl border border-white/10 bg-[#242442] p-5 text-center">
            <h4 className="text-lg font-semibold text-[#efc07b]">
              Ikan yang Dipilih:
            </h4>
            <div className="flex items-center gap-2">
              <Image
                src={`/images/${ikan}.png`}
                alt={`Ikan ${ikan}`}
                width={50}
                height={50}
                className="mb-2 object-contain"
              />
              <p className="text-2xl font-bold capitalize">{ikan}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-between items-center rounded-xl border border-white/10 bg-[#242442] p-5 text-center">
            <h4 className="text-lg font-semibold text-[#efc07b]">
              Bentuk Kolam:
            </h4>
            <div className="flex items-center gap-2">
              <Image
                src={
                  bentuk === "persegi"
                    ? "/images/kolam_persegi.png"
                    : bentuk === "persegi-panjang"
                      ? "/images/kolam_persegi.png"
                      : bentuk === "lingkaran"
                        ? "/images/kolam_lingkaran.png"
                        : "/images/kolam_persegi.png"
                }
                alt={`Kolam ${bentuk}`}
                width={50}
                height={50}
                className="mb-2 object-contain"
              />
              <p className="text-2xl font-bold capitalize">
                {bentuk === "persegi"
                  ? "Persegi"
                  : bentuk === "persegi-panjang"
                    ? "Persegi Panjang"
                    : bentuk === "lingkaran"
                      ? "Lingkaran"
                      : "Custom"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-between items-center rounded-xl border border-white/10 bg-[#242442] p-5 text-center">
            <h4 className="text-lg font-semibold text-[#efc07b]">
              Volume Kolam:
            </h4>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold text-green-400">
                {volumeKolam.toFixed(2)}
              </p>
              <p className="mt-1 text-xl">m³</p>
            </div>
          </div>

          <div className="flex gap-3 justify-between items-center rounded-xl border border-white/10 bg-[#242442] p-5 text-center">
            <h4 className="text-lg font-semibold text-[#efc07b]">
              Volume Air Kolam:
            </h4>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold text-green-400">
                {volumeAir.toFixed(2)}
              </p>
              <p className="mt-1 text-xl">m³</p>
            </div>
          </div>
        </div>

        <div className="mt-6 gap-3 flex justify-center">
          <button
            type="button"
            onClick={onKembali}
            className="rounded-lg bg-[#efc07b] px-5 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a] cursor-pointer"
          >
            Hitung Ulang
          </button>
          <button
            type="button"
            onClick={() => setDikonfirmasi(true)}
            disabled={dikonfirmasi}
            className="rounded-lg bg-[#efc07b] px-5 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {dikonfirmasi ? "Sudah Dikonfirmasi" : "Konfirmasi"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label
          htmlFor="tebarAwal"
          className={`mb-2 block text-lg font-semibold ${dikonfirmasi ? "" : "opacity-50"}`}
        >
          Tebar Awal
        </label>
        <InputSatuan
          id="tebarAwal"
          value={tebarAwal}
          onChange={setTebarAwal}
          placeholder="Masukkan jumlah tebar awal"
          satuan="ekor"
          min={0}
          disabled={!dikonfirmasi}
        />
        <label
          htmlFor="survivalRate"
          className={`mb-2 block text-lg font-semibold ${dikonfirmasi ? "" : "opacity-50"}`}
        >
          Target Survival Rate
        </label>
        <InputSatuan
          id="survivalRate"
          value={survivalRate}
          onChange={setSurvivalRate}
          placeholder="Masukkan target survival rate"
          satuan="%"
          min={0}
          max={100}
          step={0.1}
          disabled={!dikonfirmasi}
        />
        <label
          htmlFor="bobotTarget"
          className={`mb-2 block text-lg font-semibold ${dikonfirmasi ? "" : "opacity-50"}`}
        >
          Bobot Target
        </label>
        <InputSatuan
          id="bobotTarget"
          value={bobotTarget}
          onChange={setBobotTarget}
          placeholder="Masukkan bobot target"
          satuan="g"
          min={0}
          disabled={!dikonfirmasi}
        />
        <button
          type="button"
          onClick={hitungHasil}
          disabled={!dikonfirmasi}
          className="mt-2 rounded-lg cursor-pointer bg-green-500 px-5 py-2 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
        >
          Hitung
        </button>
      </div>
    </section>
  );
}
