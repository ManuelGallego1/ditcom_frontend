import { Metadata } from "next"
import Screen from "@/modules/clients/ScreenAdmin"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
    title: "Admin | Ditcom",
    description: "Dasboard de admin",
    alternates: {
        canonical: `${BASE_URL}/admin`,
    }
}

export default function Page() {

  return <Screen />

}
