import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, danger, ghost, cyan
  size = 'md', // sm, md, lg
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5',
    icon: 'p-2'
  };

  const variantStyles = {
    primary: 'bg-brand-blue hover:bg-brand-blueHover text-white shadow-glow-blue border border-brand-blue/30 focus:ring-brand-blue',
    secondary: 'bg-bg-secondary hover:bg-bg-hover text-txt-main border border-border-dark hover:border-border-subtle focus:ring-brand-blue',
    outline: 'bg-transparent hover:bg-white/5 text-txt-main border border-border-dark hover:border-brand-blue/60 focus:ring-brand-blue',
    ghost: 'bg-transparent hover:bg-white/5 text-txt-secondary hover:text-txt-main focus:ring-brand-blue',
    danger: 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 focus:ring-rose-500',
    cyan: 'bg-brand-cyan hover:bg-cyan-300 text-bg-primary font-semibold shadow-glow-cyan focus:ring-brand-cyan'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-0.5 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      
      {children}

      {IconRight && !loading && (
        <IconRight className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};

export default Button;
