"use client";

import { useState } from "react";

interface Section5Props {
  hasilKg: number;
  rasioPakan: number;
  proteinPakan: number;
  keteranganPakan: string;
  pakanHarianGram?: number;
  onLanjut: (jenisBiofilter: "kaldnes-k1" | "bioball") => void;
}
export default function Section5({
  hasilKg,
  rasioPakan,
  proteinPakan,
  keteranganPakan,
  pakanHarianGram,
  onLanjut,
}: Section5Props) {
  const [jenisBiofilter, setJenisBiofilter] = useState<
    "kaldnes-k1" | "bioball" | null
  >(null);
  const kebutuhanLpm =
    pakanHarianGram !== undefined
      ? pakanHarianGram / (0.28 * 1.3 * 1440)
      : (hasilKg * rasioPakan * 1000) / (0.28 * (1.3 / 100) * 1440);

  return (
    <section className="flex gap-35 text-white">
      <div className="flex w-[430px] flex-col gap-4">
        <h3 className="text-center text-3xl font-bold">Kebutuhan Aerasi</h3>

        <div className="rounded-xl border border-green-400/40 bg-green-950/40 p-6">
          <p className="text-center text-lg text-[#efc07b]">Kebutuhan Aerasi</p>
          <p className="mt-3 text-center text-5xl font-bold text-green-400">
            {kebutuhanLpm.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
            LPM
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-center text-3xl font-bold">
          Input Jenis Biofilter
        </h3>

        <div className="flex gap-4 rounded-xl border border-white/10 bg-[#242442] p-5">
          <div className="mb-5 flex flex-col gap-3">
            <div className="rounded-lg bg-[#1a1a2e] p-4">
              <p className="text-sm text-[#efc07b]">Pakan Harian</p>
              <p className="mt-1 font-bold">{keteranganPakan}</p>
            </div>
            <div className="rounded-lg bg-[#1a1a2e] p-4">
              <p className="text-sm text-[#efc07b]">Kadar Protein Pakan</p>
              <p className="mt-1 font-bold">{proteinPakan}%</p>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-3">
            <p className="mb-3 font-semibold text-[#efc07b]">Jenis Biofilter</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setJenisBiofilter("kaldnes-k1")}
                className={`cursor-pointer rounded-lg px-4 py-2 font-bold uppercase ${
                  jenisBiofilter === "kaldnes-k1"
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Kaldnes K1
              </button>
              <button
                type="button"
                onClick={() => setJenisBiofilter("bioball")}
                className={`cursor-pointer rounded-lg px-4 py-2 font-bold uppercase ${
                  jenisBiofilter === "bioball"
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Bioball
              </button>
            </div>
            <button
              type="button"
              onClick={() => jenisBiofilter && onLanjut(jenisBiofilter)}
              disabled={jenisBiofilter === null}
              className="cursor-pointer rounded-lg bg-[#efc07b] px-5 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
