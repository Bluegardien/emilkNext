import { createClient } from "@supabase/supabase-js";
import process from "process";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Types valides
const validTypes = ["cafe", "matcha", "latte"];

export async function GET(request, { params }) {
  try {
    const { type } = await params;

    if (!validTypes.includes(type)) {
      return new Response(JSON.stringify({ error: "Invalid gallery type" }), { status: 400 });
    }
    // Liste des fichiers dans le dossier correspondant du storage "Gallery"
    const { data, error } = await supabase.storage.from("Gallery").list('');
    if (error) throw error;

    const images = data.map((f, i) => ({
      src: `${SUPABASE_URL}/storage/v1/object/public/Gallery/${type}/${f.name}`,
      width: 30,
      height: 20,
    }));

    return new Response(JSON.stringify({"data":data,"error":error}), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
