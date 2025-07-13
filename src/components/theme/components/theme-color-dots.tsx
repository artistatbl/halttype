interface ThemeColorDotsProps {
  colors: string[];
  className?: string;
}

/**
 * Reusable component for displaying theme color dots
 */
export function ThemeColorDots({ colors, className = '' }: ThemeColorDotsProps) {
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-full border border-border/20"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}