type TaskTitleProps = {
  title: string;
};

export const TaskTitle = ({ title }: TaskTitleProps) => {
  return <p>{title}</p>;
};
