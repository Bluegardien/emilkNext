// app/api/gallery/[type]/delete/[filename]/route.js
import fs from "fs";
import path from "path";

const validTypes = ["cafe", "matcha", "latte"];

export async function DELETE(request, { params }) {
  const { type, filename } = params;

  if (!validTypes.includes(type)) {
    return new Response(JSON.stringify({ error: "Invalid gallery type" }), { status: 400 });
  }

  if (!filename) {
    return new Response(JSON.stringify({ error: "No filename provided" }), { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", "Gallery", type, filename);

    await fs.promises.unlink(filePath);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unable to delete image", details: err.message }),
      { status: 500 }
    );
  }
}
