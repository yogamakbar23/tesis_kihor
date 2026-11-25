"use client";

interface Section6Props {
  hasilKg: number;
  rasioPakan: number;
  proteinPakan: number;
  keteranganPakan: string;
  fbk: number;
  pakanHarianGram?: number;
  filterMekanis: boolean;
  luasJapmatM2: number | null;
  onKembali: () => void;
  jenisBiofilter: "kaldnes-k1" | "bioball";
}

export default function Section6({
  hasilKg,
  rasioPakan,
  proteinPakan,
  keteranganPakan,
  fbk,
  pakanHarianGram,
  filterMekanis,
  luasJapmatM2,
  onKembali,
  jenisBiofilter,
}: Section6Props) {
  const pemberianPakanKg =
    pakanHarianGram !== undefined
      ? pakanHarianGram / 1000
      : hasilKg * rasioPakan;
  const pTanKg = pemberianPakanKg * (proteinPakan / 100) * 0.092;
  const pTanGram = pTanKg * 1000;
  const pTanMg = pTanGram * 1000;
  const atr = jenisBiofilter === "bioball" ? 0.2 : 0.28;
  const ssa = jenisBiofilter === "bioball" ? 378 : 500;
  const cOut = jenisBiofilter === "bioball" ? 1.834 : 1.766;
  const q = pTanMg / (2 - cOut);
  const lph = q / 12;
  const aMedia = (pTanKg * 1000) / atr;
  const vMedia = aMedia / ssa;
  const vWadah = vMedia / 0.7;
  const ptss = 0.25 * fbk * pemberianPakanKg;
  const mb = ptss * 0.3;
  const jumlahBrush = Math.ceil(mb / 0.0001435);
  const aj = (9.6 * ptss) / fbk;
  const jumlahJapmat =
    filterMekanis && luasJapmatM2 !== null && luasJapmatM2 > 0
      ? Math.ceil(aj / luasJapmatM2)
      : null;

  return (
    <section className="flex flex-col gap-6 text-white">
      <h3 className="text-center text-3xl font-bold">
        Perhitungan P TAN, Q, dan Kebutuhan Media Biofilter
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
          <p className="text-[#efc07b]">Pemberian Pakan Maksimum</p>
          <p className="mt-1 text-2xl font-bold">
            {pemberianPakanKg.toLocaleString("id-ID", {
              maximumFractionDigits: 3,
            })}{" "}
            kg/hari
          </p>
          <p className="mt-1 text-sm text-gray-300">{keteranganPakan}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
          <p className="text-[#efc07b]">Kadar Protein Pakan</p>
          <p className="mt-1 text-2xl font-bold">{proteinPakan}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-green-400/40 bg-green-950/40 p-6 text-center">
        <p className="text-lg font-semibold text-[#efc07b]">
          Hasil Perhitungan P TAN
        </p>
        <p className="mt-2 text-5xl font-bold text-green-400">
          {pTanKg.toLocaleString("id-ID", {
            maximumFractionDigits: 4,
          })}{" "}
          kg/hari
        </p>
      </div>

      <div className="flex gap-4 w-full ">
        <div className="flex-1 rounded-xl border border-white/10 bg-[#242442] p-5">
          <p className="text-[#efc07b]">Kebutuhan Brush Filter</p>
          <p className="mt-2 text-3xl font-bold">
            {jumlahBrush.toLocaleString("id-ID")} brush
          </p>
        </div>
        {filterMekanis && (
          <div className="flex-1 rounded-xl border border-white/10 bg-[#242442] p-5">
            <p className="text-[#efc07b]">Kebutuhan Filter Japmat</p>
            {jumlahJapmat === null ? (
              <p className="mt-2 text-xl font-bold">—</p>
            ) : (
              <p className="mt-2 text-3xl font-bold">
                {jumlahJapmat.toLocaleString("id-ID")} lembar
              </p>
            )}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
        <h4 className="mb-4 text-xl font-bold text-[#efc07b]">
          Perhitungan Kebutuhan Media Biofilter
        </h4>
        <p className="mb-4 text-gray-300">
          Biofilter: {jenisBiofilter === "bioball" ? "Bioball" : "Kaldnes K1"}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Kebutuhan Luas Permukaan Biofilter</p>
            <p className="mt-2 text-2xl font-bold">
              {aMedia.toLocaleString("id-ID", { maximumFractionDigits: 4 })} m²
            </p>
          </div>
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Kebutuhan Volume Biofilter</p>
            <p className="mt-2 text-2xl font-bold">
              {vMedia.toLocaleString("id-ID", { maximumFractionDigits: 4 })} m³
            </p>
          </div>
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Kebutuhan Wadah Biofilter</p>
            <p className="mt-2 text-2xl font-bold">
              {vWadah.toLocaleString("id-ID", { maximumFractionDigits: 4 })} m³
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#242442] p-5">
        <h4 className="mb-4 text-xl font-bold text-[#efc07b]">
          Perhitungan P TAN dan Debit Q
        </h4>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Produksi TAN Harian</p>
            <p className="mt-2 text-2xl font-bold">
              {pTanGram.toLocaleString("id-ID", { maximumFractionDigits: 4 })} g
            </p>
          </div>
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Produksi TAN Harian</p>
            <p className="mt-2 text-2xl font-bold">
              {pTanMg.toLocaleString("id-ID", { maximumFractionDigits: 2 })} mg
            </p>
          </div>
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Kebutuhan Debit Pompa</p>
            <p className="mt-2 text-2xl font-bold">
              {q.toLocaleString("id-ID", { maximumFractionDigits: 2 })} LPD
            </p>
          </div>
          <div className="rounded-lg bg-[#1a1a2e] p-4">
            <p className="text-[#efc07b]">Kebutuhan Debit Pompa</p>
            <p className="mt-2 text-2xl font-bold">
              {lph.toLocaleString("id-ID", { maximumFractionDigits: 2 })} LPH
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onKembali}
        className="cursor-pointer rounded-lg bg-[#efc07b] px-5 py-2 font-bold text-[#1a1a2e] hover:bg-[#f5cf9a]"
      >
        Kembali
      </button>
    </section>
  );
}
