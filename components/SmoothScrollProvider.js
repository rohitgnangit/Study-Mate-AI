"use client"

import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.08,
        });

        let rafId;

        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
             lenis.destroy();
        }
    }, [])
    return <>{children}</>;
}