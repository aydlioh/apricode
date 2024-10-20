import { LuPlus } from 'react-icons/lu';
import { MdModeEdit } from 'react-icons/md';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { observer } from 'mobx-react-lite';

type IconButtonProps = {
  icon: React.ReactElement;
  ariaLabel: string;
  onClick?: () => void;
};

const IconButton = ({ icon, ariaLabel, onClick }: IconButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      className="duration-200 bg-secondary hover:bg-accent/20 focus:bg-accent/40 rounded-sm p-1 flex justify-center items-center focus:ring-[2px] focus:ring-offset-secondary focus:ring-offset-[2.5px]"
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

type TaskToolsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onCreateSubtask: () => void;
};

export const TaskTools = observer(
  ({ onEdit, onDelete, onCreateSubtask }: TaskToolsProps) => {
    return (
      <div className="flex flex-row gap-2 px-2">
        <IconButton
          onClick={onCreateSubtask}
          icon={<LuPlus />}
          ariaLabel="Add Task"
        />
        <IconButton
          onClick={onEdit}
          icon={<MdModeEdit />}
          ariaLabel="Edit Task"
        />
        <IconButton
          onClick={onDelete}
          icon={<BsFillTrash3Fill />}
          ariaLabel="Delete Task"
        />
      </div>
    );
  }
);
