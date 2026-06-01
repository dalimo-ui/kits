import { ElementType } from 'react';
import { c, cn, createPolymorphicComponent, PolymorphicProps } from '../../../utils';
import { ButtonColor, ButtonSize, ButtonVariant } from '../button.types';

const B = c('button');

type IconButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
};

const defaultElement = 'button';

export type IconButtonProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<
  E,
  IconButtonOwnProps
>;

export const IconButton = createPolymorphicComponent<IconButtonOwnProps, typeof defaultElement>(
  'IconButton',
  ({ as, variant, size, color = 'neutral', className, ...restProps }, ref) => {
    const Component = as || defaultElement;
    const conditionalProps =
      Component === 'button' && !restProps.type ? { type: 'button' as const } : {};

    return (
      <Component
        ref={ref}
        className={cn(
          B.b,
          B.m('square'),
          variant && B.m(variant),
          size && B.m(size),
          color && B.m(color),
          className
        )}
        {...conditionalProps}
        {...restProps}
      />
    );
  }
);
