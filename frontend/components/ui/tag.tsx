import * as React from 'react';

import { cn } from '@/utils/cn';

const Tag = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'place-items-center text-sm text-center p-1 px-2 border border-solid rounded-full whitespace-nowrap',
      className
    )}
    {...props}
  />
));
Tag.displayName = 'Tag';

export { Tag };
