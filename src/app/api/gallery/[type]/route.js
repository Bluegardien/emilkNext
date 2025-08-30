import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const validTypes = ["cafe", "matcha", "latte"]

export async function GET(request, { params }) {
  const { type } = await params

  if (!validTypes.includes(type)) {
    return new Response(
      JSON.stringify({ error: "Invalid gallery type" }),
      { status: 400 }
    )
  }

  try {
    // Création du client Supabase lié aux cookies (auth server-side)
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Liste les fichiers dans le sous-dossier correspondant (ex: cafe/, matcha/, latte/)
    const { data, error } = await supabase.storage
      .from("Gallery")
      .list(`${type}/`)

    if (error) throw error

    // Génération des URLs publiques
    const files = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from(`Gallery`)
        .getPublicUrl(`${type}/${file.name}`)

      return {
        name: file.name,
        url: urlData.publicUrl,
      }
    })

    // Formatage pour ton front (gallery compatible)
    const images = files.map((file) => ({
      src: file.url,
      width: 30,
      height: 20,
    }))

    return new Response(JSON.stringify({ data: images }), { status: 200 })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}
