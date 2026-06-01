import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { c, cn } from '../../utils';

const D = c('divider');
const DG = c('divider-group');

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'start' | 'center' | 'end';
  children?: ReactNode;
}

export const Divider = ({
  orientation = 'horizontal',
  labelPosition = 'center',
  children,
  className,
  ...rest
}: DividerProps) => {
  const dividerClasses = cn(D.b, D.m(orientation), !children && className);

  if (children) {
    const groupClasses = cn(DG.b, DG.m(orientation), className);

    return (
      <div className={groupClasses} role="separator" aria-orientation={orientation}>
        {labelPosition !== 'start' && <hr className={dividerClasses} {...rest} />}
        <div className="divider-group__content">{children}</div>
        {labelPosition !== 'end' && <hr className={dividerClasses} {...rest} />}
      </div>
    );
  }

  return <hr className={dividerClasses} aria-orientation={orientation} {...rest} />;
};
