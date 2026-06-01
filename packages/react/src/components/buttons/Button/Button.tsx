import { ElementType, ReactNode } from 'react';
import { cn, c, createPolymorphicComponent, PolymorphicProps } from '../../../utils';
import { ButtonColor, ButtonSize, ButtonVariant } from '../button.types';

const B = c('button');

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  leading?: ReactNode;
  trailing?: ReactNode;
  // width?: 'fit' | 'wide' | 'full'
};

const defaultElement = 'button';

export type ButtonProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<
  E,
  ButtonOwnProps
>;

export const Button = createPolymorphicComponent<ButtonOwnProps, typeof defaultElement>(
  'Button',
  (
    { as, variant, size, color = 'primary', className, leading, trailing, children, ...restProps },
    ref
  ) => {
    const Component = as || defaultElement;
    const conditionalProps =
      Component === 'button' && !restProps.type ? { type: 'button' as const } : {};

    return (
      <Component
        ref={ref}
        className={cn(
          B.b,
          variant && B.m(variant),
          size && B.m(size),
          color && B.m(color),
          className
        )}
        {...conditionalProps}
        {...restProps}
      >
        {leading && <span className={B.e('leading')}>{leading}</span>}
        {children}
        {trailing && <span className={B.e('trailing')}>{trailing}</span>}
      </Component>
    );
  }
);
