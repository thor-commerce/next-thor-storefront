export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

export function isResponsiveProp<T>(value: ResponsiveProp<T>): value is Partial<Record<Breakpoint, T>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function generateResponsiveClasses<T extends string>(
  value: ResponsiveProp<T>,
  prefix: string,
  classes: Record<string, string>
): string {
  if (!isResponsiveProp(value)) {
    return '';
  }

  const responsiveClasses = Object.entries(value)
    .map(([breakpoint, val]) => classes[`${prefix}-${breakpoint}-${val}`])
    .filter(Boolean);

  return responsiveClasses.join(' ');
}
