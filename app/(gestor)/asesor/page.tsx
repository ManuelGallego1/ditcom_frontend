import { Metadata } from "next"
import Screen from "@/modules/clients/ScreenAsesor"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
    title: "Asesor | Ditcom",
    description: "Dasboard de asesor",
    alternates: {
        canonical: `${BASE_URL}/asesor`,
    }
}

export default function Page() {

  return <Screen />

}
