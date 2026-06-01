import { c, cn } from '../../../utils';
import { CardBodyProps } from '../Card.types';

const C = c('card');

export const CardHeader = ({ children, className, ...rest }: CardBodyProps) => {
  return (
    <div className={cn(C.e('header'), className)} {...rest}>
      {children}
    </div>
  );
};

CardHeader.displayName = 'Card.Header';
