'use client';

import React from 'react';

export default function Loading() {
    return (
        <div className="loader-overlay">
            <div className="loading-double-circular"></div>

            <style jsx>{`
                .loader-overlay {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro translúcido */
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                }

                .loading-double-circular {
                    --size: 20vmin; /* Tamaño reducido */
                    --border: 5;
                    --color:rgba(218, 218, 218, 0.75); /* Color blanco */
                    
                    position: relative;
                    width: var(--size);
                    height: var(--size);
                    opacity: 0.95;
                }

                .loading-double-circular::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-image: conic-gradient(
                        from 60deg at 50% 50%,
                        #0000 245deg,
                        var(--color) 0deg
                    );
                    --mask-size: calc(var(--size) * (0.5 - (var(--border) / 100)));
                    -webkit-mask: radial-gradient(circle var(--mask-size), #0000 99%, #fff);
                    mask: radial-gradient(circle var(--mask-size), #0000 99%, #fff);
                    animation: loading-double-circular-outer 1.5s ease-in-out infinite alternate;
                }

                .loading-double-circular::after {
                    content: '';
                    position: absolute;
                    top: calc(var(--border) * 1.5 * 1%);
                    left: calc(var(--border) * 1.5 * 1%);
                    width: calc((100 - (var(--border) * 3)) * 1%);
                    height: calc((100 - (var(--border) * 3)) * 1%);
                    border-radius: 50%;
                    background-image: conic-gradient(
                        from 225deg at 50% 50%,
                        #0000 270deg,
                        var(--color) 0deg
                    );
                    --mask-size: calc(var(--size) * (0.5 - ((var(--border) / 100)) * 2.5));
                    -webkit-mask: radial-gradient(circle var(--mask-size), #0000 99%, #fff);
                    mask: radial-gradient(circle var(--mask-size), #0000 99%, #fff);
                    animation: loading-double-circular-inner 1.5s ease-in-out infinite alternate;
                }

                @keyframes loading-double-circular-outer {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes loading-double-circular-inner {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(-360deg);
                    }
                }
            `}</style>
        </div>
    );
}
