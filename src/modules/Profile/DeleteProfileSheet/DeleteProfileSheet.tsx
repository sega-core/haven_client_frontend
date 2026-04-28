import { Button } from "@heroui/button";
import { Typography } from "../../../components/Typography";
import { useDeleteUser } from "../../../hooks";

export const DeleteProfileSheet = ({ onClose }: { onClose: () => void }) => {
  const { mutateAsync, isPending } = useDeleteUser();

  const handleDelete = async () => {
    mutateAsync();
    onClose()
  };

  return (
    <div className="grid gap-4 bg-white-primary text-brown-primary">
      <Typography type="body-s" className="text-center">
        Вы действительно хотите удалить свой профиль? Все ваши данные будут
        безвозвратно удалены
      </Typography>
      <Button
        radius="full"
        className="bg-red-primary text-white"
        onPress={handleDelete}
        isLoading={isPending}
      >
        Удалить
      </Button>
      <Button
        radius="full"
        className="bg-beige-primary text-white"
        onPress={onClose}
      >
        Отменить
      </Button>
    </div>
  );
};
