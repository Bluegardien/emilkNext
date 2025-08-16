"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

function Experiences() {
  const { t } = useTranslation();

  return (
    <section
      className="flex justify-around m-0 h-[100vh] w-full items-center pt-[10vh] snap-start"
      id="sec3"
    >
      {/* Formations */}
      <div className="w-2/5 h-[90%] flex flex-col">
        <h1
          className="text-[50px] font-league-spartan"
          style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: 900 }}
        >
          {t("experiences.formations")}
        </h1>
        <div className="flex flex-col justify-around">
          <div className="flex items-center">
            {/* Remplacer le src par le chemin correct dans public */}
            <Image src="/barista_course.png" alt="Barista Course" width={50} height={50} />
            <h2 className="font-league-spartan text-2xl ml-2">
              {t("experiences.barista_course")}
            </h2>
          </div>
        </div>
      </div>

      {/* Expériences professionnelles */}
      <div className="w-2/5 h-[90%] flex flex-col">
        <h1
          className="text-[50px] font-league-spartan"
          style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: 900 }}
        >
          {t("experiences.title")}
        </h1>
        <div className="flex flex-col justify-around">
          <div className="flex items-center">
            <Image src="/local_cafe.png" alt="Local Cafe" width={50} height={50} />
            <div className="flex items-center ml-2">
              <h2 className="font-league-spartan text-2xl">
                {t("experiences.local_cafe")}
              </h2>
              <a href="https://www.instagram.com/local.cafe.briancon/">
                <Image
                  src="/instagramicon.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Image src="/heidi_kitchen.png" alt="Heidi Kitchen" width={50} height={50} />
            <div className="flex items-center ml-2">
              <h2 className="font-league-spartan text-2xl">
                {t("experiences.heidi_kitchen")}
              </h2>
              <a href="https://www.instagram.com/_heidikitchen_/">
                <Image
                  src="/instagramicon.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
