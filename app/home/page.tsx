"use client";

import Image from "next/image";
import Section1 from "../components/Section/Section1";
import Link from "next/link";
import { useState } from "react";
import Section2 from "../components/Section/Section2";
import Section3 from "../components/Section/Section3";
import Section4 from "../components/Section/Section4";
import Section5 from "../components/Section/Section5";
import Section6 from "../components/Section/Section6";
import type { BentukKolam } from "../components/Section/Section2";
import FluxLines from "../components/FluxLines";

type Ikan = "lele" | "nila";

export default function Home() {
  const [ikan, setIkan] = useState<Ikan | null>(null);
  const [bentukKolam, setBentukKolam] = useState<BentukKolam | null>(null);
  const [volumeKolam, setVolumeKolam] = useState<number | null>(null);
  const [volumeAir, setVolumeAir] = useState<number | null>(null);
  const [hasilPerhitungan, setHasilPerhitungan] = useState<{
    tebarAwal: number;
    survivalRate: number;
    bobotTarget: number;
    hasilKg: number;
    suhu: number;
    kedalamanDifuser: number;
  } | null>(null);
  const [dataPakan, setDataPakan] = useState<{
    hasilKg: number;
    rasioPakan: number;
    proteinPakan: number;
    keteranganPakan: string;
    suhu: number;
    kedalamanDifuser: number;
    fbk: number;
    pakanHarianGram?: number;
  } | null>(null);
  const [dataFilterMekanis, setDataFilterMekanis] = useState<{
    digunakan: boolean;
    luasJapmatM2: number | null;
  } | null>(null);
  const [section6Aktif, setSection6Aktif] = useState(false);
  const [jenisBiofilter, setJenisBiofilter] = useState<
    "kaldnes-k1" | "bioball" | null
  >(null);

  function pilihIkan(jenisIkan: Ikan) {
    setIkan(jenisIkan);
  }

  function kembaliKeSection2() {
    setBentukKolam(null);
    setVolumeKolam(null);
    setVolumeAir(null);
    setHasilPerhitungan(null);
    setDataPakan(null);
    setDataFilterMekanis(null);
    setSection6Aktif(false);
    setJenisBiofilter(null);
  }

  function kembaliKeSection1() {
    setIkan(null);
    kembaliKeSection2();
  }

  function kembaliKeSection3() {
    setHasilPerhitungan(null);
    setDataPakan(null);
    setDataFilterMekanis(null);
    setSection6Aktif(false);
    setJenisBiofilter(null);
  }

  function kembaliKeSection4() {
    setDataPakan(null);
    setDataFilterMekanis(null);
    setSection6Aktif(false);
    setJenisBiofilter(null);
  }

  function hitungDanTampilkanHasil(
    tebarAwal: number,
    survivalRate: number,
    bobotTarget: number,
    suhu: number,
    kedalamanDifuser: number,
  ) {
    const hasilKg = (tebarAwal * (survivalRate / 100) * bobotTarget) / 1000;

    setHasilPerhitungan({
      tebarAwal,
      survivalRate,
      bobotTarget,
      hasilKg,
      suhu,
      kedalamanDifuser,
    });
  }

  function lanjutKeSection5(
    _hasilKg: number,
    rasioPakan: number,
    proteinPakan: number,
    keteranganPakan: string,
    suhu: number,
    kedalamanDifuser: number,
    fbk: number,
    pakanHarianGram?: number,
  ) {
    setSection6Aktif(false);
    setJenisBiofilter(null);
    setDataFilterMekanis(null);
    setDataPakan({
      hasilKg: hasilPerhitungan?.hasilKg ?? 0,
      rasioPakan,
      proteinPakan,
      keteranganPakan,
      suhu,
      kedalamanDifuser,
      fbk,
      pakanHarianGram,
    });
  }

  function lanjutKeSection6(
    pilihanBiofilter: "kaldnes-k1" | "bioball",
    filterMekanis: boolean,
    luasJapmatM2: number | null,
  ) {
    setJenisBiofilter(pilihanBiofilter);
    setDataFilterMekanis({ digunakan: filterMekanis, luasJapmatM2 });
    setSection6Aktif(true);
  }

  function selesaiMenghitung(
    bentuk: BentukKolam,
    hasilVolumeKolam: number,
    hasilVolumeAir: number,
  ) {
    setBentukKolam(bentuk);
    setVolumeKolam(hasilVolumeKolam);
    setVolumeAir(hasilVolumeAir);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#1a1a2e]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10">
        <FluxLines
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          glow={2}
          rimWidth={0.2}
          lineWidth={1}
          flowDirection="down"
          mouseInteraction
          clickSwirl
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          sharpness={2.5}
          shimmer={1.5}
          mouseStrength={1}
          mouseRadius={0.35}
          intro
          lightMode={false}
        />
      </div>
      <div className="fixed top-0 z-20 flex h-14 w-full items-center justify-between bg-[#efc07b] px-2">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/Lambang UGM-biru.png"
            alt="Logo"
            width={50}
            height={50}
            className=" object-contain"
          />
          <h2 className=" text-[25px] font-bold text-[#1a1a2e]">
            Perencanaan Budidaya Sistem Resirkulasi
          </h2>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-2 text-[14px] font-semibold">
            <li className="text-[#1a1a2e] hover:text-[#7a2e1b]">
              <Link href={"/"}>Laman Utama</Link>
            </li>
            <li className="text-[#1a1a2e] hover:text-[#7a2e1b]">
              Cara Penggunaan
            </li>
            <li className="text-[#1a1a2e] hover:text-[#7a2e1b]">Tentang</li>
          </ul>
        </nav>
      </div>
      <div className="relative z-10 mt-14 p-8">
        {ikan === null ? (
          <Section1 onSelectIkan={pilihIkan} />
        ) : bentukKolam === null ||
          volumeKolam === null ||
          volumeAir === null ? (
          <Section2
            onBack={kembaliKeSection1}
            onComplete={selesaiMenghitung}
          />
        ) : dataPakan !== null ? (
          section6Aktif ? (
            jenisBiofilter !== null && (
              <Section6
                {...dataPakan}
                jenisBiofilter={jenisBiofilter}
                filterMekanis={dataFilterMekanis?.digunakan ?? false}
                luasJapmatM2={dataFilterMekanis?.luasJapmatM2 ?? null}
                onKembali={() => setSection6Aktif(false)}
              />
            )
          ) : (
            <Section5
              {...dataPakan}
              initialBiofilter={jenisBiofilter}
              initialFilterMekanis={dataFilterMekanis?.digunakan ?? null}
              initialLuasJapmatM2={dataFilterMekanis?.luasJapmatM2 ?? null}
              onKembali={kembaliKeSection4}
              onLanjut={lanjutKeSection6}
            />
          )
        ) : hasilPerhitungan !== null ? (
          <Section4
            ikan={ikan}
            {...hasilPerhitungan}
            onKembali={kembaliKeSection3}
            onLanjut={lanjutKeSection5}
          />
        ) : (
          <Section3
            ikan={ikan}
            bentuk={bentukKolam}
            volumeKolam={volumeKolam}
            volumeAir={volumeAir}
            onKembali={kembaliKeSection2}
            onHitung={hitungDanTampilkanHasil}
          />
        )}
      </div>
    </div>
  );
}
