import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatScore(score: number): string {
  return score.toString()
}

export function getInstitutionTypeLabel(type: string): string {
  const types = {
    UNIVERSITY: 'Университет',
    COLLEGE: 'Колледж',
    TECHNICAL_SCHOOL: 'Техникум',
  }
  return types[type as keyof typeof types] || type
}

export function getRoleLabel(role: string): string {
  const roles = {
    STUDENT: 'Ученик',
    PARENT: 'Родитель',
    ADMIN: 'Администратор',
  }
  return roles[role as keyof typeof roles] || role
}

