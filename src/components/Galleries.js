"use client";

import Link from "next/link";
import GalleryCard from "./GalleryCard";
import { useTranslation } from "react-i18next";
import AnimatedText from "./TextAnimation";

function Galleries() {
  const { t } = useTranslation();

  return (
    <section
      className="flex flex-col justify-between m-0 h-[100vh] w-full items-center snap-start pt-[10vh]"
      id="sec2"
    >
      <div className="w-full h-[30%] flex items-end justify-center">
        <h1
          className="text-[50px] font-league-spartan"
          style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: 900 }}
        >
          <AnimatedText text={t("galleries.title")} />
        </h1>
      </div>

      <div className="w-full h-[60%] flex">
        <Link
          href="/gallery/cafe"
          className="hover:flex-[2] flex-1 transition-[flex-grow] duration-400 ease-in-out h-[100%]"
        >
          <GalleryCard
            title={t("galleries.specialty")}
            background="/cafespe.jpeg"
          />
        </Link>

        <Link
          href="/gallery/matcha"
          className="hover:flex-[2] flex-1 transition-[flex-grow] duration-400 ease-in-out h-[100%]"
        >
          <GalleryCard
            title={t("galleries.matcha")}
            background="/matcha.jpeg"
          />
        </Link>

        <Link
          href="/gallery/latte"
          className="hover:flex-[2] flex-1 transition-[flex-grow] duration-400 ease-in-out h-[100%]"
        >
          <GalleryCard
            title={t("galleries.latte")}
            background="/latte.jpeg"
          />
        </Link>
      </div>
    </section>
  );
}

export default Galleries;
