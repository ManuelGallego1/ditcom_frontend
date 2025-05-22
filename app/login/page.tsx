import { Metadata } from "next"
import ScreenLogin from "@/modules/screen/ScreenLogin"

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
