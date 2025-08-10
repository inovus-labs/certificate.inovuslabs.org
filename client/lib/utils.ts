import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString?: string) {
  if (!dateString) return ""
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString // fallback if invalid
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}


export function shortAddress(address: string, length = 6): string {
  if (!address || address.length < 2 * length + 2) return address
  return `${address.slice(0, length)}...${address.slice(-length)}`
}