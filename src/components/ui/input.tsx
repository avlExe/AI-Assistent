import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 shadow-sm hover:shadow-md focus:shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// Неоморфный инпут
const NeomorphicInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.1),inset_3px_3px_6px_rgba(0,0,0,0.1)] focus:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1)] focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300 focus:outline-none hover:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.1),inset_2px_2px_5px_rgba(0,0,0,0.1)] hover:border-gray-400 dark:hover:border-gray-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
NeomorphicInput.displayName = "NeomorphicInput"

export { Input, NeomorphicInput }
