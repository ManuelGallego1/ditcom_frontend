import { Metadata } from "next"
import ScreenLogin from "@/src/modules/clients/ScreenLogin"

export const metadata: Metadata = {
  title: "Login | Ditcom",
  description: "Loggeate a tu cuenta",
  alternates: {
    canonical: 'https://mydomain.com/login',
  }
}

export default function LoginPage() {

  return <ScreenLogin />

}
