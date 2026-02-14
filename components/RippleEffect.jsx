'use client';
import { useEffect } from 'react';

export default function RippleEffect() {
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest('.btn-ripple, .btn-primary, .btn-secondary, .glass-card');
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height) * 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-wave';
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x - size / 2}px`;
            ripple.style.top = `${y - size / 2}px`;

            target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return null;
}
