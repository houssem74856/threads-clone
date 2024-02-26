import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        ` 
        rounded-full
        px-6 
        py-2
        bg-white
        text-black
        font-bold
        hover:opacity-75
        transition
        disabled:cursor-not-allowed
        disabled:opacity-75
      `,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;