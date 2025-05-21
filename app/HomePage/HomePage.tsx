import Image from "next/image";
import Link from "next/link";
// TODO: Update the path below to the actual location of your tokens file
import tokens from "@/utils/Token";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
    
      <Image
        src="/img/png/Home.jpg"
        alt="Imagen principal"
        fill
        className="object-cover z-0"
        priority
      />

    
      <div className="absolute inset-0 z-10 flex flex-col justify-between">
        
        <div className="w-full p-4 flex justify-between items-center">
          <Image src="/img/png/logo.png" alt="Logo" width={100} height={100} />
          <Link href="/login">
            <button className={tokens.loginButton}>
              Iniciar Sesión
            </button>
          </Link>
        </div>

        
        <div className="p-8 text-white">
          <p className="text-xl font-semibold">
            Bienvenido a nuestra plataforma, donde ofrecemos los mejores servicios.
          </p>
        </div>
      </div>
    </div>
  );
}
