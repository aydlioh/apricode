type TaskTitleProps = {
  title: string;
};

export const TaskTitle = ({ title }: TaskTitleProps) => {
  return (
    <p>
      {title ? (
        title
      ) : (
        <span className="text-foreground/50">Пустая задача</span>
      )}
    </p>
  );
};
