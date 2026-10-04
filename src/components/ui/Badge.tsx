import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  let baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  let variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    destructive: "bg-error text-error-foreground hover:bg-error/80",
    outline: "text-foreground border border-input",
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  )
}

export { Badge }
