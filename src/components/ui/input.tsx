import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-2.5 text-sm text-[#E2E8F0] placeholder:text-[#64748B] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/60 focus:border-[#6C63FF]/60 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
