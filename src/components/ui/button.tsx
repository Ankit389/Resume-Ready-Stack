import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/60 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#6C63FF] to-[#5a52e0] text-white shadow-lg shadow-[#6C63FF]/25 hover:shadow-[#6C63FF]/45 hover:-translate-y-0.5 hover:from-[#7a72ff] hover:to-[#6C63FF]',
        glow:
          'bg-gradient-to-r from-[#6C63FF] to-[#00C9A7] text-white shadow-lg shadow-[#6C63FF]/30 hover:shadow-[#6C63FF]/55 hover:-translate-y-0.5',
        secondary:
          'bg-[#1E293B] text-[#E2E8F0] border border-white/10 hover:bg-[#263348] hover:border-white/20 hover:-translate-y-0.5',
        outline:
          'border border-[#6C63FF]/50 text-[#a5b4fc] bg-transparent hover:bg-[#6C63FF]/10 hover:border-[#6C63FF] hover:-translate-y-0.5',
        ghost:
          'text-[#94A3B8] hover:bg-white/5 hover:text-white',
        destructive:
          'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/25',
        link:
          'text-[#6C63FF] underline-offset-4 hover:underline',
        teal:
          'bg-gradient-to-r from-[#00C9A7] to-[#00b494] text-white shadow-lg shadow-[#00C9A7]/25 hover:shadow-[#00C9A7]/45 hover:-translate-y-0.5',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm:      'h-8  px-4 text-xs',
        lg:      'h-12 px-8 text-base',
        xl:      'h-14 px-10 text-lg',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
