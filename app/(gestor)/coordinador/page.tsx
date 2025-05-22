import { Metadata } from "next"
import Screen from "@/modules/screen/ScreenCoordinador"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
    title: "Coordinador | Ditcom",
    description: "Dasboard de coordinador",
    alternates: {
        canonical: `${BASE_URL}/coordinador`,
    }
}

export default function Page() {

  return <Screen />

}
