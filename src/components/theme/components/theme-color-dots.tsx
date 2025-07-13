import { THEME_COLOR_DOT_SIZE, THEME_COLOR_DOT_CLASSES } from '../constants';

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
          className={`${THEME_COLOR_DOT_SIZE} ${THEME_COLOR_DOT_CLASSES}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}