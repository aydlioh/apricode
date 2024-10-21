import React, { forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  inputClassName?: string;
  rightContent?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ containerClassName, inputClassName, rightContent, ...props }, ref) => {
    return (
      <div className={clsx('relative group', containerClassName)}>
        <input
          {...props}
          ref={ref}
          className={clsx(
            'bg-transparent duration-200 placeholder:text-foreground/50 focus:placeholder:text-foreground/10 text-foreground border-[2px] focus:border-foreground/50 hover:border-foreground/30 border-foreground/10 px-2 py-1 rounded-md w-full pr-12',
            inputClassName
          )}
        />
        <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2">
          {rightContent}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
