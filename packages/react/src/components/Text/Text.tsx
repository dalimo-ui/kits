import { ElementType } from 'react';
import { cn, createPolymorphicComponent, PolymorphicProps, u } from '../../utils';

type TextVariant = 'display' | 'heading' | 'body' | 'label';
type TextSize = 'xs' | 'sm' | 'md' | 'lg';
type TextColor = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'muted' | 'disabled';

type TextOwnProps = {
  variant?: TextVariant;
  size?: TextSize;
  color?: TextColor;
};

const defaultElement = 'div';

function resolveDefaultTag(variant: TextVariant, size: TextSize): ElementType {
  if (variant === 'heading') {
    switch (size) {
      case 'xs':
        return 'h4';
      case 'sm':
        return 'h3';
      case 'md':
        return 'h2';
      case 'lg':
        return 'h1';
      default:
        return 'h1';
    }
  }
  return defaultElement;
}

export type TextProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<
  E,
  TextOwnProps
>;

export const Text = createPolymorphicComponent<TextOwnProps, typeof defaultElement>(
  'Text',
  ({ as, variant = 'body', size = 'md', color, className, children, ...restProps }, ref) => {
    const Component = as ?? resolveDefaultTag(variant, size);

    return (
      <Component
        ref={ref}
        className={cn(u(`text-${variant}-${size}`), color && u(`text-${color}`), className)}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);
