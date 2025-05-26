import { Metadata } from "next";
import ScreenLogin from "@/src/modules/clients/ScreenLogin";

export const metadata: Metadata = {
  title: "Login | Ditcom",
  description: "Inicia sesión en tu cuenta",
  alternates: {
    canonical: 'https://mydomain.com/login',
  },
};

export default function LoginPage() {
  return <ScreenLogin />;
}
