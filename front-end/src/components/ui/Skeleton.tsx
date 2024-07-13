import clsx from 'clsx';

export const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={clsx('animate-pulse select-none bg-muted/20', className)}
    {...props}
  />
);
