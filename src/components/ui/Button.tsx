import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius-md)] active:scale-[0.98]"
    
    let variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20",
      outline: "border-2 border-input bg-transparent hover:bg-muted hover:text-foreground text-foreground",
      ghost: "bg-transparent hover:bg-muted text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    }
    
    let sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-5 py-2 text-sm",
      lg: "h-12 px-8 text-base",
      icon: "h-11 w-11",
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
