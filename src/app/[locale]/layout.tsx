import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inicio | Ditcom",
  description: "Ditcom plataforma de servicios hogar y móviles.",
};

export async function generateStaticParams() {
  return ["es", "en"].map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const { locale } = params;

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Ditcom plataforma de servicios hogar y móviles." />
        <meta name="keywords" content="ditcom, servicios, hogar, móviles" />
      </head>
      <body className={`${openSans.variable}`}>{children}</body>
    </html>
  );
}
