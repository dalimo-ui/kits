import { ComponentPropsWithoutRef, ElementType } from 'react';

// Polymorphic utility type
export type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

export type PolymorphicComponentProps<T extends ElementType, Props = {}> = Props &
  Omit<ComponentPropsWithoutRef<T>, keyof Props> & {
    as?: T;
  };

// Card variants
// export type CardVariant = 'default' | 'subtle' | 'solid';
export type CardSize = 'sm' | 'md' | 'lg';

// Main Card Props
export interface CardBaseProps {
  // variant?: CardVariant;
  size?: CardSize;
  isClickable?: boolean;
}

export type CardProps<T extends ElementType = 'div'> = PolymorphicComponentProps<T, CardBaseProps>;

// CardHeader Props
export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {}

// CardBody Props
export interface CardBodyProps extends ComponentPropsWithoutRef<'div'> {}

// CardFooter Props
export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {}
