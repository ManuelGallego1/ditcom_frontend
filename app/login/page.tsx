import { Metadata } from "next"
import ScreenLogin from "@/modules/login/ScreenLogin"

export const metadata: Metadata = {
  title: "Login",
  description: "Loggeate a tu cuenta",
  alternates: {
    canonical: 'https://mydomain.com/login',
  }
}

export default function LoginPage() {

  return <ScreenLogin />

}
