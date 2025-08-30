import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const validTypes = ["cafe", "matcha", "latte"]

export async function DELETE(request, { params }) {
  try {
    const { type } = params
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!type || !filename) {
      return new Response(
        JSON.stringify({ error: "Missing type or filename" }),
        { status: 400 }
      )
    }

    if (!validTypes.includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid gallery type" }),
        { status: 400 }
      )
    }

    // Création du client Supabase lié aux cookies
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Suppression du fichier
    const { error } = await supabase.storage
      .from("Gallery")
      .remove([`${type}/${filename}`])

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, message: "Image deleted successfully" }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}
