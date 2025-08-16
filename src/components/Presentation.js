"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import TextAnimation from "./TextAnimation";

function Presentation() {
  const { t } = useTranslation();

  return (
    <section
      className="flex m-0 h-[100vh] w-full justify-around items-center pt-[10vh] snap-start"
      id="sec1"
    >
      <div className="relative h-[80%] w-[30%] flex flex-col justify-center" id="aroundimg">
        <h1
          className="absolute top-0 left-full font-league-spartan w-[200%]"
          style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: 900 }}
        >
          <TextAnimation text={t("hero")} />
        </h1>
        <div className="relative h-full w-fit m-1.5 border-4 border-[#D5B16C] rounded-[15px]">
          <Image
            src="/emil.jpeg"
            alt="Emil"
            fill
            style={{ objectFit: "cover", borderRadius: "15px" }}
          />
        </div>
      </div>

      <div className="p-4 mt-[10%] text-xl w-[50%] h-[30%] bg-[#D5B16C] rounded-[15px] flex flex-col justify-around">
        <h1
          className="font-league-spartan"
          style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)", fontWeight: 900 }}
        >
          {t("presentation.name")}
        </h1>
        <p>{t("presentation.description")}</p>
      </div>
    </section>
  );
}

export default Presentation;
