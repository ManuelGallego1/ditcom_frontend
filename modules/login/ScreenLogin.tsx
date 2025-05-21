import Image from 'next/image';
import Form from '@/modules/login/Form'; // ruta según tu proyecto
import tokens from '@/utils/Token'; // ruta según tu proyecto

export default function ScreenLogin() {
  return (
    <section className={tokens.loginContainer}>
      <div className={tokens.loginWrapper}>
        <div className={tokens.loginBox}>
          <div className={tokens.loginCard}>
            <div className={tokens.loginLogoWrapper}>
              <Image src="/img/logo.png" alt="Logo" width={300} height={300} />
            </div>
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
}
