import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const validTypes = ["cafe", "matcha", "latte"]

export const config = {
  api: {
    bodyParser: false, // on gère nous-même le flux
  },
}

export async function POST(request, { params }) {
  try {
    const { type } = params

    if (!validTypes.includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid gallery type" }),
        { status: 400 }
      )
    }

    // Récupération du client Supabase lié aux cookies
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Récupération du formData
    const formData = await request.formData()
    const file = formData.get("image")

    if (!file || !file.name) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400 }
      )
    }

    // Lecture du contenu du fichier en ArrayBuffer → Buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") // nettoyage nom

    // Upload vers Supabase Storage
    const { error } = await supabase.storage
      .from("Gallery")
      .upload(`${type}/${filename}`, buffer, {
        contentType: file.type,
        upsert: true, // si déjà existant, écrase
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, filename }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}
