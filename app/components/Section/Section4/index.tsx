"use client";

import { useState } from "react";
import type { JenisIkan } from "../Section3";
import InputSatuan from "../../InputSatuan";
import InputSatuanToggle from "../../InputSatuanToggle";

interface Section4Props {
  ikan: JenisIkan;
  tebarAwal: number;
  survivalRate: number;
  bobotTarget: number;
  hasilKg: number;
  onLanjut: (
    hasilKg: number,
    rasioPakan: number,
    proteinPakan: number,
    keteranganPakan: string,
    pakanHarianGram?: number,
  ) => void;
}

export default function Section4({
  ikan,
  tebarAwal,
  survivalRate,
  bobotTarget,
  hasilKg,
  onLanjut,
}: Section4Props) {
  const [pilihan, setPilihan] = useState<3 | 5 | "custom">(3);
  const [satuanCustom, setSatuanCustom] = useState("%");
  const [persentaseCustom, setPersentaseCustom] = useState("");
  const [proteinPakan, setProteinPakan] = useState("");

  const hitungPakanDanLanjut = () => {
    const protein = Number(proteinPakan);

    let rasioPakan: number;
    let keteranganPakan: string;
    let pakanHarianGram: number | undefined;

    if (pilihan === 3 || pilihan === 5) {
      rasioPakan = pilihan / 100;
      keteranganPakan = `${pilihan}% dari biomasa akhir`;
    } else {
      const nilaiCustom = Number(persentaseCustom);

      if (!nilaiCustom || nilaiCustom <= 0) {
        alert("Masukkan jumlah pemberian pakan harian yang valid.");
        return;
      }

      if (satuanCustom === "g") {
        pakanHarianGram = nilaiCustom;
        rasioPakan = 0;
        keteranganPakan = `${nilaiCustom.toLocaleString("id-ID")} gram/hari`;
      } else {
        if (nilaiCustom > 100) {
          alert("Persentase pemberian pakan tidak boleh lebih dari 100%.");
          return;
        }
        rasioPakan = nilaiCustom / 100;
        keteranganPakan = `${nilaiCustom.toLocaleString("id-ID")}% dari estimasi hasil panen`;
      }
    }

    if (!proteinPakan || protein <= 0 || protein > 100) {
      alert("Masukkan kadar protein pakan antara 1-100%.");
      return;
    }

    onLanjut(hasilKg, rasioPakan, protein, keteranganPakan, pakanHarianGram);
  };

  const pilihPersentase = (nilai: 3 | 5) => {
    setPilihan(nilai);
    setPersentaseCustom("");
  };

  return (
    <section className="flex text-white gap-35">
      <div className="flex flex-col gap-3">
        <h3 className=" text-center text-3xl font-bold">Hasil Perhitungan</h3>

        <div className="grid grid-cols-2 w-[400px] gap-4">
          <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
            <p className="text-[#efc07b]">Jenis Ikan</p>
            <p className="mt-1 text-2xl font-bold capitalize">{ikan}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
            <p className="text-[#efc07b]">Tebar Awal</p>
            <p className="mt-1 text-2xl font-bold">
              {tebarAwal.toLocaleString("id-ID")} ekor
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
            <p className="text-[#efc07b]">Estimasi Survival Rate</p>
            <p className="mt-1 text-2xl font-bold">{survivalRate}%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
            <p className="text-[#efc07b]">Bobot Target</p>
            <p className="mt-1 text-2xl font-bold">{bobotTarget} g</p>
          </div>
        </div>

        <div className=" rounded-xl border border-green-400/40 bg-green-950/40 p-6 text-center">
          <p className="text-lg font-semibold text-[#efc07b]">
            Estimasi Hasil Panen
          </p>
          <p className="mt-2 text-5xl font-bold text-green-400">
            {hasilKg.toLocaleString("id-ID", { maximumFractionDigits: 2 })} kg
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className=" text-center text-3xl font-bold">Masukkan Data Pakan</h3>

        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#242442] p-5">
          <p className="font-semibold text-[#efc07b]">Pemberian Pakan Harian</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => pilihPersentase(3)}
              className={`cursor-pointer rounded-lg w-20 px-5 py-2 font-bold ${
                pilihan === 3
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              3%
            </button>
            <button
              type="button"
              onClick={() => pilihPersentase(5)}
              className={`cursor-pointer rounded-lg w-20 px-5 py-2 font-bold ${
                pilihan === 5
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              5%
            </button>
            <button
              type="button"
              onClick={() => {
                setPilihan("custom");
              }}
              className={`cursor-pointer rounded-lg px-5 py-2 font-bold ${
                pilihan === "custom"
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              Custom
            </button>
          </div>

          {pilihan === "custom" && (
            <InputSatuanToggle
              id="pakanHarianCustom"
              value={persentaseCustom}
              onChange={setPersentaseCustom}
              satuan={satuanCustom === "%" ? "%" : "g"}
              onSatuanChange={setSatuanCustom}
              pilihanSatuan={["%", "g"]}
              placeholder={
                satuanCustom === "%"
                  ? "Masukkan jumlah persen"
                  : "Masukkan jumlah gram"
              }
            />
          )}
          <label
            htmlFor="proteinPakan"
            className="font-semibold text-[#efc07b]"
          >
            Kadar Protein Pakan
          </label>

          <InputSatuan
            id="proteinPakan"
            value={proteinPakan}
            onChange={setProteinPakan}
            placeholder="Masukkan kadar protein"
            satuan="%"
            min={0}
            max={100}
          />

          <button
            type="button"
            onClick={hitungPakanDanLanjut}
            className="cursor-pointer rounded-lg bg-green-500 px-5 py-2 font-bold text-white hover:bg-green-700"
          >
            Hitung
          </button>
        </div>
      </div>
    </section>
  );
}
