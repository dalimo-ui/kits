import { ElementType } from 'react';
import { CardProps } from './Card.types';
import { CardHeader } from './components/CardHeader';
import { CardBody } from './components/CardBody';
import { CardFooter } from './components/CardFooter';
import { c, cn } from '../../utils';

const C = c('card');

const CardRoot = <T extends ElementType = 'div'>({
  as,
  size = 'md',
  isClickable = false,
  children,
  className,
  ...restProps
}: CardProps<T>) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn(C.b, C.m(size), isClickable && C.m('clickable'), className)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...restProps}
    >
      {children}
    </Component>
  );
};

CardRoot.displayName = 'Card';

// Compound component pattern
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
