// app/page.jsx
"use client"; // si certains composants utilisent des hooks comme useState ou useTranslation

import I18nProvider from "@/i18n/i18n";
import Navbar from "@/components/Navbar";
import Presentation from "@/components/Presentation";
import Galleries from "@/components/Galleries";
import Experiences from "@/components/Experiences";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Presentation />
      <Galleries />
      <Experiences />
      <Contact />
    </>
  );
}
