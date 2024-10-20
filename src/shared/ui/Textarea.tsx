import clsx from 'clsx';

export const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  return (
    <textarea
      {...props}
      className={clsx(
        'bg-transparent transition-colors duration-200 placeholder:text-foreground/50 focus:placeholder:text-foreground/10 text-foreground border-[2px] focus:border-foreground/50 hover:border-foreground/30 border-foreground/10 px-2 py-1 rounded-md',
        props.className
      )}
    />
  );
};
