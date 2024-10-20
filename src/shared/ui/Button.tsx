import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'bordered';
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const ButtonStyles = {
  default:
    'bg-accent text-background enabled:hover:bg-accent/70 enabled:active:bg-accent focus:ring-[4px] focus:ring-offset-background focus:ring-offset-[2.5px]',
  bordered:
    'bg-transparent text-accent enabled:enabled:hover:border-accent/60 enabled:hover:bg-accent/10 border-2 border-accent enabled:active:bg-accent/20 bg-transparent focus:ring-[4px] focus:ring-offset-background focus:ring-offset-[2.5px]',
};

export const Button = ({
  variant = 'default',
  leftContent = null,
  rightContent = null,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'px-3 py-2 rounded-md  duration-300 disabled:opacity-50 events-none flex gap-2 items-center justify-center',
        variant === 'default' && ButtonStyles.default,
        variant === 'bordered' && ButtonStyles.bordered,
        props.className
      )}
    >
      {leftContent}
      {props.children}
      {rightContent}
    </button>
  );
};
