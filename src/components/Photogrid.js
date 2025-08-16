"use client";

import { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import AnimatedText from "./TextAnimation";

function Photogrid({ folder = "cafe" }) {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/gallery/${folder}`);
        const data = await res.json();
        setImagesArray(Array.isArray(data) ? data : []);
      } catch (err) {
        setImagesArray([]);
        console.error("Erreur API images:", err);
      }
    };

    fetchImages();
  }, [folder]);

  const safeImages = imagesArray?.length
    ? imagesArray
    : [
        {
          src: "/Gallery/matcha/matcha.jpeg",
          width: 20,
          height: 30,
        },
      ];

  return (
    <div className="p-10 pt-[12vh] text-center">
      <h1
        className="font-league-spartan mb-5"
        style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: 900 }}
      >
        <AnimatedText
          text={`Galerie ${folder.charAt(0).toUpperCase() + folder.slice(1)}`}
        />
      </h1>

      <PhotoAlbum 
        layout="rows" photos={safeImages} className=""
      />
    </div>
  );
}

export default Photogrid;
