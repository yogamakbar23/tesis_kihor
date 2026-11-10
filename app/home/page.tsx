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
  } | null>(null);
  const [dataPakan, setDataPakan] = useState<{
    hasilKg: number;
    rasioPakan: number;
    proteinPakan: number;
    keteranganPakan: string;
    pakanHarianGram?: number;
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
  }

  function hitungDanTampilkanHasil(
    tebarAwal: number,
    survivalRate: number,
    bobotTarget: number,
  ) {
    const hasilKg = (tebarAwal * (survivalRate / 100) * bobotTarget) / 1000;

    setHasilPerhitungan({
      tebarAwal,
      survivalRate,
      bobotTarget,
      hasilKg,
    });
  }

  function lanjutKeSection5(
    _hasilKg: number,
    rasioPakan: number,
    proteinPakan: number,
    keteranganPakan: string,
    pakanHarianGram?: number,
  ) {
    setSection6Aktif(false);
    setDataPakan({
      hasilKg: hasilPerhitungan?.hasilKg ?? 0,
      rasioPakan,
      proteinPakan,
      keteranganPakan,
      pakanHarianGram,
    });
  }

  function lanjutKeSection6(
    pilihanBiofilter: "kaldnes-k1" | "bioball",
  ) {
    setJenisBiofilter(pilihanBiofilter);
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a1a2e]">
      <div className="flex h-14 w-full bg-[#efc07b] items-center justify-between px-2 top-0 fixed">
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
      <div className="mt-14 p-8">
        {ikan === null ? (
          <Section1 onSelectIkan={pilihIkan} />
        ) : bentukKolam === null ||
          volumeKolam === null ||
          volumeAir === null ? (
          <Section2 onComplete={selesaiMenghitung} />
        ) : dataPakan !== null ? (
          section6Aktif ? (
            jenisBiofilter !== null && (
              <Section6 {...dataPakan} jenisBiofilter={jenisBiofilter} />
            )
          ) : (
            <Section5 {...dataPakan} onLanjut={lanjutKeSection6} />
          )
        ) : hasilPerhitungan !== null ? (
          <Section4
            ikan={ikan}
            {...hasilPerhitungan}
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
