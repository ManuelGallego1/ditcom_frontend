'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/atoms/CustomButton";
import Loading from "@/components/atoms/Loading";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleLoginClick = () => {
    setIsRedirecting(true);
    router.push("/login");
  };

  return (
    <div className="relative w-full h-screen">

      <Image
        src="/img/png/home.jpg"
        alt="Imagen principal"
        fill
        className="object-cover z-0"
        priority
      />

      {isRedirecting && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <Loading />
        </div>
      )}

      <div className="absolute inset-0 z-10 flex flex-col justify-between">
        <div className="w-full p-4 flex justify-between items-center">
          <Image src="/img/png/logo.png" alt="Logo" width={200} height={200} />
          
          <CustomButton
            text="Iniciar Sesión"
            color="secondaryButton"
            icon="login"
            onClickButton={handleLoginClick}
          />
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
