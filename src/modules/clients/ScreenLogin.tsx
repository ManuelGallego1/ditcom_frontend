'use client';

import Image from 'next/image';
import FormLogin from '@/src/components/molecules/forms/FormLogin';
import tokens from '@/src/utils/Token';

export default function ScreenLogin() {
  return (
    <section className={tokens.loginContainer}>
      <div className={tokens.loginWrapper}>
        <div className={tokens.loginBox}>
          <div className={tokens.loginCard}>
            <div className={tokens.loginLogoWrapper}>
              <Image src="/img/png/logo.png" alt="Logo" width={300} height={300} />
            </div>
            <FormLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
