type TaskInfoProps = {
  title: string;
  description?: string;
};

export const TaskInfo = ({ title, description = '' }: TaskInfoProps) => {
  return (
    <div>
      <h3 className="text-2xl border-b-2 border-foreground/20 pb-2 inline-block min-w-[100px]">
        {title ? title : (
          <span className="text-foreground/50">Пустая задача</span>
        )}
      </h3>
      <p className="text-foreground/60 mt-7 mb-3">{description}</p>
    </div>
  );
};
