import { Metadata } from "next"
import Screen from "@/modules/screen/ScreenPyme"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
    title: "Pyme | Ditcom",
    description: "Dasboard de pyme",
    alternates: {
        canonical: `${BASE_URL}/pyme`,
    }
}

export default function Page() {

  return <Screen />

}
