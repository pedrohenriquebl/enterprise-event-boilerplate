import React from 'react';

type SpinnerProps = {
    className?: string;
    size?: number;
    'aria-hidden'?: boolean;
};

export default function Spinner({ className = '', size = 16, ['aria-hidden']: ariaHidden = true }: SpinnerProps) {
    const px = size;
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={px}
            height={px}
            aria-hidden={ariaHidden}
            role="img"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
    );
}
