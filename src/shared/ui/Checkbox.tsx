import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa';

type CheckboxProps = {
  onChange: () => void;
  checked: boolean;
};

export const Checkbox = ({ onChange, checked }: CheckboxProps) => {
  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleChange}
        className="group duration-200 bg-transparent outline-none focus:ring-[2.5px] focus:ring-offset-background focus:ring-offset-[2.5px] ease-in rounded-[4px]"
      >
        <div
          className={clsx(
            'duration-200 ease-in flex items-center justify-center rounded-[4px] border-[2px] h-[16px] w-[16px] group-focus:border-accent hover:border-accent',
            checked
              ? 'border-accent/100 bg-accent'
              : 'border-foreground/20'
          )}
        >
          {checked && <FaCheck className="text-white text-[10px]" />}
        </div>
      </button>
    </>
  );
};
