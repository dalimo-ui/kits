import { c, cn } from '../../../utils';
import { CardBodyProps } from '../Card.types';

const C = c('card');

export const CardFooter = ({ children, className, ...rest }: CardBodyProps) => {
  return (
    <div className={cn(C.e('footer'), className)} {...rest}>
      {children}
    </div>
  );
};

CardFooter.displayName = 'Card.Footer';
