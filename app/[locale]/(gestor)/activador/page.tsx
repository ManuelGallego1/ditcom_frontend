import { Metadata } from "next"
import Screen from "@/modules/clients/ScreenActivador"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
    title: "Activador | Ditcom",
    description: "Dasboard de activador",
    alternates: {
        canonical: `${BASE_URL}/activador`,
    }
}

export default function Page() {

  return <Screen />

}
