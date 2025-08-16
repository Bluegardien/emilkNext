"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return null;
}

export default ScrollToHash;
