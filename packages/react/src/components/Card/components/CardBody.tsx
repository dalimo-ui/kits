import { c, cn } from '../../../utils';
import { CardBodyProps } from '../Card.types';

const C = c('card');

export const CardBody = ({ children, className, ...rest }: CardBodyProps) => {
  return (
    <div className={cn(C.e('body'), className)} {...rest}>
      {children}
    </div>
  );
};

CardBody.displayName = 'Card.Body';
