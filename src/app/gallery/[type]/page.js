'use client'

import { useParams } from 'next/navigation';
import Photogrid from "@/components/Photogrid";

export default function Gallerie() {
  const params = useParams();
  const type = params.type; // [type] récupéré ici

  return <Photogrid folder={type} />;
}
