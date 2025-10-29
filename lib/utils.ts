import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasEnvVars(keys: string[]) {
  return keys.every((key) => Boolean(process.env[key]))
}
