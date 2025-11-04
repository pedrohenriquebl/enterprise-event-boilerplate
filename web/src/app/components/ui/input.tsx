import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={twMerge(
                ` h-[58px] py-4.5 px-4 border-b border-white bg-transparent text-white text-base w-full
                placeholder-white focus:outline-none focus:ring-0
                ${className}
                `
            )}
            {...props}
        />
    );
}