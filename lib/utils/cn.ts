import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs:ClassValue[]) {
    return twMerge(clsx(inputs))

}

// basically just prevent confilcts in tailwind classes and falsy values on classes 
// whats w the spread operator ? 