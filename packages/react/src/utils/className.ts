export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };

/**
 * Combines multiple class names into a single string
 * Filters out falsy values (undefined, null, false, empty string)
 *
 * @example
 * cn('btn', isActive && 'btn--active', className)
 * cn('card', { 'card--clickable': isClickable })
 */
export const cn = (...classes: ClassValue[]): string => {
  const result: string[] = [];

  classes.forEach(cls => {
    if (!cls) return;

    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(String(cls));
    } else if (Array.isArray(cls)) {
      const nested = cn(...cls);
      if (nested) result.push(nested);
    } else if (typeof cls === 'object') {
      Object.keys(cls).forEach(key => {
        if (cls[key]) result.push(key);
      });
    }
  });

  return result.join(' ');
};

export const DL_PREFIX = 'dl' as const;

// type Part = string | number | false | null | undefined;
// export function cx(...parts: Part[]) {
//   return parts.filter(Boolean).join(" ");
// }

/** حوزه‌های مختلف نام‌گذاری */
type Domain = 'c' | 'l' | 't' | 'u';

/** اینترفیس خروجی برای هر بلاک BEM */
export interface Bem {
  b: string;
  e: (el: string) => string;
  m: (mod: string) => string;
  em: (el: string, mod: string) => string;
  is: (state: string) => string;
  has: (state: string) => string;
}

/** فانکشن پایه برای ساخت کلاس‌های دالیمو */
export function bem(domain: Domain, block: string): Bem {
  const b = domain == 'c' ? `${DL_PREFIX}-${block}` : `${DL_PREFIX}-${domain}-${block}`;

  return {
    b,
    e: (el: string) => `${b}__${el}`,
    m: (mod: string) => `${b}--${mod}`,
    em: (el: string, mod: string) => `${b}__${el}--${mod}`,
    is: (state: string) => `is-${state}`,
    has: (state: string) => `has-${state}`,
  };
}

/** Helper برای کامپوننت‌ها: dl-c-button */
export const c = (block: string) => bem('c', block);

/** Helper برای چیدمان: dl-l-shell */
export const l = (block: string) => bem('l', block);

/** Helper برای تمپلیت‌ها: dl-t-dashboard */
export const t = (name: string) => ({
  b: `${DL_PREFIX}-t-${name}`,
});

/** Helper برای یوتیلیتی‌ها: dl-u-flex */
export function u(name: string): string {
  return `${DL_PREFIX}-u-${name}`;
}
