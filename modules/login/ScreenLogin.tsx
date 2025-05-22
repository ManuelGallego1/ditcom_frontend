import Image from 'next/image';
import Form from './Form';
import tokens from '@/utils/Token';

export default function ScreenLogin() {
  return (
    <section className="max-w-screen-sm mx-auto w-1/2">
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <div className="bg-boxdark shadow-lg rounded-lg px-8 py-10">
            <div className="flex justify-center items-center pb-5">
              <Image src="/img/png/logo.png" alt="Logo" width={300} height={300} />
            </div>
            < Form />
          </div>
        </div>
      </div>
    </section>
  );
}
