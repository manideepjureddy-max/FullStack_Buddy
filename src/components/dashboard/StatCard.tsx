import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const variants = {
    default: 'bg-card border border-border',
    primary: 'gradient-primary text-primary-foreground border-0',
    secondary: 'gradient-secondary text-secondary-foreground border-0',
    accent: 'gradient-accent text-accent-foreground border-0',
  };

  const iconVariants = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary-foreground/20 text-primary-foreground',
    secondary: 'bg-secondary-foreground/20 text-secondary-foreground',
    accent: 'bg-accent-foreground/20 text-accent-foreground',
  };

  const textVariants = {
    default: 'text-muted-foreground',
    primary: 'text-primary-foreground/80',
    secondary: 'text-secondary-foreground/80',
    accent: 'text-accent-foreground/80',
  };

  return (
    <div className={cn(
      'rounded-xl p-6 shadow-elegant animate-fade-in transition-transform duration-200 hover:scale-[1.02]',
      variants[variant]
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className={cn('text-sm font-medium', textVariants[variant])}>
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </p>
          {trend && (
            <p className={cn(
              'mt-2 text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className={cn('ml-1', textVariants[variant])}>vs last month</span>
            </p>
          )}
        </div>
        <div className={cn('rounded-xl p-3', iconVariants[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
