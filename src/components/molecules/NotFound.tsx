import Link from 'next/link';

interface NotFoundProps {
    redirectTo: string;
    message?: string;
    buttonText?: string;
}

export default function NotFound({
    redirectTo,
    message = "Lo sentimos, no podemos encontrar esa página.",
    buttonText = "Regresar a la página de inicio"
}: NotFoundProps) {
    return (
        <section className="h-[100vh] flex justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-60 animate-pulse" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-200 rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-primary-50 rounded-full blur-xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 z-10">
                <div className="mx-auto max-w-screen-sm text-center bg-white/80 rounded-2xl shadow-2xl p-10 border border-primary-100 backdrop-blur-md">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold text-current lg:text-9xl drop-shadow-lg">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-current md:text-4xl">
                        Falta algo.
                    </p>
                    <p className="mb-4 text-lg font-light text-current">
                        {message}
                    </p>
                    <Link
                        href={redirectTo}
                        className="inline-flex text-white bg-boxdark hover:bg-whitetext-current focus:ring-4 focus:outline-none focus:ring-current font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
}