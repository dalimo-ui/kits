import { ElementType } from 'react';
import { ChipProps } from './Chip.types';
import { c, cn } from '../../utils';

const C = c('chip');

export const Chip = <T extends ElementType = 'div'>({
  as: Component = 'div',
  size = 'md',
  color = 'neutral',
  isClickable = false,
  children,
  className,
  ...rest
}: ChipProps<T>) => {
  return (
    <Component
      className={cn(C.b, size && C.m(size), C.m(color), className)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
};
