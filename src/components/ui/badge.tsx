import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:     'bg-[#6C63FF]/15 text-[#a5b4fc] border border-[#6C63FF]/30',
        secondary:   'bg-white/8 text-[#94A3B8] border border-white/10',
        teal:        'bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30',
        success:     'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
        warning:     'bg-amber-500/15 text-amber-300 border border-amber-500/30',
        destructive: 'bg-red-500/15 text-red-300 border border-red-500/30',
        glow:        'bg-gradient-to-r from-[#6C63FF] to-[#00C9A7] text-white shadow-md shadow-[#6C63FF]/30',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
