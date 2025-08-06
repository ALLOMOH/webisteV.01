import React, { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type GlowButtonProps = ButtonProps | AnchorProps;

const GlowButton: React.FC<GlowButtonProps> = (props) => {
  const {
    children,
    variant = "primary",
    className = "",
    ...rest
  } = props;

  const baseClasses =
    "text-center px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group relative z-10";
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[#f1ca13] to-[#ff7f11] text-[#1d3446] hover:shadow-2xl hover:shadow-[#f1ca13]/50",
    secondary:
      "bg-gradient-to-r from-[#1d3446] to-[#0a84c1] text-white hover:shadow-2xl hover:shadow-[#0a84c1]/50",
    outline:
      "border-2 border-[#f1ca13] text-[#f1ca13] hover:bg-[#f1ca13] hover:text-[#1d3446] hover:shadow-2xl hover:shadow-[#f1ca13]/50",
  };

  if ("href" in props && props.href) {
    return (
      <a
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={props.href}
      >
        
          {children}
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
    
        {children}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
};

export default GlowButton;
