import { ComponentPropsWithoutRef, ElementType } from 'react';

export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';

interface ChipOwnProps {
  size?: ChipSize;
  color?: ChipColor;
  isClickable?: boolean;
  as?: 'div' | 'span' | 'button';
}

export type ChipProps<T extends ElementType = 'div'> = ChipOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ChipOwnProps>;
