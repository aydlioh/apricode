import clsx from 'clsx';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={clsx(
        'bg-transparent duration-200 placeholder:text-foreground/50 focus:placeholder:text-foreground/10 text-foreground border-[2px] focus:border-foreground/50 hover:border-foreground/30 border-foreground/10 px-2 py-1 rounded-md',
        props.className
      )}
    />
  );
};
