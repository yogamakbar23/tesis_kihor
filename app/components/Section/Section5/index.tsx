"use client";

import { useState } from "react";
import InputSatuan from "../../InputSatuan";

const TABEL_CT = [
  [0, 14.6],
  [2, 13.81],
  [4, 13.09],
  [6, 12.44],
  [8, 11.83],
  [10, 11.26],
  [12, 10.77],
  [14, 10.29],
  [16, 9.86],
  [18, 9.45],
  [20, 9.08],
  [22, 8.73],
  [24, 8.4],
  [26, 8.09],
  [28, 7.81],
  [30, 7.54],
  [32, 7.29],
  [34, 7.05],
] as const;

const hitungCt = (suhu: number) => {
  for (let index = 0; index < TABEL_CT.length - 1; index++) {
    const [suhu1, ct1] = TABEL_CT[index];
    const [suhu2, ct2] = TABEL_CT[index + 1];

    if (suhu <= suhu2) {
      return ct1 + ((suhu - suhu1) / (suhu2 - suhu1)) * (ct2 - ct1);
    }
  }

  return TABEL_CT[TABEL_CT.length - 1][1];
};

interface Section5Props {
  hasilKg: number;
  rasioPakan: number;
  proteinPakan: number;
  keteranganPakan: string;
  suhu: number;
  kedalamanDifuser: number;
  pakanHarianGram?: number;
  initialBiofilter: "kaldnes-k1" | "bioball" | null;
  initialFilterMekanis: boolean | null;
  initialLuasJapmatM2: number | null;
  onKembali: () => void;
  onLanjut: (
    jenisBiofilter: "kaldnes-k1" | "bioball",
    filterMekanis: boolean,
    luasJapmatM2: number | null,
  ) => void;
}
export default function Section5({
  hasilKg,
  rasioPakan,
  proteinPakan,
  keteranganPakan,
  suhu,
  kedalamanDifuser,
  pakanHarianGram,
  initialBiofilter,
  initialFilterMekanis,
  initialLuasJapmatM2,
  onKembali,
  onLanjut,
}: Section5Props) {
  const [jenisBiofilter, setJenisBiofilter] = useState<
    "kaldnes-k1" | "bioball" | null
  >(initialBiofilter);
  const [filterMekanis, setFilterMekanis] = useState<boolean | null>(
    initialFilterMekanis,
  );
  const [modelJapmat, setModelJapmat] = useState<"persegi" | "lingkaran">(
    "persegi",
  );
  const initialSisiJapmat =
    initialLuasJapmatM2 === null
      ? ""
      : Math.sqrt(initialLuasJapmatM2 * 10000).toString();
  const [panjangJapmat, setPanjangJapmat] = useState(initialSisiJapmat);
  const [lebarJapmat, setLebarJapmat] = useState(initialSisiJapmat);
  const [diameterJapmat, setDiameterJapmat] = useState("");
  const pemberianPakanKg =
    pakanHarianGram !== undefined
      ? pakanHarianGram / 1000
      : hasilKg * rasioPakan;
  const ro2 = pemberianPakanKg * 1;
  const aor = ro2 / 24;
  const ct = hitungCt(suhu);
  const sotr = aor / (0.77 * ((0.94 * ct - 5) / 9.08) * 1.024 ** (suhu - 20));
  const sote = 2.67 * (kedalamanDifuser / 100);
  const q = (sotr / (0.28 * (sote / 100))) * (100 / 60);
  const panjangJapmatCm = Number(panjangJapmat);
  const lebarJapmatCm = Number(lebarJapmat);
  const diameterJapmatCm = Number(diameterJapmat);
  const luasJapmatCm2 =
    modelJapmat === "persegi"
      ? Number.isFinite(panjangJapmatCm) &&
        Number.isFinite(lebarJapmatCm) &&
        panjangJapmatCm > 0 &&
        lebarJapmatCm > 0
        ? panjangJapmatCm * lebarJapmatCm
        : null
      : Number.isFinite(diameterJapmatCm) && diameterJapmatCm > 0
        ? Math.PI * (diameterJapmatCm / 2) ** 2
        : null;
  const luasJapmatM2 = luasJapmatCm2 === null ? null : luasJapmatCm2 / 10000;

  const lanjutkan = () => {
    if (!jenisBiofilter) return;
    if (filterMekanis === null) {
      alert("Pilih apakah menggunakan filter mekanis.");
      return;
    }

    if (filterMekanis) {
      if (luasJapmatM2 === null) {
        alert("Masukkan ukuran Japmat yang lebih dari 0 cm.");
        return;
      }
      onLanjut(jenisBiofilter, true, luasJapmatM2);
      return;
    }

    onLanjut(jenisBiofilter, false, null);
  };

  return (
    <section className="flex gap-35 text-white">
      <div className="flex w-[430px] flex-col gap-4">
        <h3 className="text-center text-3xl font-bold">Kebutuhan Aerasi</h3>

        <div className="rounded-xl border border-green-400/40 bg-green-950/40 p-6">
          <p className="text-center text-lg text-[#efc07b]">
            Kebutuhan Aerasi (Q)
          </p>
          <p className="mt-3 text-center text-5xl font-bold text-green-400">
            {q.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
            LPM
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[#242442] p-4">
            <p className="text-sm text-[#efc07b]">SOTE</p>
            <p className="mt-1 font-bold">
              {sote.toLocaleString("id-ID", { maximumFractionDigits: 3 })}%
            </p>
          </div>
          <div className="rounded-lg bg-[#242442] p-4">
            <p className="text-sm text-[#efc07b]">SOTR</p>
            <p className="mt-1 font-bold">
              {sotr.toLocaleString("id-ID", { maximumFractionDigits: 4 })} kg
              O₂/jam
            </p>
          </div>
          <div className="rounded-lg bg-[#242442] p-4">
            <p className="text-sm text-[#efc07b]">AOR</p>
            <p className="mt-1 font-bold">
              {aor.toLocaleString("id-ID", { maximumFractionDigits: 4 })} kg
              O₂/jam
            </p>
          </div>
          <div className="rounded-lg bg-[#242442] p-4">
            <p className="text-sm text-[#efc07b]">RO2</p>
            <p className="mt-1 font-bold">
              {ro2.toLocaleString("id-ID", { maximumFractionDigits: 4 })} kg
              O₂/hari
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-center text-3xl font-bold">Input Tipe Filter</h3>

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
            <p className="font-semibold text-[#efc07b]">Jenis Biofilter</p>
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
            <p className=" font-semibold text-[#efc07b]">
              Menggunakan filter mekanis?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFilterMekanis(true)}
                className={`cursor-pointer rounded-lg px-4 py-2 font-bold uppercase ${
                  filterMekanis === true
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Ya
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterMekanis(false);
                  setPanjangJapmat("");
                  setLebarJapmat("");
                  setDiameterJapmat("");
                }}
                className={`cursor-pointer rounded-lg px-4 py-2 font-bold uppercase ${
                  filterMekanis === false
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Tidak
              </button>
            </div>
            {filterMekanis && (
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#efc07b]">Model Japmat</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModelJapmat("persegi")}
                    className={`cursor-pointer rounded-lg px-4 py-2 font-bold uppercase ${
                      modelJapmat === "persegi"
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    Persegi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModelJapmat("lingkaran");
                    }}
                    className={`cursor-pointer rounded-lg px-4 py-2 font-bold uppercase ${
                      modelJapmat === "lingkaran"
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    Lingkaran
                  </button>
                </div>
                {modelJapmat === "persegi" ? (
                  <>
                    <label
                      htmlFor="panjangJapmat"
                      className="font-semibold text-[#efc07b]"
                    >
                      Panjang Japmat
                    </label>
                    <InputSatuan
                      id="panjangJapmat"
                      value={panjangJapmat}
                      onChange={setPanjangJapmat}
                      placeholder="Masukkan panjang"
                      satuan="cm"
                      min={0.1}
                      step={0.1}
                    />
                    <label
                      htmlFor="lebarJapmat"
                      className="font-semibold text-[#efc07b]"
                    >
                      Lebar Japmat
                    </label>
                    <InputSatuan
                      id="lebarJapmat"
                      value={lebarJapmat}
                      onChange={setLebarJapmat}
                      placeholder="Masukkan lebar"
                      satuan="cm"
                      min={0.1}
                      step={0.1}
                    />
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="diameterJapmat"
                      className="font-semibold text-[#efc07b]"
                    >
                      Diameter Japmat
                    </label>
                    <InputSatuan
                      id="diameterJapmat"
                      value={diameterJapmat}
                      onChange={setDiameterJapmat}
                      placeholder="Masukkan diameter"
                      satuan="cm"
                      min={0.1}
                      step={0.1}
                    />
                  </>
                )}
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onKembali}
                className="cursor-pointer rounded-lg bg-[#efc07b] px-5 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a]"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={lanjutkan}
                disabled={jenisBiofilter === null}
                className="cursor-pointer rounded-lg bg-[#efc07b] px-5 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
