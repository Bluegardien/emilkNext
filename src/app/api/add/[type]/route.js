// app/api/gallery/[type]/upload/route.js
import fs from "fs";
import path from "path";
import formidable from "formidable-serverless";
import heicConvert from "heic-convert";

const validTypes = ["cafe", "matcha", "latte"];

export const config = {
  api: {
    bodyParser: false, // on gère le parsing via formidable
  },
};

export async function POST(request, { params }) {
  const { type } = params;

  if (!validTypes.includes(type)) {
    return new Response(JSON.stringify({ error: "Invalid gallery type" }), { status: 400 });
  }

  const form = new formidable.IncomingForm({ multiples: false });

  return new Promise((resolve) => {
    form.parse(request, async (err, fields, files) => {
      if (err || !files.image) {
        resolve(new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 }));
        return;
      }

      let file = files.image;
      let buffer;

      if (file._writeStream) {
        // fallback si nécessaire
        resolve(new Response(JSON.stringify({ error: "File read error" }), { status: 500 }));
        return;
      } else if (file.arrayBuffer) {
        buffer = Buffer.from(await file.arrayBuffer());
      } else {
        buffer = fs.readFileSync(file.filepath || file.path);
      }

      // Nom du fichier
      let filename = file.originalFilename || file.name;
      if (fields.name) {
        const base = path.parse(fields.name).name.replace(/[^a-zA-Z0-9-_]/g, "_");
        filename = base;
      } else {
        filename = path.parse(filename).name;
      }

      let ext = path.extname(file.originalFilename || file.name).toLowerCase();
      let destFilename = filename + ext;
      let destPath = path.join(process.cwd(), "public", "Gallery", type, destFilename);

      try {
        // Si HEIC, convertir en JPG
        if (ext === ".heic") {
          const outputBuffer = await heicConvert({
            buffer: buffer,
            format: "JPEG",
            quality: 1,
          });
          destFilename = filename + ".jpg";
          destPath = path.join(process.cwd(), "public", "Gallery", type, destFilename);
          fs.writeFileSync(destPath, outputBuffer);
        } else {
          fs.writeFileSync(destPath, buffer);
        }

        resolve(new Response(JSON.stringify({ success: true, filename: destFilename }), { status: 200 }));
      } catch (error) {
        resolve(new Response(JSON.stringify({ error: "Unable to save/convert image", details: error.message }), { status: 500 }));
      }
    });
  });
}
