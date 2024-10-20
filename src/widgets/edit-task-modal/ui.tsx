import { editTaskModalStore, editTaskStore } from '@/entities/task';
import { Button, Input, Modal, Textarea } from '@/shared/ui';
import { observer } from 'mobx-react-lite';

export const EditTaskModal = observer(() => {
  const { isOpened, close } = editTaskModalStore;
  const {
    isSending,
    title,
    handleTitleChange,
    description,
    handleDescriptionChange,
    handleSubmit,
  } = editTaskStore;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
    close();
  };

  return (
    <Modal isOpen={isOpened} onClose={close}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-5 justify-between px-3"
      >
        <div className="flex flex-col gap-2">
          <Input
            onChange={(e) => handleTitleChange(e.target.value)}
            value={title}
            placeholder="Введите заголовок"
          />
          <Textarea
            onChange={(e) => handleDescriptionChange(e.target.value)}
            value={description}
            placeholder="Введите описание"
            className="max-h-[200px] min-h-[100px]"
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            type="button"
            onClick={close}
            className="w-1/2"
            variant="bordered"
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isSending} className="w-1/2">
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
});
