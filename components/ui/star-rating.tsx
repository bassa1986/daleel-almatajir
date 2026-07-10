import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function StarRating({ rating, max = 5, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 14 : 18;
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${rating} ÙÙ ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            size={starSize}
            className={cn(
              filled ? 'fill-amber-400 text-amber-400' : half ? 'fill-amber-400/50 text-amber-400' : 'fill-white/10 text-white/20'
            )}
          />
        );
      })}
      <span className="mr-1 text-xs text-slate-400 figure">{rating.toFixed(1)}</span>
    </span>
  );
}
